package config

import (
	"github.com/joho/godotenv"
	"log"
	"os"
	"websiteApi/internal/repository/models"
)

func init() {
	// Only load .env file if not running in production
	if os.Getenv("RENDER") == "" {
		err := godotenv.Load()
		if err != nil {
			log.Println("No .env file found, proceeding with environment variables")
		}
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
