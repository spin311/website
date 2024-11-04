package services

import (
	"sync"
	"time"
)

type RateLimiter struct {
	mu         sync.Mutex
	tokens     int
	maxTokens  int
	rate       time.Duration
	lastRefill time.Time
}

func NewRateLimiter(maxTokens int, rate time.Duration) *RateLimiter {
	return &RateLimiter{
		tokens:     maxTokens,
		maxTokens:  maxTokens,
		rate:       rate,
		lastRefill: time.Now(),
	}
}

func (rl *RateLimiter) Allow() bool {
	rl.mu.Lock()
	defer rl.mu.Unlock()

	now := time.Now()
	elapsed := now.Sub(rl.lastRefill)

	refillTokens := int(elapsed / rl.rate)
	if refillTokens > 0 {
		rl.tokens = min(rl.maxTokens, rl.tokens+refillTokens)
		rl.lastRefill = now
	}

	if rl.tokens > 0 {
		rl.tokens--
		return true
	}

	return false
}

type UserRateLimiter struct {
	mu        sync.Mutex
	users     map[string]*RateLimiter
	maxTokens int
	rate      time.Duration
}

func NewUserRateLimiter(maxTokens int, rate time.Duration) *UserRateLimiter {
	return &UserRateLimiter{
		users:     make(map[string]*RateLimiter),
		maxTokens: maxTokens,
		rate:      rate,
	}
}

func (url *UserRateLimiter) Allow(userID string) bool {
	url.mu.Lock()
	defer url.mu.Unlock()

	limiter, exists := url.users[userID]
	if !exists {
		limiter = NewRateLimiter(url.maxTokens, url.rate)
		url.users[userID] = limiter
	}

	return limiter.Allow()
}
