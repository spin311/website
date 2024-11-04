package handlers

import (
	"encoding/json"
	"net/http"
	"websiteApi/internal/app/helpers"
	"websiteApi/internal/app/services"
	"websiteApi/internal/repository/models"
)

func GetStarredRepos(writer http.ResponseWriter, _ *http.Request) {
	ghRepos, httpErr := services.GetStarredRepos()
	if !models.IsHttpErrorEmpty(httpErr) {
		helpers.WriteHttpErrorResponse(writer, httpErr)
		return
	}
	jsonErr := json.NewEncoder(writer).Encode(ghRepos)
	if jsonErr != nil {
		helpers.WriteErrorResponse(writer, jsonErr, http.StatusInternalServerError)
		return
	}
}
