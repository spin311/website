package services

import (
	"bytes"
	"context"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"time"
)

const (
	resendAPIURL   = "https://api.resend.com/emails"
	requestTimeout = 10 * time.Second
	// maxErrorBodyBytes caps how much of an error response we read before
	// giving up, so a misbehaving upstream cannot exhaust memory.
	maxErrorBodyBytes = 4096
)

// OutboundMessage is a transport-agnostic description of an email to deliver.
type OutboundMessage struct {
	From    string
	To      string
	Subject string
	Text    string
}

// MessageSender delivers an OutboundMessage to an email provider.
type MessageSender interface {
	Send(ctx context.Context, msg OutboundMessage) error
}

// ResendClient sends email through the Resend HTTPS API.
//
// HTTPS is used rather than SMTP because most container platforms (Railway
// included) block outbound ports 25/465/587 by default.
type ResendClient struct {
	apiKey     string
	baseURL    string
	httpClient *http.Client
}

// NewResendClient builds a client that talks to the public Resend API.
func NewResendClient(apiKey string) *ResendClient {
	return &ResendClient{
		apiKey:     apiKey,
		baseURL:    resendAPIURL,
		httpClient: &http.Client{Timeout: requestTimeout},
	}
}

// resendRequest mirrors the JSON body accepted by POST /emails.
type resendRequest struct {
	From    string   `json:"from"`
	To      []string `json:"to"`
	Subject string   `json:"subject"`
	Text    string   `json:"text"`
}

// Send delivers msg, returning an error describing any non-2xx response.
func (c *ResendClient) Send(ctx context.Context, msg OutboundMessage) error {
	payload, err := json.Marshal(resendRequest{
		From:    msg.From,
		To:      []string{msg.To},
		Subject: msg.Subject,
		Text:    msg.Text,
	})
	if err != nil {
		return fmt.Errorf("encoding request: %w", err)
	}

	request, err := http.NewRequestWithContext(ctx, http.MethodPost, c.baseURL, bytes.NewReader(payload))
	if err != nil {
		return fmt.Errorf("building request: %w", err)
	}
	request.Header.Set("Authorization", "Bearer "+c.apiKey)
	request.Header.Set("Content-Type", "application/json")

	response, err := c.httpClient.Do(request)
	if err != nil {
		return fmt.Errorf("calling resend: %w", err)
	}
	defer response.Body.Close()

	if response.StatusCode < 200 || response.StatusCode >= 300 {
		detail, _ := io.ReadAll(io.LimitReader(response.Body, maxErrorBodyBytes))
		return fmt.Errorf("resend returned %d: %s", response.StatusCode, bytes.TrimSpace(detail))
	}

	// Drain the body so the connection can be reused by keep-alive.
	_, _ = io.Copy(io.Discard, io.LimitReader(response.Body, maxErrorBodyBytes))
	return nil
}
