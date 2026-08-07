package models

import (
	"strings"
	"testing"
)

func TestValidateAcceptsCompleteConfig(t *testing.T) {
	// Arrange
	config := &EmailConfig{APIKey: "re_key", From: "site@example.com", Recipient: "owner@example.com"}

	// Act
	err := config.Validate()

	// Assert
	if err != nil {
		t.Errorf("expected no error, got %v", err)
	}
}

func TestValidateNamesEveryMissingVariable(t *testing.T) {
	// Arrange
	cases := map[string]struct {
		config *EmailConfig
		want   string
	}{
		"missing api key":   {&EmailConfig{From: "a@b.c", Recipient: "d@e.f"}, "RESEND_API_KEY"},
		"missing from":      {&EmailConfig{APIKey: "k", Recipient: "d@e.f"}, "EMAIL_FROM"},
		"missing recipient": {&EmailConfig{APIKey: "k", From: "a@b.c"}, "EMAIL_RECIPIENT"},
	}

	for name, tc := range cases {
		t.Run(name, func(t *testing.T) {
			// Act
			err := tc.config.Validate()

			// Assert
			if err == nil {
				t.Fatal("expected an error")
			}
			if !strings.Contains(err.Error(), tc.want) {
				t.Errorf("error = %q, want it to name %s", err, tc.want)
			}
		})
	}
}

func TestValidateReportsAllMissingVariablesAtOnce(t *testing.T) {
	// Arrange
	config := &EmailConfig{}

	// Act
	err := config.Validate()

	// Assert
	if err == nil {
		t.Fatal("expected an error")
	}
	for _, want := range []string{"RESEND_API_KEY", "EMAIL_FROM", "EMAIL_RECIPIENT"} {
		if !strings.Contains(err.Error(), want) {
			t.Errorf("error = %q, want it to name %s", err, want)
		}
	}
}
