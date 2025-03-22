package handlers

import (
	"encoding/json"
	"net/http"
	"websiteApi/internal/app/helpers"
	"websiteApi/internal/app/services"
	"websiteApi/internal/repository/models"
)

func GetExtension(writer http.ResponseWriter, r *http.Request) {
	extensionId := r.URL.Query().Get("id")

	if extensionId == "" {
		helpers.WriteHttpErrorResponse(writer, models.NewHttpError("ID param is required", http.StatusBadRequest))
		return
	}

	extension, httpErr := services.GetExtension(extensionId)
	if !models.IsHttpErrorEmpty(httpErr) {
		helpers.WriteHttpErrorResponse(writer, httpErr)
		return
	}
	jsonErr := json.NewEncoder(writer).Encode(extension)
	if jsonErr != nil {
		helpers.WriteErrorResponse(writer, jsonErr, http.StatusInternalServerError)
		return
	}
}
