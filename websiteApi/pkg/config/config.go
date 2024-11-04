package config

import (
	"github.com/joho/godotenv"
	"log"
	"os"
	"websiteApi/internal/repository/models"
)

func init() {
	err := godotenv.Load()
	if err != nil {
		log.Fatalf("Error loading .env file")
	}
}

func GetEmailConfig() *models.EmailConfig {
	return &models.EmailConfig{
		EmailUser:      os.Getenv("EMAIL_USER"),
		EmailPassword:  os.Getenv("EMAIL_PASSWORD"),
		EmailRecipient: os.Getenv("EMAIL_RECIPIENT"),
		EmailHost:      os.Getenv("EMAIL_HOST"),
		EmailPort:      os.Getenv("EMAIL_PORT"),
	}
}

func GetGithubConfig() *models.GithubConfig {
	return &models.GithubConfig{
		AccessToken: os.Getenv("GITHUB_TOKEN"),
		Username:    os.Getenv("GITHUB_USERNAME"),
	}
}

func GetEnvString(s string) string {
	return os.Getenv(s)
}
