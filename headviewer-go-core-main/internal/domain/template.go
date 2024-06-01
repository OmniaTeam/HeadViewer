package domain

import "github.com/lib/pq"

type Template struct {
	ID         int           `json:"id" gorm:"primary_key"`
	Name       string        `json:"name"`
	Position   string        `json:"position"`
	Skills     pq.Int64Array `json:"skills" gorm:"type:integer[]"`
	Sitizen    string        `json:"sitizen"`
	City       string        `json:"city"`
	SalaryLow  int           `json:"salary_low"`
	SalaryHigh int           `json:"salary_high"`
	AgeLow     int           `json:"age_low"`
	AgeHigh    int           `json:"age_high"`
	ExpLow     int           `json:"exp_low"`
	ExpHigh    int           `json:"exp_high"`
}
