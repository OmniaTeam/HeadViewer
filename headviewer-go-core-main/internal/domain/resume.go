package domain

type Resume struct {
	ID int `json:"id" gorm:"primary_key"`
	// полное имя
	Fio string `json:"fio" gorm:"type:varchar(255)"`
	// день рождения
	YearOld int `json:"year_old"`
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
	Grade          string `json:"grade" gorm:"type:varchar(255)"`
	ExperienceYear int    `json:"experience_year" gorm:"type:int"`
	// Зарплатные ожидания нижняя вилка
	SalaryExpectationsLow string `json:"salary_expectations_low" gorm:"type:varchar(255)"`
	// Зарплатные ожидания вурхняя вилка
	SalaryExpectationsHigh string       `json:"salary_expectations_high" gorm:"type:varchar(255)"`
	About                  string       `json:"about" gorm:"type:text"`
	Experiences            []Experience `gorm:"foreignKey:ResumeID"`
	Technologies           []Technology `gorm:"foreignKey:ResumeID"`
	Languages              []Languages  `gorm:"foreignKey:ResumeID"`
	Educations             []Education  `gorm:"foreignKey:ResumeID"`
	UserID                 int
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
	Status   string
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
	// название по формату Английский B1 либо без категории
	Name     string `json:"name" gorm:"type:varchar(255)"`
	ResumeID int
}

type Education struct {
	ID       int    `json:"id" gorm:"primary_key"`
	Name     string `json:"name" gorm:"type:varchar(255)"`
	Period   string `json:"period" gorm:"type:varchar(255)"`
	Faculty  string `json:"faculty" gorm:"type:varchar(255)"`
	Grade    string `json:"grade" gorm:"type:varchar(255)"`
	ResumeID int
}
