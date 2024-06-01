package http

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"headviewerreader/internal/config"
	"headviewerreader/internal/service"
	"log"
	"net/http"
	"os"
	"path/filepath"
	"time"
)

func NewHandlers(cfg *config.Config) *gin.Engine {

	// Repositories

	// Services
	gptService := service.NewGptService(cfg.SecretKey)

	// Handlers

	// Middleware

	g := gin.Default()

	g.POST("/file", func(c *gin.Context) {
		// Получаем файл из запроса
		file, err := c.FormFile("file")
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "No file is received"})
			return
		}

		// Определяем путь для сохранения файла
		filename := filepath.Base(file.Filename)
		savePath := fmt.Sprintf("./uploads/%s", filename)

		// Создаем директорию, если её нет
		if err := os.MkdirAll(filepath.Dir(savePath), os.ModePerm); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Unable to create directory"})
			return
		}

		// Сохраняем файл
		if err := c.SaveUploadedFile(file, savePath); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Unable to save file"})
			return
		}

		fileId, err := gptService.AddFile(savePath)
		if err != nil {
			return
		}
		time.Sleep(20 * time.Second)
		assistantId, err := gptService.CreateAssistant(fileId)
		if err != nil {
			return
		}
		//time.Sleep(20 * time.Second)

		threadId, runId := gptService.CreateThreadAndRun(assistantId, fileId)
		err = gptService.CheckRunner(threadId, runId)
		if err != nil {
			return
		}
		//time.Sleep(10 * time.Second)
		messages, err := gptService.ListMessages(threadId)
		if err != nil {
			return
		}
		log.Println(messages)
		//c.JSON(http.StatusOK, messages)
		c.JSON(http.StatusOK, gin.H{"message": messages})
	})

	return g
}
