package config

import (
	"github.com/joho/godotenv"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"log"
	"os"
	"sync"
	"websiteApi/internal/repository/models"
)

var (
	dbInstance *gorm.DB
	dbOnce     sync.Once
	dbErr      error
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

func initDB() {
	dsn := os.Getenv("DATABASE_URL")
	dbInstance, dbErr = gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if dbErr != nil {
		return
	}
	if err := dbInstance.AutoMigrate(&models.Uninstall{}); err != nil {
		log.Printf("AutoMigrate error: %v", err)
	}
}

func GetDB() (*gorm.DB, error) {
	dbOnce.Do(initDB)
	return dbInstance, dbErr
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

func GetPort() string {
	port := os.Getenv("PORT")
	if port == "" {
		port = os.Getenv("SERVER_PORT")
	}
	return port
}
