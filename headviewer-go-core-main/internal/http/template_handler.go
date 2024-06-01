package http

import (
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
	"headviewercore/internal/domain"
	"net/http"
	"strconv"
	"strings"
)

type FilterResume struct {
	Ids []int `json:"ids"`
}
type TemplateHandler struct {
	db *gorm.DB
}

func NewTemplateHandler(db *gorm.DB) *TemplateHandler {
	return &TemplateHandler{db: db}
}

func (h *TemplateHandler) CreateTemplate(c *gin.Context) {
	var template domain.Template
	err := c.ShouldBindJSON(&template)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	err = h.db.Create(&template).Error
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, template)
}

func (h *TemplateHandler) GetTemplates(c *gin.Context) {
	pageStr := c.DefaultQuery("page", "1")
	pageSizeStr := c.DefaultQuery("limit", "20")

	page, err := strconv.Atoi(pageStr)
	if err != nil {
		c.Status(
			http.StatusBadRequest,
		)
		return
	}
	limit, err := strconv.Atoi(pageSizeStr)
	if err != nil {
		c.Status(
			http.StatusBadRequest,
		)
		return
	}
	if limit <= 0 || limit > 100 {
		limit = 20
	}

	offset := (page - 1) * limit

	var templates []domain.Template
	h.db.Offset(offset).Limit(limit).Order("id desc").Find(&templates)

	var count int64
	h.db.Model(&domain.Template{}).Count(&count)

	c.JSON(http.StatusOK, gin.H{
		"total":     count,
		"templates": templates,
	})

}

func (h *TemplateHandler) DeleteTemplate(c *gin.Context) {
	idStr := c.Param("id")
	if idStr == "" {
		c.Status(http.StatusBadRequest)
		return
	}
	h.db.Delete(&domain.Template{}, idStr)
	c.Status(http.StatusOK)
}

func (h *TemplateHandler) GetResumeByTemplate(c *gin.Context) {
	idStr := c.Param("id")
	var template domain.Template
	err := h.db.First(&template, idStr).Error
	if err != nil {
		c.Status(400)
		return
	}

	var resume []domain.Resume
	query := h.db
	if template.Position != "" {
		query = query.Where("LOWER(desired_position) LIKE ?", "%"+strings.ToLower(template.Position)+"%")
	}
	if template.Sitizen != "" {
		query.Where("citizenship = ?", template.Sitizen)
	}
	if template.City != "" {
		query.Where("residence = ?", template.City)
	}
	if template.SalaryLow > 0 {
		query.Where("salary_expectations_low >= ?", template.SalaryLow)
	}
	if template.SalaryHigh > 0 {
		query.Where("salary_expectations_high <= ?", template.SalaryHigh)
	}
	if template.AgeLow > 0 {
		query.Where("year_old >= ?", template.AgeLow)
	}
	if template.AgeHigh > 0 {
		query.Where("year_old <= ?", template.AgeHigh)
	}
	if template.ExpLow > 0 {
		query.Where("exp_low >= ?", template.ExpLow)
	}
	if template.ExpHigh > 0 {
		query.Where("exp_low <= ?", template.ExpHigh)
	}
}
