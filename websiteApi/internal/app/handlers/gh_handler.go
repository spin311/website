package handlers

import (
	"encoding/json"
	"net/http"
	"websiteApi/internal/app/helpers"
	"websiteApi/internal/app/services"
	"websiteApi/internal/repository/models"
)

// GetStarredRepos godoc
// @Summary Get starred repositories
// @Description Get a list of starred repositories for the authenticated user
// @Tags gitHub
// @Produce json
// @Success 200 {array} models.GithubRepo
// @Failure 500 {object} models.HttpError
// @Router /starredRepos [get]
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
