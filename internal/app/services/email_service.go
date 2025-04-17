package services

import (
	"fmt"
	"net/smtp"
	"websiteApi/internal/repository/models"
	"websiteApi/pkg/config"
)

func SendEmail(email models.Email) models.HttpError {

	if len(email.Body) > 10000 {
		return models.NewHttpError("Email body is too large", 400)
	}
	emailConfig := config.GetEmailConfig()

	emailUser := emailConfig.EmailUser
	emailPassword := emailConfig.EmailPassword
	smthHost := emailConfig.EmailHost
	smthPort := emailConfig.EmailPort
	recipient := emailConfig.EmailRecipient

	body := fmt.Sprintf("From: %s\n%s", email.Sender, email.Body)

	message := fmt.Sprintf("From: %s\nTo: %s\nSubject: %s\n\n%s\n%s",
		emailUser, recipient, email.Subject,
		func() string {
			if email.Contact != "" {
				return fmt.Sprintf("Contact: %s\n", email.Contact)
			}
			return ""
		}(), body)

	auth := smtp.PlainAuth("", emailUser, emailPassword, smthHost)

	err := smtp.SendMail(smthHost+":"+smthPort, auth, emailUser, []string{recipient}, []byte(message))
	if err != nil {
		return models.NewHttpError(err.Error(), 500)
	}
	return models.NewEmptyHttpError()
}
