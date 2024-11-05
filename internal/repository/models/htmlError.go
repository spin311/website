package models

import "fmt"

// HttpError represents an error that can be returned to the client
//
//swagger:model
type HttpError struct {
	//example: "invalid identifier"
	Message string
	//example: 400
	StatusCode int
}

func NewHttpError(message string, statusCode int) HttpError {
	return HttpError{
		Message:    message,
		StatusCode: statusCode,
	}
}

func NewHttpErrorFromError(message string, err error, statusCode int) HttpError {
	return HttpError{
		Message:    fmt.Sprintf("%s: %v", message, err),
		StatusCode: statusCode,
	}
}

func NewEmptyHttpError() HttpError {
	return HttpError{}
}

func IsHttpErrorEmpty(err HttpError) bool {
	return err == HttpError{}
}
