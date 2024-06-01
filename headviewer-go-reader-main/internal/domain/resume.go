package domain

type Resume struct {
	ID int `json:"id" gorm:"primary_key"`
	// полное имя
	Fio string `json:"fio" gorm:"type:varchar(255)"`
	// день рождения
	Birthday string `json:"birthday" gorm:"type:date"`
	// город проживания
	Residence string `json:"residence" gorm:"type:varchar(255)"`
	//Гражданство
	Citizenship string `json:"citizenship" gorm:"type:varchar(255)"`
	//номер телефона
	Phone string `json:"phone" gorm:"type:varchar(12)"`
	Email string `json:"email" gorm:"type:varchar(255)"`
	//Желаемая должность
	DesiredPosition string `json:"desired_position" gorm:"type:varchar(255)"`
	// категория должности
	Grade string `json:"grade" gorm:"type:varchar(255)"`
	// Зарплатные ожидания формата 20000 - 50000
	SalaryExpectations string       `json:"salary_expectations" gorm:"type:varchar(255)"`
	Experiences        []Experience `gorm:"foreignKey:ResumeID"`
	Technologies       []Technology `gorm:"foreignKey:ResumeID"`
	Languages          []Languages  `gorm:"foreignKey:ResumeID"`
}

type Experience struct {
	ID int `json:"id" gorm:"primary_key"`
	// название камапании
	CompanyName string `json:"company_name" gorm:"type:varchar(255)"`
	// начало срока работы
	StartWork string `json:"start_work" gorm:"type:varchar(255)"`
	//конец срока работы
	EndWork string `json:"end_work" gorm:"type:varchar(255)"`
	// занимаемая должность
	Post string `json:"post" gorm:"type:varchar(255)"`
	// Обязанности должности
	Responsibilities string `json:"responsibilities" gorm:"type:varchar(255)"`
	// Достижения работника
	Progress string `json:"progress" gorm:"type:varchar(255)"`
	ResumeID int
}

type Technology struct {
	ID int `json:"id" gorm:"primary_key"`
	// название технологии
	Name     string `json:"name" gorm:"type:varchar(255)"`
	ResumeID int
}

type Languages struct {
	ID int `json:"id" gorm:"primary_key"`
	// название языка на русском
	Name string `json:"name" gorm:"type:varchar(255)"`
	// уровень владения по типу A1, B2
	Grade    string `json:"grade" gorm:"type:varchar(255)"`
	ResumeID int
}
