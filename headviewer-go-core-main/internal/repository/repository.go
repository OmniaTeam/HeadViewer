package repository

import (
	"context"
	"headviewercore/internal/domain"
)

type Users interface {
	Create(ctx context.Context, user *domain.User) error
	GetByLogin(ctx context.Context, login string) (domain.User, error)
	GetById(ctx context.Context, userId int) (domain.User, error)
	UpdatePassword(ctx context.Context, userId int, password string) error
	UpdateFio(ctx context.Context, userId int, fio string) error
	GetUsers(ctx context.Context, offset, limit int) ([]domain.User, error)
	GetCountUsers(ctx context.Context) (int, error)
	DeleteUser(ctx context.Context, userId int) error
	UpdateUser(ctx context.Context, user *domain.User) error
	//GetByRefreshToken(ctx context.Context, refreshToken string) (domain.User, error)
	//Verify(ctx context.Context, userID int, code string) error
	//SetSession(ctx context.Context, userID int) error
}
