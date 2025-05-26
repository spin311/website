package services

import (
	"encoding/json"
	"fmt"
	"github.com/patrickmn/go-cache"
	"io"
	"net/http"
	"time"
	"websiteApi/internal/repository/models"
	"websiteApi/pkg/config"
)

var ghCache = cache.New(4*time.Hour, 1*time.Hour)

func GetStarredRepos() ([]models.GithubRepo, models.HttpError) {
	if cached, found := ghCache.Get("githubRepos"); found {
		fmt.Printf("/starredRepos: Cache hit for starred repos")
		return cached.([]models.GithubRepo), models.NewEmptyHttpError()
	}
	githubConfig := config.GetGithubConfig()
	token := githubConfig.AccessToken
	username := githubConfig.Username
	client := &http.Client{}
	req, err := http.NewRequest("GET", "https://api.github.com/users/"+username+"/starred", nil)
	if err != nil {
		return nil, models.NewHttpError(err.Error(), http.StatusInternalServerError)
	}
	req.Header.Set("Authorization", "token "+token)
	resp, err := client.Do(req)
	if err != nil {
		return nil, models.NewHttpError(err.Error(), http.StatusInternalServerError)
	}
	defer func(Body io.ReadCloser) {
		err := Body.Close()
		if err != nil {
			return
		}
	}(resp.Body)
	if resp.StatusCode != http.StatusOK {
		return nil, models.NewHttpError("Error getting starred repos", resp.StatusCode)
	}
	var starredRepos []models.GithubRepo
	err = json.NewDecoder(resp.Body).Decode(&starredRepos)
	if err != nil {
		return nil, models.NewHttpError(err.Error(), http.StatusInternalServerError)
	}
	ghCache.Set("githubRepos", starredRepos, cache.DefaultExpiration)
	fmt.Printf("/starredRepos: Starred repos fetched and cached successfully")
	return starredRepos, models.NewEmptyHttpError()
}
