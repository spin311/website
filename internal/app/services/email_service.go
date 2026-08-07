package services

import (
	"context"
	"fmt"
	"log"
	"strings"
	"websiteApi/internal/repository/models"
)

const (
	maxBodyLength    = 10000
	maxSubjectLength = 200
	maxSenderLength  = 200
	maxContactLength = 200
)

// genericSendFailure is what the caller sees when delivery fails. Provider and
// network details are logged server-side instead of returned, so the public
// endpoint does not leak infrastructure information.
const genericSendFailure = "Unable to send the message right now. Please try again later."

// EmailService turns a contact-form submission into a message and hands it to
// a MessageSender for delivery.
type EmailService struct {
	sender    MessageSender
	from      string
	recipient string
}

// NewEmailService wires a service to a transport and its addressing config.
func NewEmailService(sender MessageSender, cfg *models.EmailConfig) *EmailService {
	return &EmailService{
		sender:    sender,
		from:      cfg.From,
		recipient: cfg.Recipient,
	}
}

// Send validates the submission and delivers it, returning an empty HttpError
// on success.
func (s *EmailService) Send(ctx context.Context, email models.Email) models.HttpError {
	// The honeypot is never shown to humans, so any value means a bot filled it.
	if strings.TrimSpace(email.Website) != "" {
		return models.NewHttpError("Invalid request", 400)
	}

	subject := sanitizeHeaderValue(email.Subject)
	sender := sanitizeHeaderValue(email.Sender)
	contact := sanitizeHeaderValue(email.Contact)

	if httpErr := validateSubmission(contact, subject, email.Body, sender); !models.IsHttpErrorEmpty(httpErr) {
		return httpErr
	}

	msg := OutboundMessage{
		From:    s.from,
		To:      s.recipient,
		Subject: subject,
		Text:    buildBody(sender, contact, email.Body),
	}

	if err := s.sender.Send(ctx, msg); err != nil {
		log.Printf("sending contact email failed: %v", err)
		return models.NewHttpError(genericSendFailure, 502)
	}
	return models.NewEmptyHttpError()
}

// validateSubmission enforces the required fields and size limits. Contact is
// required so replies are possible; Sender is an optional display name.
func validateSubmission(contact, subject, body, sender string) models.HttpError {
	if contact == "" || subject == "" || strings.TrimSpace(body) == "" {
		return models.NewHttpError("contact, subject, and body parameters are required", 400)
	}
	if len(body) > maxBodyLength {
		return models.NewHttpError("Email body is too large", 400)
	}
	if len(subject) > maxSubjectLength {
		return models.NewHttpError("Email subject is too large", 400)
	}
	if len(contact) > maxContactLength {
		return models.NewHttpError("Contact is too large", 400)
	}
	if len(sender) > maxSenderLength {
		return models.NewHttpError("Sender is too large", 400)
	}
	return models.NewEmptyHttpError()
}

// buildBody renders the plain-text message delivered to the recipient.
func buildBody(sender, contact, body string) string {
	var builder strings.Builder
	fmt.Fprintf(&builder, "Contact: %s\n", contact)
	if sender != "" {
		fmt.Fprintf(&builder, "From: %s\n", sender)
	}
	fmt.Fprintf(&builder, "\n%s", body)
	return builder.String()
}

// sanitizeHeaderValue strips CR/LF from values that end up in email headers.
// Without this, a crafted subject could append headers such as Bcc and turn the
// public endpoint into an open relay.
func sanitizeHeaderValue(value string) string {
	cleaned := strings.Map(func(r rune) rune {
		if r == '\r' || r == '\n' {
			return -1
		}
		return r
	}, value)
	return strings.TrimSpace(cleaned)
}
