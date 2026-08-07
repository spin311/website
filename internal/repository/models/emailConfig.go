package models

import "fmt"

// EmailConfig represents the configuration for sending emails
//
//swagger:model
type EmailConfig struct {
	// APIKey is the Resend API key used to authenticate outbound sends.
	APIKey string
	// From is the verified sender address emails are sent from.
	From string
	// Recipient is the mailbox that contact-form submissions are delivered to.
	Recipient string
}

// Validate reports whether every field required to send an email is present.
func (c *EmailConfig) Validate() error {
	missing := make([]string, 0, 3)
	if c.APIKey == "" {
		missing = append(missing, "RESEND_API_KEY")
	}
	if c.From == "" {
		missing = append(missing, "EMAIL_FROM")
	}
	if c.Recipient == "" {
		missing = append(missing, "EMAIL_RECIPIENT")
	}
	if len(missing) > 0 {
		return fmt.Errorf("missing required email environment variables: %v", missing)
	}
	return nil
}
