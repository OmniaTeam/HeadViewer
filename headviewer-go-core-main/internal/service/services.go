package service

import (
	"context"
	"headviewercore/internal/domain"
)

type UserService interface {
	SignUp(ctx context.Context, input domain.UserCreate) (*domain.User, error)
	SignIn(ctx context.Context, input domain.UserSignInInput) (*domain.Tokens, *domain.User, error)
	GetUserByToken(ctx context.Context, token string) (*domain.User, error)
	ChangePassword(ctx context.Context, user *domain.User, oldPassword, newPassword string) error
	SetPassword(ctx context.Context, userId int, newPassword string) error
	ChangeFio(ctx context.Context, userId int, fio string) error
	GetUsers(ctx context.Context, page int, limit int) ([]domain.User, int, error)
	DeleteUser(ctx context.Context, userId int) error
	GetUser(ctx context.Context, userId int) (*domain.User, error)
	UpdateUser(ctx context.Context, userId int, userUpdate *domain.UserUpdateByAdmin) error
}

type Tasks interface {
	CreateFile(filePath string) error
}
