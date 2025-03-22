package models

// Email represents an email in the system
//
//swagger:model
type Email struct {
	Subject   string
	Sender    string
	Body      string
	Contact   string
	Recipient string
}
