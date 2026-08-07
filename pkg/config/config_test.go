package config

import "testing"

func TestGetEmailConfigReadsResendVariables(t *testing.T) {
	// Arrange
	t.Setenv("RESEND_API_KEY", "re_key")
	t.Setenv("EMAIL_FROM", "site@example.com")
	t.Setenv("EMAIL_RECIPIENT", "owner@example.com")

	// Act
	config := GetEmailConfig()

	// Assert
	if config.APIKey != "re_key" || config.From != "site@example.com" || config.Recipient != "owner@example.com" {
		t.Errorf("config = %+v, want the environment values", config)
	}
	if err := config.Validate(); err != nil {
		t.Errorf("expected a fully populated config to validate, got %v", err)
	}
}

func TestGetGithubConfigReadsGithubVariables(t *testing.T) {
	// Arrange
	t.Setenv("GITHUB_TOKEN", "gh_token")
	t.Setenv("GITHUB_USERNAME", "octocat")

	// Act
	config := GetGithubConfig()

	// Assert
	if config.AccessToken != "gh_token" || config.Username != "octocat" {
		t.Errorf("config = %+v, want the environment values", config)
	}
}

func TestGetPortPrefersPlatformInjectedPort(t *testing.T) {
	// Arrange
	t.Setenv("PORT", "3000")
	t.Setenv("SERVER_PORT", "8080")

	// Act & Assert
	if port := GetPort(); port != "3000" {
		t.Errorf("port = %q, want the PORT value the platform routes to", port)
	}
}

func TestGetPortFallsBackToServerPortLocally(t *testing.T) {
	// Arrange
	t.Setenv("PORT", "")
	t.Setenv("SERVER_PORT", "8080")

	// Act & Assert
	if port := GetPort(); port != "8080" {
		t.Errorf("port = %q, want the SERVER_PORT fallback", port)
	}
}

func TestGetEnvStringReturnsEmptyWhenUnset(t *testing.T) {
	// Arrange
	t.Setenv("SOME_UNSET_VARIABLE", "")

	// Act & Assert
	if got := GetEnvString("SOME_UNSET_VARIABLE"); got != "" {
		t.Errorf("GetEnvString = %q, want empty string", got)
	}
}
