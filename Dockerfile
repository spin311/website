# Build stage: compile a static binary with the Go version from go.mod.
FROM golang:1.23-alpine AS builder

WORKDIR /src

# Copy manifests first so dependency downloads stay cached across code changes.
COPY go.mod go.sum ./
RUN go mod download

COPY . .

# CGO is disabled so the binary runs on a minimal base image without libc.
RUN CGO_ENABLED=0 GOOS=linux go build -trimpath -ldflags="-s -w" -o /out/api ./cmd/api

# Runtime stage: no toolchain, no source, just the binary.
FROM alpine:3.20

# Root certificates are required for the outbound HTTPS calls to Resend, the
# GitHub API and Postgres. Alpine does not ship them by default.
RUN apk add --no-cache ca-certificates \
    && adduser -D -H -u 10001 appuser

WORKDIR /app
COPY --from=builder /out/api ./api

USER appuser

CMD ["./api"]
