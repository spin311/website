package models

// GithubRepo represents a Github repository
//
//swagger:model
type GithubRepo struct {
	RepoName  string `json:"name"`
	RepoStar  int    `json:"stargazers_count"`
	RepoFork  int    `json:"forks_count"`
	CreatedAt string `json:"created_at"`
}
