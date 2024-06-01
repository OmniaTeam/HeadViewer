package service

import (
	"context"
	"errors"
	"headviewercore/internal/domain"
	"headviewercore/internal/repository"
	"headviewercore/pkg/auth"
	"headviewercore/pkg/hash"
)

type UsersService struct {
	repo         repository.Users
	hasher       hash.PasswordHasher
	tokenManager auth.TokenManager

	accessTokenTTL  int
	refreshTokenTTL int
}

func (s *UsersService) UpdateUser(ctx context.Context, userId int, userUpdate *domain.UserUpdateByAdmin) error {
	user, err := s.repo.GetById(ctx, userId)
	if err != nil {
		return err
	}
	if userUpdate.Login != "" {
		user.Login = userUpdate.Login
	}
	if userUpdate.Password != "" {
		newPass, err := s.hasher.HashPassword(userUpdate.Password)
		if err != nil {
			return err
		}
		user.Password = newPass
	}
	if userUpdate.Fio != "" {
		user.Fio = userUpdate.Fio
	}
	if userUpdate.Role != "" {
		user.Role = userUpdate.Role
	}
	err = s.repo.UpdateUser(ctx, &user)
	if err != nil {
		return err
	}
	return nil
}

func (s *UsersService) GetUser(ctx context.Context, userId int) (*domain.User, error) {
	user, err := s.repo.GetById(ctx, userId)
	if err != nil {
		return nil, err
	}
	return &user, nil
}

func (s *UsersService) DeleteUser(ctx context.Context, userId int) error {
	err := s.repo.DeleteUser(ctx, userId)
	return err
}

func (s *UsersService) SetPassword(ctx context.Context, userId int, newPassword string) error {
	err := s.repo.UpdatePassword(ctx, userId, newPassword)
	if err != nil {
		return err
	}
	return nil
}

func (s *UsersService) ChangeFio(ctx context.Context, userId int, fio string) error {
	err := s.repo.UpdateFio(ctx, userId, fio)
	if err != nil {
		return err
	}
	return nil
}

func (s *UsersService) ChangePassword(ctx context.Context, user *domain.User, oldPassword, newPassword string) error {
	ok := s.hasher.CheckPassword(user.Password, oldPassword)
	if !ok {
		return domain.ErrIncorrectPassword
	}
	newPassword, _ = s.hasher.HashPassword(newPassword)
	err := s.repo.UpdatePassword(ctx, user.ID, newPassword)
	if err != nil {
		return err
	}
	return nil
}

func NewUsersService(repo repository.Users, hasher hash.PasswordHasher, tokenManager auth.TokenManager,
	accessTTL, refreshTTL int) *UsersService {
	return &UsersService{
		repo:            repo,
		hasher:          hasher,
		tokenManager:    tokenManager,
		accessTokenTTL:  accessTTL,
		refreshTokenTTL: refreshTTL,
	}
}

func (s *UsersService) SignUp(ctx context.Context, input domain.UserCreate) (*domain.User, error) {
	_, err := s.repo.GetByLogin(ctx, input.Login)
	if err != nil {
		if errors.Is(err, domain.ErrUserNotFound) {
			passwordHash, err := s.hasher.HashPassword(input.Password)
			if err != nil {
				return nil, err
			}

			user := domain.User{
				Password: passwordHash,
				Login:    input.Login,
				Fio:      input.Fio,
				Role:     input.Role,
			}

			if err := s.repo.Create(ctx, &user); err != nil {
				if errors.Is(err, domain.ErrUserAlreadyExists) {
					return nil, err
				}

				return nil, err
			}

			return &user, nil
		}
		return nil, err

	}
	return nil, domain.ErrUserAlreadyExists
}

func (s *UsersService) SignIn(ctx context.Context, input domain.UserSignInInput) (*domain.Tokens, *domain.User, error) {

	user, err := s.repo.GetByLogin(ctx, input.Login)
	if err != nil {
		if errors.Is(err, domain.ErrUserNotFound) {
			return nil, nil, err
		}

		return nil, nil, err
	}

	if s.hasher.CheckPassword(user.Password, input.Password) {
		accessToken, err := s.tokenManager.NewJWT(user.ID, s.accessTokenTTL)
		if err != nil {
			return nil, nil, err
		}
		refreshToken, err := s.tokenManager.NewRefreshToken(user.ID, s.refreshTokenTTL)
		if err != nil {
			return nil, nil, err
		}
		return &domain.Tokens{
			AccessToken:  accessToken,
			RefreshToken: refreshToken,
		}, &user, nil
	} else {
		return nil, nil, domain.ErrForbidden
	}

}

func (s *UsersService) GetUserByToken(ctx context.Context, token string) (*domain.User, error) {

	userId, err := s.tokenManager.Parse(token)
	if err != nil {
		return nil, domain.ErrForbidden
	}

	user, err := s.repo.GetById(ctx, userId)
	if err != nil {
		if errors.Is(err, domain.ErrUserNotFound) {
			return nil, err
		}

		return nil, err
	}
	return &user, nil
}

func (s *UsersService) GetUsers(ctx context.Context, page int, limit int) ([]domain.User, int, error) {

	offset := (page - 1) * limit

	users, err := s.repo.GetUsers(ctx, offset, limit)
	if err != nil {
		return nil, 0, err
	}
	count, err := s.repo.GetCountUsers(ctx)
	if err != nil {
		return nil, 0, err
	}
	return users, count, nil
}
