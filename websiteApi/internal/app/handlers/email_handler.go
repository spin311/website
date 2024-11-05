package handlers

import (
	"encoding/json"
	"fmt"
	"net/http"
	"websiteApi/internal/app/helpers"
	"websiteApi/internal/app/services"
	"websiteApi/internal/repository/models"
)

func SendEmail(userRateLimiter *services.UserRateLimiter) http.HandlerFunc {
	return func(writer http.ResponseWriter, request *http.Request) {
		userID := request.Header.Get("X-User-ID")
		if userID == "" {
			helpers.WriteHttpErrorResponse(writer, models.NewHttpError("User ID is required", http.StatusBadRequest))
			return
		}

		if !userRateLimiter.Allow(userID) {
			helpers.WriteHttpErrorResponse(writer, models.NewHttpError("Rate limit exceeded", http.StatusTooManyRequests))
			return
		}

		var email models.Email
		err := json.NewDecoder(request.Body).Decode(&email)
		if err != nil {
			helpers.WriteErrorResponse(writer, err, http.StatusBadRequest)
			return
		}
		if email.Sender == "" || email.Subject == "" || email.Body == "" {
			helpers.WriteHttpErrorResponse(writer, models.NewHttpError("sender, subject, and body parameters are required", http.StatusBadRequest))
			return
		}

		httpErr := services.SendEmail(email)
		if !models.IsHttpErrorEmpty(httpErr) {
			helpers.WriteHttpErrorResponse(writer, httpErr)
			return
		}
		err = json.NewEncoder(writer).Encode(fmt.Sprintf("Email sent successfully"))
		if err != nil {
			helpers.WriteErrorResponse(writer, err, http.StatusInternalServerError)
			return
		}
	}
}
