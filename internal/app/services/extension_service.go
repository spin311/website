package services

import (
	"encoding/json"
	"fmt"
	"github.com/patrickmn/go-cache"
	"io"
	"log"
	"net/http"
	"time"
	"websiteApi/internal/repository/models"
	"websiteApi/pkg/config"
)

var extCache = cache.New(24*time.Hour, 1*time.Hour)

func GetExtension(extensionId string) (models.Extension, models.HttpError) {
	if cached, found := extCache.Get(extensionId); found {
		log.Printf("/extension: Cache hit for extension ID: %s", extensionId)
		return cached.(models.Extension), models.NewEmptyHttpError()
	}

	url := fmt.Sprintf("https://chrome-stats.com/api/detail?id=%s", extensionId)

	// Create a new HTTP request
	req, err := http.NewRequest("GET", url, nil)
	if err != nil {
		return models.Extension{}, models.NewHttpError(err.Error(), http.StatusInternalServerError)
	}

	// Add headers
	req.Header.Set("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36")
	req.Header.Set("content-type", "application/json")
	req.Header.Set("accept", "application/json")
	apiKey := config.GetEnvString("CHROME_STATS_API_KEY")
	req.Header.Set("x-api-key", apiKey)

	// Send the request
	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		return models.Extension{}, models.NewHttpError(err.Error(), http.StatusInternalServerError)
	}
	defer func(Body io.ReadCloser) {
		err := Body.Close()
		if err != nil {
			return
		}
	}(resp.Body)

	if resp.StatusCode != http.StatusOK {
		return models.Extension{}, models.NewHttpError("Error fetching extension details", resp.StatusCode)
	}

	var extension models.Extension
	err = json.NewDecoder(resp.Body).Decode(&extension)
	if err != nil {
		return models.Extension{}, models.NewHttpError(err.Error(), http.StatusInternalServerError)
	}

	extCache.Set(extensionId, extension, cache.DefaultExpiration)
	log.Printf("/extension: Cache miss for extension ID: %s, fetched and cached", extensionId)
	return extension, models.NewEmptyHttpError()
}
