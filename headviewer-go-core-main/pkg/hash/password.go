package hash

import (
	"golang.org/x/crypto/bcrypt"
)

// PasswordHasher provides hashing logic to securely store passwords.
type PasswordHasher interface {
	HashPassword(password string) (string, error)
	CheckPassword(hashedPassword, password string) bool
}

// SHA1Hasher uses SHA1 to hash passwords with provided salt.
type Hasher struct {
}

func NewHasher() *Hasher {
	return &Hasher{}
}

func (h *Hasher) HashPassword(password string) (string, error) {
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		return "", err
	}
	return string(hashedPassword), nil
}

func (h *Hasher) CheckPassword(hashedPassword, password string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(hashedPassword), []byte(password))
	return err == nil
}
