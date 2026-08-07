package services

import (
	"context"
	"errors"
	"strings"
	"testing"
	"websiteApi/internal/repository/models"
)

// fakeSender records the last message it was asked to deliver and can be told
// to fail, so service behaviour can be asserted without any network access.
type fakeSender struct {
	lastMessage OutboundMessage
	callCount   int
	err         error
}

func (f *fakeSender) Send(_ context.Context, msg OutboundMessage) error {
	f.callCount++
	f.lastMessage = msg
	return f.err
}

func newServiceWithFake(err error) (*EmailService, *fakeSender) {
	sender := &fakeSender{err: err}
	config := &models.EmailConfig{
		APIKey:    "test-key",
		From:      "site@example.com",
		Recipient: "owner@example.com",
	}
	return NewEmailService(sender, config), sender
}

func validEmail() models.Email {
	return models.Email{
		Sender:  "John Doe",
		Subject: "Question about program",
		Body:    "Hello, World!",
		Contact: "john@example.com",
	}
}

func TestSendDeliversMessageWithConfiguredAddresses(t *testing.T) {
	// Arrange
	service, sender := newServiceWithFake(nil)

	// Act
	httpErr := service.Send(context.Background(), validEmail())

	// Assert
	if !models.IsHttpErrorEmpty(httpErr) {
		t.Fatalf("expected success, got %+v", httpErr)
	}
	if sender.callCount != 1 {
		t.Fatalf("expected exactly 1 send, got %d", sender.callCount)
	}
	if sender.lastMessage.From != "site@example.com" {
		t.Errorf("From = %q, want site@example.com", sender.lastMessage.From)
	}
	if sender.lastMessage.To != "owner@example.com" {
		t.Errorf("To = %q, want owner@example.com", sender.lastMessage.To)
	}
	if sender.lastMessage.Subject != "Question about program" {
		t.Errorf("Subject = %q, want the submitted subject", sender.lastMessage.Subject)
	}
}

func TestSendIncludesContactAndSenderInBody(t *testing.T) {
	// Arrange
	service, sender := newServiceWithFake(nil)

	// Act
	service.Send(context.Background(), validEmail())

	// Assert
	body := sender.lastMessage.Text
	for _, want := range []string{"Contact: john@example.com", "From: John Doe", "Hello, World!"} {
		if !strings.Contains(body, want) {
			t.Errorf("body missing %q, got:\n%s", want, body)
		}
	}
}

func TestSendOmitsSenderLineWhenSenderIsEmpty(t *testing.T) {
	// Arrange
	service, sender := newServiceWithFake(nil)
	email := validEmail()
	email.Sender = ""

	// Act
	httpErr := service.Send(context.Background(), email)

	// Assert
	if !models.IsHttpErrorEmpty(httpErr) {
		t.Fatalf("sender is optional, expected success, got %+v", httpErr)
	}
	if strings.Contains(sender.lastMessage.Text, "From:") {
		t.Errorf("expected no From line, got:\n%s", sender.lastMessage.Text)
	}
}

func TestSendRejectsSubmissionsThatFillTheHoneypot(t *testing.T) {
	// Arrange
	service, sender := newServiceWithFake(nil)
	email := validEmail()
	email.Website = "http://spam.example.com"

	// Act
	httpErr := service.Send(context.Background(), email)

	// Assert
	if httpErr.StatusCode != 400 {
		t.Errorf("status = %d, want 400", httpErr.StatusCode)
	}
	if httpErr.Message != "Invalid request" {
		t.Errorf("message = %q, want the existing honeypot message", httpErr.Message)
	}
	if sender.callCount != 0 {
		t.Errorf("a honeypot hit must never be delivered, got %d sends", sender.callCount)
	}
}

func TestSendTreatsWhitespaceOnlyHoneypotAsEmpty(t *testing.T) {
	// Arrange
	service, sender := newServiceWithFake(nil)
	email := validEmail()
	email.Website = "   "

	// Act
	httpErr := service.Send(context.Background(), email)

	// Assert
	if !models.IsHttpErrorEmpty(httpErr) {
		t.Errorf("whitespace is not a bot signal, got %+v", httpErr)
	}
	if sender.callCount != 1 {
		t.Errorf("expected delivery, got %d sends", sender.callCount)
	}
}

func TestSendStripsNewlinesFromSubjectToPreventHeaderInjection(t *testing.T) {
	// Arrange
	service, sender := newServiceWithFake(nil)
	email := validEmail()
	email.Subject = "Hello\r\nBcc: victim@example.com"

	// Act
	httpErr := service.Send(context.Background(), email)

	// Assert
	if !models.IsHttpErrorEmpty(httpErr) {
		t.Fatalf("expected success, got %+v", httpErr)
	}
	if strings.ContainsAny(sender.lastMessage.Subject, "\r\n") {
		t.Errorf("subject still contains CR/LF: %q", sender.lastMessage.Subject)
	}
	if sender.lastMessage.Subject != "HelloBcc: victim@example.com" {
		t.Errorf("subject = %q, want CR/LF removed", sender.lastMessage.Subject)
	}
}

func TestSendStripsNewlinesFromSenderAndContact(t *testing.T) {
	// Arrange
	service, sender := newServiceWithFake(nil)
	email := validEmail()
	email.Sender = "Eve\nBcc: victim@example.com"
	email.Contact = "eve@example.com\r\nCc: other@example.com"

	// Act
	service.Send(context.Background(), email)

	// Assert
	// The injected text may survive as inert characters; what must not survive
	// is the line break that would turn it into a header of its own.
	for _, line := range strings.Split(sender.lastMessage.Text, "\n") {
		trimmed := strings.TrimLeft(line, " \t")
		if strings.HasPrefix(trimmed, "Cc:") || strings.HasPrefix(trimmed, "Bcc:") {
			t.Errorf("injected text became its own header line: %q", line)
		}
	}
}

func TestSendRejectsMissingRequiredFields(t *testing.T) {
	// Arrange
	cases := map[string]models.Email{
		"empty contact":           {Contact: "", Subject: "s", Body: "b"},
		"empty subject":           {Contact: "a@b.c", Subject: "", Body: "b"},
		"empty body":              {Contact: "a@b.c", Subject: "s", Body: ""},
		"whitespace-only body":    {Contact: "a@b.c", Subject: "s", Body: "   \n  "},
		"subject only whitespace": {Contact: "a@b.c", Subject: "  ", Body: "b"},
	}

	for name, email := range cases {
		t.Run(name, func(t *testing.T) {
			service, sender := newServiceWithFake(nil)

			// Act
			httpErr := service.Send(context.Background(), email)

			// Assert
			if httpErr.StatusCode != 400 {
				t.Errorf("status = %d, want 400", httpErr.StatusCode)
			}
			if sender.callCount != 0 {
				t.Errorf("expected no delivery attempt, got %d", sender.callCount)
			}
		})
	}
}

func TestSendRejectsOversizedFields(t *testing.T) {
	// Arrange
	cases := map[string]models.Email{
		"body":    {Contact: "a@b.c", Subject: "s", Body: strings.Repeat("x", maxBodyLength+1)},
		"subject": {Contact: "a@b.c", Subject: strings.Repeat("x", maxSubjectLength+1), Body: "b"},
		"contact": {Contact: strings.Repeat("x", maxContactLength+1), Subject: "s", Body: "b"},
		"sender":  {Contact: "a@b.c", Subject: "s", Body: "b", Sender: strings.Repeat("x", maxSenderLength+1)},
	}

	for name, email := range cases {
		t.Run(name, func(t *testing.T) {
			service, sender := newServiceWithFake(nil)

			// Act
			httpErr := service.Send(context.Background(), email)

			// Assert
			if httpErr.StatusCode != 400 {
				t.Errorf("status = %d, want 400", httpErr.StatusCode)
			}
			if sender.callCount != 0 {
				t.Errorf("expected no delivery attempt, got %d", sender.callCount)
			}
		})
	}
}

func TestSendAcceptsBodyExactlyAtTheLimit(t *testing.T) {
	// Arrange
	service, _ := newServiceWithFake(nil)
	email := validEmail()
	email.Body = strings.Repeat("x", maxBodyLength)

	// Act
	httpErr := service.Send(context.Background(), email)

	// Assert
	if !models.IsHttpErrorEmpty(httpErr) {
		t.Errorf("expected success at the limit, got %+v", httpErr)
	}
}

func TestSendReturnsGenericErrorWithoutLeakingProviderDetail(t *testing.T) {
	// Arrange
	service, _ := newServiceWithFake(errors.New("dial tcp 142.251.12.108:587: connect: connection timed out"))

	// Act
	httpErr := service.Send(context.Background(), validEmail())

	// Assert
	if httpErr.StatusCode != 502 {
		t.Errorf("status = %d, want 502", httpErr.StatusCode)
	}
	if httpErr.Message != genericSendFailure {
		t.Errorf("message = %q, want the generic failure text", httpErr.Message)
	}
	if strings.Contains(httpErr.Message, "142.251") {
		t.Error("response leaked infrastructure detail to the client")
	}
}
