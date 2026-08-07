package handlers

import (
	"encoding/json"
	"net/http"
	"websiteApi/internal/app/helpers"
	"websiteApi/internal/app/services"
	"websiteApi/internal/repository/models"
)

// maxRequestBodyBytes caps the decoded payload well above the 10k body limit
// while still rejecting oversized uploads before they are parsed.
const maxRequestBodyBytes = 64 * 1024

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
// @Failure 502 {object} models.HttpError
// @Router /sendEmail [post]
func SendEmail(userRateLimiter *services.UserRateLimiter, emailService *services.EmailService) http.HandlerFunc {
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
		request.Body = http.MaxBytesReader(writer, request.Body, maxRequestBodyBytes)
		err := json.NewDecoder(request.Body).Decode(&email)
		if err != nil {
			helpers.WriteHttpErrorResponse(writer, models.NewHttpError("Invalid request body", http.StatusBadRequest))
			return
		}

		// The honeypot check and field validation live in the service so they
		// apply to the sanitized values rather than the raw input.
		httpErr := emailService.Send(request.Context(), email)
		if !models.IsHttpErrorEmpty(httpErr) {
			helpers.WriteHttpErrorResponse(writer, httpErr)
			return
		}
		err = json.NewEncoder(writer).Encode("Email sent successfully")
		if err != nil {
			helpers.WriteErrorResponse(writer, err, http.StatusInternalServerError)
			return
		}
	}
}
