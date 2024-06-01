package repository

import (
	"context"
	"errors"
	"gorm.io/gorm"
	"headviewercore/internal/domain"
)

type UsersRepo struct {
	db *gorm.DB
}

func (r *UsersRepo) UpdateUser(ctx context.Context, user *domain.User) error {
	err := r.db.WithContext(ctx).Save(user).Error
	if err != nil {
		return err
	}
	return nil
}

func (r *UsersRepo) DeleteUser(ctx context.Context, userId int) error {
	err := r.db.WithContext(ctx).Delete(&domain.User{}, userId).Error
	return err
}

func (r *UsersRepo) GetUsers(ctx context.Context, offset, limit int) ([]domain.User, error) {
	var users []domain.User
	err := r.db.WithContext(ctx).Offset(offset).Limit(limit).Order("id desc").Find(&users).Error
	if err != nil {
		return nil, err
	}
	return users, nil
}

func (r *UsersRepo) GetCountUsers(ctx context.Context) (int, error) {
	var count int64
	err := r.db.WithContext(ctx).Model(&domain.User{}).Count(&count).Error
	if err != nil {
		return 0, err
	}
	return int(count), nil
}

func (r *UsersRepo) UpdatePassword(ctx context.Context, userId int, password string) error {
	err := r.db.WithContext(ctx).Model(&domain.User{}).Where("id = ?", userId).Update("password", password).Error
	return err
}

func (r *UsersRepo) UpdateFio(ctx context.Context, userId int, fio string) error {
	err := r.db.WithContext(ctx).Model(&domain.User{}).Where("id = ?", userId).Update("fio", fio).Error
	return err
}

func NewUsersRepo(db *gorm.DB) *UsersRepo {
	return &UsersRepo{
		db: db,
	}
}

func (r *UsersRepo) Create(ctx context.Context, user *domain.User) error {
	err := r.db.WithContext(ctx).Create(user).Error
	if errors.Is(err, gorm.ErrDuplicatedKey) {
		return domain.ErrUserAlreadyExists
	}

	return err
}

func (r *UsersRepo) GetByLogin(ctx context.Context, login string) (domain.User, error) {
	var user domain.User
	if err := r.db.WithContext(ctx).Where("login = ?", login).First(&user).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return domain.User{}, domain.ErrUserNotFound
		}

		return domain.User{}, err
	}

	return user, nil
}

func (r *UsersRepo) GetById(ctx context.Context, id int) (domain.User, error) {
	var user domain.User
	if err := r.db.WithContext(ctx).First(&user, id).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return domain.User{}, domain.ErrUserNotFound
		}
		return domain.User{}, err
	}
	return user, nil
}

//
//func (r *UsersRepo) GetByRefreshToken(ctx context.Context, refreshToken string) (domain.User, error) {
//	var user domain.User
//	if err := r.db.FindOne(ctx, bson.M{
//		"session.refreshToken": refreshToken,
//		"session.expiresAt":    bson.M{"$gt": time.Now()},
//	}).Decode(&user); err != nil {
//		if errors.Is(err, mongo.ErrNoDocuments) {
//			return domain.User{}, domain.ErrUserNotFound
//		}
//
//		return domain.User{}, err
//	}
//
//	return user, nil
//}
//
//func (r *UsersRepo) Verify(ctx context.Context, userID primitive.ObjectID, code string) error {
//	res, err := r.db.UpdateOne(ctx,
//		bson.M{"verification.code": code, "_id": userID},
//		bson.M{"$set": bson.M{"verification.verified": true, "verification.code": ""}})
//	if err != nil {
//		return err
//	}
//
//	if res.ModifiedCount == 0 {
//		return domain.ErrVerificationCodeInvalid
//	}
//
//	return nil
//}
//
//func (r *UsersRepo) SetSession(ctx context.Context, userID primitive.ObjectID, session domain.Session) error {
//	_, err := r.db.UpdateOne(ctx, bson.M{"_id": userID}, bson.M{"$set": bson.M{"session": session, "lastVisitAt": time.Now()}})
//
//	return err
//}
//
//func (r *UsersRepo) AttachSchool(ctx context.Context, userID, schoolId primitive.ObjectID) error {
//	_, err := r.db.UpdateOne(ctx, bson.M{"_id": userID}, bson.M{"$push": bson.M{"schools": schoolId}})
//
//	return err
//}
