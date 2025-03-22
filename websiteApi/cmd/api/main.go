package main

import (
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

	userRateLimiter := services.NewUserRateLimiter(5, time.Minute)

	r.Use(middleware.CORS)

	r.HandleFunc("/starredRepos", handlers.GetStarredRepos).Methods(http.MethodGet)
	r.HandleFunc("/sendEmail", handlers.SendEmail(userRateLimiter)).Methods(http.MethodPost, http.MethodOptions)
	r.HandleFunc("/extension", handlers.GetExtension).Methods(http.MethodGet)

	// Swagger UI
	r.PathPrefix("/swagger/").Handler(httpSwagger.WrapHandler)
	serverPort := config.GetPort()
	log.Printf("Server is starting on port %s...\n", serverPort)
	log.Fatal(http.ListenAndServe(":"+serverPort, r))
}
