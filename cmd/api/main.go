package main

import (
	"fmt"
	"github.com/gorilla/mux"
	httpSwagger "github.com/swaggo/http-swagger"
	"log"
	"net/http"
	"time"
	"websiteApi/internal/app/handlers"
	"websiteApi/internal/app/services"
	"websiteApi/pkg/config"
	"websiteApi/pkg/middleware"
)

// @title Website API
// @version 1.0
// @description Simple website API for sending emails and getting starred repos
// @host localhost:8080
// @BasePath /
func main() {
	r := mux.NewRouter()

	userRateLimiter := services.NewUserRateLimiter(3, time.Minute)

	// Fail fast at startup rather than at the first contact-form submission.
	emailConfig := config.GetEmailConfig()
	if err := emailConfig.Validate(); err != nil {
		log.Fatalf("Invalid email configuration: %v", err)
	}
	emailService := services.NewEmailService(services.NewResendClient(emailConfig.APIKey), emailConfig)

	r.Use(middleware.LoggingMiddleware)
	r.Use(middleware.CORS)

	r.HandleFunc("/starredRepos", handlers.GetStarredRepos).Methods(http.MethodGet)
	r.HandleFunc("/sendEmail", handlers.SendEmail(userRateLimiter, emailService)).Methods(http.MethodPost, http.MethodOptions)
	r.HandleFunc("/extension", handlers.GetExtension).Methods(http.MethodGet)
	r.HandleFunc("/uninstall", handlers.Uninstall).Methods(http.MethodPost, http.MethodOptions)

	// Swagger UI
	r.PathPrefix("/swagger/").Handler(httpSwagger.WrapHandler)
	serverPort := config.GetPort()
	fmt.Printf("Server is starting on port %s...\n", serverPort)
	log.Fatal(http.ListenAndServe(":"+serverPort, r))
}
