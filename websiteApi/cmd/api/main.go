package main

import (
	"github.com/gorilla/mux"
	"log"
	"net/http"
	"time"
	"websiteApi/internal/app/handlers"
	"websiteApi/internal/app/services"
	"websiteApi/pkg/config"
	"websiteApi/pkg/middleware"
)

func main() {
	r := mux.NewRouter()

	userRateLimiter := services.NewUserRateLimiter(5, time.Minute)

	r.Use(middleware.CORS)

	r.HandleFunc("/starredRepos", handlers.GetStarredRepos).Methods(http.MethodGet)
	r.HandleFunc("/sendEmail", handlers.SendEmail(userRateLimiter)).Methods(http.MethodPost)

	serverPort := config.GetEnvString("SERVER_PORT")
	log.Fatal(http.ListenAndServe(serverPort, r))
}
