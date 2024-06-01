package domain

type Role string

var (
	RoleAdmin     Role = "Admin"
	RoleRecruiter Role = "Recruiter"
	RoleManager   Role = "Manager"
	RoleRManager  Role = "RManager"
)

type User struct {
	ID       int    `json:"id" gorm:"primary_key"`
	Fio      string `json:"fio" gorm:"type: varchar(255); not null"`
	Login    string `json:"login" gorm:"type: varchar(255); not null"`
	Password string `json:"password" gorm:"type: varchar(255); not null"`
	Role     string `json:"role" gorm:"type: varchar(255); not null"`
}
type UserCreate struct {
	Fio      string `json:"fio"`
	Login    string `json:"login"`
	Password string `json:"password"`
	Role     string `json:"role"`
}

type UserUpdateByAdmin struct {
	Fio      string `json:"fio"`
	Login    string `json:"login"`
	Password string `json:"password"`
	Role     string `json:"role"`
}

type UserSignInInput struct {
	Login    string `json:"login"`
	Password string `json:"password"`
}

type Tokens struct {
	AccessToken  string
	RefreshToken string
}

type ChangePassword struct {
	OldPassword string `json:"old_password"`
	NewPassword string `json:"new_password"`
}

type UserResponse struct {
	ID    int    `json:"id"`
	Fio   string `json:"fio"`
	Login string `json:"login"`
	Role  string `json:"role"`
}

func (u *User) ToUserResponse() UserResponse {
	return UserResponse{
		ID:    u.ID,
		Fio:   u.Fio,
		Login: u.Login,
		Role:  u.Role,
	}
}
