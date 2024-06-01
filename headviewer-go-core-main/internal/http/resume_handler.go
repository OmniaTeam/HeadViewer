package http

import (
	"bytes"
	"encoding/json"
	"fmt"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
	"headviewercore/internal/domain"
	"io"
	"mime/multipart"
	"net/http"
	"os"
	"strconv"
)

type ResumeHandler struct {
	db *gorm.DB
}

func NewResumeHandler(db *gorm.DB) *ResumeHandler {
	return &ResumeHandler{db: db}
}

func (r *ResumeHandler) UploadFiles(c *gin.Context) {

	value, ok := c.Get("user")
	if !ok {
		c.Status(403)
		return
	}
	user := value.(*domain.User)
	form, err := c.MultipartForm()
	if err != nil {
		c.String(http.StatusBadRequest, fmt.Sprintf("could not parse multipart form: %v", err))
		return
	}

	files := form.File["files"]
	for _, file := range files {
		filePath := file.Filename
		if err := c.SaveUploadedFile(file, filePath); err != nil {
			c.String(http.StatusInternalServerError, fmt.Sprintf("could not save file: %v", err))
			return
		}
		//_, err := ioutil.ReadFile(file.Filename)
		//if err != nil {
		//	return fmt.Errorf("could not read file: %w", err)
		//}

		file, _ := os.Open(filePath)
		//if err != nil {
		//	return fmt.Errorf("ошибка открытия файла: %v", err)
		//}
		defer file.Close()

		// Создаем буфер для хранения данных формы
		var requestBody bytes.Buffer
		writer := multipart.NewWriter(&requestBody)

		// Создаем форму файла
		part, _ := writer.CreateFormFile("file", filePath)
		//if err != nil {
		//	return fmt.Errorf("ошибка создания формы файла: %v", err)
		//}

		// Копируем файл в форму
		_, err = io.Copy(part, file)
		//if err != nil {
		//	return fmt.Errorf("ошибка копирования файла в форму: %v", err)
		//}

		// Закрываем writer, чтобы завершить формирование данных формы
		err = writer.Close()
		//if err != nil {
		//	return fmt.Errorf("ошибка закрытия writer: %v", err)
		//}

		// Создаем HTTP-запрос
		req, _ := http.NewRequest("POST", "https://readerhv.theomnia.ru/file", &requestBody)
		//if err != nil {
		//	return err
		//}

		// Устанавливаем заголовок Content-Type
		req.Header.Set("Content-Type", writer.FormDataContentType())

		// Отправляем HTTP-запрос
		client := &http.Client{}
		resp, _ := client.Do(req)
		var resume domain.Resume
		decoder := json.NewDecoder(resp.Body)
		decoder.Decode(&resume)
		resume.UserID = user.ID
		fmt.Println(resp)
	}
}

func (r *ResumeHandler) GetResume(c *gin.Context) {
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

	var resume []domain.Resume
	r.db.Offset(offset).Limit(limit).Order("id desc").Preload("Experiences").Preload("Languages").Preload("Technologies").Preload("Educations").First(&resume)
	//if len(resume) == 0 {
	//	c.Status(404)
	//	return
	//}

	var count int64
	r.db.Model(&domain.Resume{}).Count(&count)

	c.JSON(http.StatusOK, gin.H{
		"total":  count,
		"resume": resume,
	})
}

func (r *ResumeHandler) GetResumeById(c *gin.Context) {
	var result domain.Resume
	err := r.db.Preload("Experiences").Preload("Languages").Preload("Technologies").Preload("Educations").First(&result, "id = ?", c.Param("id")).Error
	if err != nil {
		c.String(http.StatusNotFound, fmt.Sprintf("could not find resume by id: %v", err))
	}
	c.JSON(200, result)
}
