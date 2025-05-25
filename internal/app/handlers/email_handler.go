package handlers

import (
	"encoding/json"
	"fmt"
	"net/http"
	"websiteApi/internal/app/helpers"
	"websiteApi/internal/app/services"
	"websiteApi/internal/repository/models"
)

// SendEmail godoc
// @Summary Send an email
// @Description Send an email with provided sender, subject, and body
// @Tags email
// @Accept json
// @Produce json
// @Param X-User-ID header string true "User ID" example(1)
// @Param email body models.Email true "Email object" example({"sender": "John Doe", "subject": "Question about program", "body": "Hello, World!"})
// @Success 200 {string} string "Email sent successfully"
// @Failure 400 {object} models.HttpError
// @Failure 429 {object} models.HttpError
// @Failure 500 {object} models.HttpError
// @Router /sendEmail [post]
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
		if email.Website != "" {
			helpers.WriteHttpErrorResponse(writer, models.NewHttpError("Invalid request", http.StatusBadRequest))
			return
		}
		if email.Contact == "" || email.Subject == "" || email.Body == "" {
			helpers.WriteHttpErrorResponse(writer, models.NewHttpError("contact, subject, and body parameters are required", http.StatusBadRequest))
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
