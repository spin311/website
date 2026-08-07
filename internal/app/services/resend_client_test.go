package services

import (
	"context"
	"encoding/json"
	"io"
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"
	"time"
)

func testMessage() OutboundMessage {
	return OutboundMessage{
		From:    "site@example.com",
		To:      "owner@example.com",
		Subject: "Question about program",
		Text:    "From: John Doe\n\nHello, World!",
	}
}

// newTestClient points a ResendClient at a stub server instead of the real API.
func newTestClient(server *httptest.Server) *ResendClient {
	return &ResendClient{
		apiKey:     "re_test_key",
		baseURL:    server.URL,
		httpClient: &http.Client{Timeout: requestTimeout},
	}
}

func TestSendPostsExpectedRequestToResend(t *testing.T) {
	// Arrange
	var gotMethod, gotAuth, gotContentType string
	var gotBody resendRequest
	server := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		gotMethod = r.Method
		gotAuth = r.Header.Get("Authorization")
		gotContentType = r.Header.Get("Content-Type")
		raw, _ := io.ReadAll(r.Body)
		json.Unmarshal(raw, &gotBody)
		w.WriteHeader(http.StatusOK)
		w.Write([]byte(`{"id":"49a3999c-0ce1-4ea6-ab68-afcd6dc2e794"}`))
	}))
	defer server.Close()

	// Act
	err := newTestClient(server).Send(context.Background(), testMessage())

	// Assert
	if err != nil {
		t.Fatalf("expected success, got %v", err)
	}
	if gotMethod != http.MethodPost {
		t.Errorf("method = %s, want POST", gotMethod)
	}
	if gotAuth != "Bearer re_test_key" {
		t.Errorf("Authorization = %q, want bearer token", gotAuth)
	}
	if gotContentType != "application/json" {
		t.Errorf("Content-Type = %q, want application/json", gotContentType)
	}
	if len(gotBody.To) != 1 || gotBody.To[0] != "owner@example.com" {
		t.Errorf("to = %v, want [owner@example.com]", gotBody.To)
	}
	if gotBody.From != "site@example.com" || gotBody.Subject != "Question about program" {
		t.Errorf("unexpected from/subject: %+v", gotBody)
	}
	if !strings.Contains(gotBody.Text, "Hello, World!") {
		t.Errorf("text = %q, want the message body", gotBody.Text)
	}
}

func TestSendReturnsErrorOnNon2xxResponse(t *testing.T) {
	// Arrange
	server := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusUnprocessableEntity)
		w.Write([]byte(`{"message":"domain is not verified"}`))
	}))
	defer server.Close()

	// Act
	err := newTestClient(server).Send(context.Background(), testMessage())

	// Assert
	if err == nil {
		t.Fatal("expected an error for a 422 response")
	}
	if !strings.Contains(err.Error(), "422") {
		t.Errorf("error = %q, want it to mention the status code", err)
	}
	if !strings.Contains(err.Error(), "domain is not verified") {
		t.Errorf("error = %q, want it to include the provider detail for the log", err)
	}
}

func TestSendReturnsErrorWhenRequestIsCancelled(t *testing.T) {
	// Arrange
	// The handler must always return on its own; relying solely on the server
	// noticing the client disconnect would leave server.Close() blocked.
	server := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		select {
		case <-r.Context().Done():
		case <-time.After(2 * time.Second):
		}
	}))
	defer server.Close()
	ctx, cancel := context.WithTimeout(context.Background(), 50*time.Millisecond)
	defer cancel()

	// Act
	err := newTestClient(server).Send(ctx, testMessage())

	// Assert
	if err == nil {
		t.Fatal("expected an error when the context expires")
	}
}

func TestNewResendClientTargetsTheLiveAPIOverHTTPS(t *testing.T) {
	// Arrange & Act
	client := NewResendClient("re_key")

	// Assert
	if !strings.HasPrefix(client.baseURL, "https://") {
		t.Errorf("baseURL = %q, want an HTTPS endpoint", client.baseURL)
	}
	if client.httpClient.Timeout != requestTimeout {
		t.Errorf("timeout = %v, want %v", client.httpClient.Timeout, requestTimeout)
	}
}
