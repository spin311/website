package models

// EmailConfig represents the configuration for sending emails
//
//swagger:model
type EmailConfig struct {
	EmailUser      string
	EmailPassword  string
	EmailRecipient string
	EmailHost      string
	EmailPort      string
}
