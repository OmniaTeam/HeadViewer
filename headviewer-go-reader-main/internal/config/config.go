package config

import (
	"github.com/joho/godotenv"
	"os"
	"strconv"
)

type Config struct {
	Port            string
	SecretKey       string
	AccessTokenTtl  int
	RefreshTokenTtl int
	Postgres        *PostgresConfig
}

type PostgresConfig struct {
	Host     string
	Port     string
	User     string
	Password string
	Database string
	SSLMode  string
}

func New() *Config {

	config := &Config{}
	godotenv.Load()

	config.Port = os.Getenv("PORT")
	config.SecretKey = os.Getenv("SECRET_KEY")
	config.AccessTokenTtl, _ = strconv.Atoi(os.Getenv("ACCESS_TOKEN_TTL"))
	config.RefreshTokenTtl, _ = strconv.Atoi(os.Getenv("REFRESH_TOKEN_TTL"))
	config.Postgres = &PostgresConfig{
		Host:     os.Getenv("POSTGRES_HOST"),
		Port:     os.Getenv("POSTGRES_PORT"),
		User:     os.Getenv("POSTGRES_USER"),
		Password: os.Getenv("POSTGRES_PASSWORD"),
		Database: os.Getenv("POSTGRES_DATABASE"),
		SSLMode:  os.Getenv("POSTGRES_SSLMODE"),
	}
	return config
}
