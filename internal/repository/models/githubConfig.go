package models

// GithubConfig represents the configuration for the Github API
//
//swagger:model
type GithubConfig struct {
	AccessToken string
	Username    string
}
