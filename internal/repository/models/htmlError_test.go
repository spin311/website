package models

import (
	"errors"
	"strings"
	"testing"
)

func TestNewHttpErrorCarriesMessageAndStatus(t *testing.T) {
	// Arrange & Act
	httpErr := NewHttpError("invalid identifier", 400)

	// Assert
	if httpErr.Message != "invalid identifier" {
		t.Errorf("message = %q, want the supplied message", httpErr.Message)
	}
	if httpErr.StatusCode != 400 {
		t.Errorf("status = %d, want 400", httpErr.StatusCode)
	}
}

func TestNewHttpErrorFromErrorAppendsTheCause(t *testing.T) {
	// Arrange & Act
	httpErr := NewHttpErrorFromError("decoding body", errors.New("unexpected EOF"), 400)

	// Assert
	if !strings.Contains(httpErr.Message, "decoding body") {
		t.Errorf("message = %q, want the prefix", httpErr.Message)
	}
	if !strings.Contains(httpErr.Message, "unexpected EOF") {
		t.Errorf("message = %q, want the wrapped cause", httpErr.Message)
	}
}

func TestIsHttpErrorEmptyDistinguishesSuccessFromFailure(t *testing.T) {
	// Arrange
	cases := map[string]struct {
		httpErr HttpError
		want    bool
	}{
		"zero value":        {NewEmptyHttpError(), true},
		"populated error":   {NewHttpError("boom", 500), false},
		"status only":       {HttpError{StatusCode: 500}, false},
		"message only":      {HttpError{Message: "boom"}, false},
		"explicit zero lit": {HttpError{}, true},
	}

	for name, tc := range cases {
		t.Run(name, func(t *testing.T) {
			// Act
			got := IsHttpErrorEmpty(tc.httpErr)

			// Assert
			if got != tc.want {
				t.Errorf("IsHttpErrorEmpty = %v, want %v", got, tc.want)
			}
		})
	}
}
