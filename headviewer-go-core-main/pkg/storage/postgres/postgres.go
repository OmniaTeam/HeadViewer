package postgres

import (
	"fmt"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"headviewercore/internal/config"
	"headviewercore/internal/domain"
)

func NewPostgresConnection(config *config.PostgresConfig) (*gorm.DB, error) {
	dsn := buildDSN(config)
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		return db, err
	}
	//migrationInit(db)
	return db, nil
}

func buildDSN(config *config.PostgresConfig) string {
	return fmt.Sprintf("host=%s port=%s user=%s password=%s dbname=%s sslmode=%s",
		config.Host, config.Port, config.User, config.Password, config.Database, config.SSLMode)
}

func migrationInit(db *gorm.DB) {
	//db.AutoMigrate(&domain.User{})
	db.AutoMigrate(&domain.Resume{})
	db.AutoMigrate(&domain.Technology{})
	db.AutoMigrate(&domain.Languages{})
	db.AutoMigrate(&domain.Experience{})
	db.AutoMigrate(&domain.Template{})
}
