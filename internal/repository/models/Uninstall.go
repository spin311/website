package models

import "time"

type Uninstall struct {
	ID            int       `gorm:"primaryKey;autoIncrement" json:"-"`
	ExtensionName string    `gorm:"type:varchar(255);not null" json:"extension_name"`
	Reason        string    `gorm:"type:varchar(255);not null" json:"reason"`
	Contact       string    `gorm:"type:varchar(255)" json:"contact"`
	CreatedAt     time.Time `gorm:"autoCreateTime" json:"-"`
	Message       string    `gorm:"type:text" json:"message"`
}
