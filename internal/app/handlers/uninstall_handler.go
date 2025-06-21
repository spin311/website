package handlers

import (
	"encoding/json"
	"fmt"
	"net/http"
	"websiteApi/internal/app/helpers"
	"websiteApi/internal/app/services"
	"websiteApi/internal/repository/models"
	"websiteApi/pkg/config"
)

// Uninstall godoc
// @Summary Uninstall extension and save reason
// @Description Uninstall an extension and save the reason for uninstallation
// @Tags extension
// @Accept json
// @Produce json
// @Param uninstall body models.Uninstall true "Uninstall object" example({"extensionName": "example-extension", "reason": "Not needed anymore"})
// @Success 200 {string} string "Email sent successfully"
// @Failure 400 {object} models.HttpError
// @Failure 500 {object} models.HttpError
// @Router /uninstall [post]
func Uninstall(writer http.ResponseWriter, request *http.Request) {
	var uninstall models.Uninstall
	err := json.NewDecoder(request.Body).Decode(&uninstall)
	if err != nil {
		helpers.WriteErrorResponse(writer, err, http.StatusBadRequest)
		return
	}
	if uninstall.Reason == "" || uninstall.ExtensionName == "" {
		helpers.WriteHttpErrorResponse(writer, models.NewHttpError("Missing Reason or Extension name parameter", http.StatusBadRequest))
		return
	}

	db, err := config.GetDB()
	if err != nil {
		helpers.WriteErrorResponse(writer, err, http.StatusInternalServerError)
		return
	}
	httpErr := services.SaveUninstall(db, uninstall)
	if !models.IsHttpErrorEmpty(httpErr) {
		helpers.WriteHttpErrorResponse(writer, httpErr)
		return
	}
	err = json.NewEncoder(writer).Encode(fmt.Sprintf("Uninstall reason saved successfully"))
	if err != nil {
		helpers.WriteErrorResponse(writer, err, http.StatusInternalServerError)
		return
	}
}
