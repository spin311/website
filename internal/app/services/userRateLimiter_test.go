package services

import (
	"sync"
	"testing"
	"time"
)

func TestAllowPermitsUpToMaxTokensThenRejects(t *testing.T) {
	// Arrange
	limiter := NewUserRateLimiter(3, time.Hour)

	// Act & Assert
	for i := 1; i <= 3; i++ {
		if !limiter.Allow("user-1") {
			t.Fatalf("request %d should have been allowed", i)
		}
	}
	if limiter.Allow("user-1") {
		t.Error("the 4th request should have been rejected")
	}
}

func TestAllowTracksEachUserSeparately(t *testing.T) {
	// Arrange
	limiter := NewUserRateLimiter(1, time.Hour)

	// Act
	firstUserAllowed := limiter.Allow("user-1")
	firstUserSecondTry := limiter.Allow("user-1")
	secondUserAllowed := limiter.Allow("user-2")

	// Assert
	if !firstUserAllowed || !secondUserAllowed {
		t.Error("each user should get their own budget")
	}
	if firstUserSecondTry {
		t.Error("exhausting one user's budget must not depend on other users")
	}
}

func TestAllowRefillsTokensAfterTheRateInterval(t *testing.T) {
	// Arrange
	limiter := NewUserRateLimiter(1, 10*time.Millisecond)
	if !limiter.Allow("user-1") {
		t.Fatal("the first request should have been allowed")
	}
	if limiter.Allow("user-1") {
		t.Fatal("the budget should be exhausted")
	}

	// Act
	time.Sleep(15 * time.Millisecond)

	// Assert
	if !limiter.Allow("user-1") {
		t.Error("a token should have been refilled after the interval elapsed")
	}
}

func TestAllowIsSafeUnderConcurrentUse(t *testing.T) {
	// Arrange
	const goroutines = 50
	limiter := NewUserRateLimiter(10, time.Hour)
	var wg sync.WaitGroup
	var mu sync.Mutex
	allowed := 0

	// Act
	// Run with -race to catch unsynchronised access to the shared user map.
	for i := 0; i < goroutines; i++ {
		wg.Add(1)
		go func() {
			defer wg.Done()
			if limiter.Allow("user-1") {
				mu.Lock()
				allowed++
				mu.Unlock()
			}
		}()
	}
	wg.Wait()

	// Assert
	if allowed != 10 {
		t.Errorf("allowed = %d, want exactly the 10 available tokens", allowed)
	}
}
