package services

import (
	"gorm.io/gorm"
	"websiteApi/internal/repository/models"
)

func SaveUninstall(db *gorm.DB, form models.Uninstall) models.HttpError {
	err := db.Create(&form).Error
	if err != nil {
		return models.NewHttpError(err.Error(), 500)
	}
	return models.NewEmptyHttpError()
}
