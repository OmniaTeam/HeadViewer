package main

import (
	"bytes"
	"context"
	"encoding/json"
	"fmt"
	"github.com/hibiken/asynq"
	"headviewercore/internal/config"
	"headviewercore/internal/domain"
	"io"
	"io/ioutil"
	"log"
	"mime/multipart"
	"net/http"
	"os"
)

// ProcessFileTask представляет задачу для обработки файла
type ProcessFileTask struct {
	FilePath string `json:"file_path"`
}

func main() {
	conf := config.New()
	serv := asynq.NewServer(
		asynq.RedisClientOpt{Addr: fmt.Sprintf("%s:%s", conf.RedisConfig.Host, conf.RedisConfig.Port)},
		asynq.Config{
			Concurrency: 10, // количество воркеров
		},
	)

	mux := asynq.NewServeMux()
	mux.HandleFunc("process_file", processFileHandler)

	if err := serv.Run(mux); err != nil {
		log.Fatalf("could not run server: %v", err)
	}
}

func processFileHandler(ctx context.Context, t *asynq.Task) error {
	var p ProcessFileTask
	if err := json.Unmarshal(t.Payload(), &p); err != nil {
		return fmt.Errorf("could not unmarshal payload: %w", err)
	}

	_, err := ioutil.ReadFile(p.FilePath)
	if err != nil {
		return fmt.Errorf("could not read file: %w", err)
	}

	file, err := os.Open(p.FilePath)
	if err != nil {
		return fmt.Errorf("ошибка открытия файла: %v", err)
	}
	defer file.Close()

	// Создаем буфер для хранения данных формы
	var requestBody bytes.Buffer
	writer := multipart.NewWriter(&requestBody)

	// Создаем форму файла
	part, err := writer.CreateFormFile("file", p.FilePath)
	if err != nil {
		return fmt.Errorf("ошибка создания формы файла: %v", err)
	}

	// Копируем файл в форму
	_, err = io.Copy(part, file)
	if err != nil {
		return fmt.Errorf("ошибка копирования файла в форму: %v", err)
	}

	// Закрываем writer, чтобы завершить формирование данных формы
	err = writer.Close()
	if err != nil {
		return fmt.Errorf("ошибка закрытия writer: %v", err)
	}

	// Создаем HTTP-запрос
	req, err := http.NewRequest("POST", "https://readerhv.theomnia.ru/file", &requestBody)
	if err != nil {
		return err
	}

	// Устанавливаем заголовок Content-Type
	req.Header.Set("Content-Type", writer.FormDataContentType())

	// Отправляем HTTP-запрос
	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		return fmt.Errorf("ошибка отправки запроса: %v", err)
	}
	defer resp.Body.Close()
	body, _ := ioutil.ReadAll(resp.Body)

	var resume domain.Resume
	json.Unmarshal(body, &resume)

	// Удалите файл после успешной обработки
	if err := os.Remove(p.FilePath); err != nil {
		log.Printf("could not remove file: %v", err)
	}

	return nil
}

//func sendFileToOtherService(fileName string, fileData []byte) (string, error) {
//	body := new(bytes.Buffer)
//	writer := multipart.NewWriter(body)
//	part, err := writer.CreateFormFile("file", fileName)
//	if err != nil {
//		return "", err
//	}
//	part.Write(fileData)
//	writer.Close()
//
//	req, err := http.NewRequest("POST", otherServiceURL, body)
//	if err != nil {
//		return "", err
//	}
//	req.Header.Set("Content-Type", writer.FormDataContentType())
//
//	client := &http.Client{}
//	resp, err := client.Do(req)
//	if err != nil {
//		return "", err
//	}
//	defer resp.Body.Close()
//
//	respBody, err := ioutil.ReadAll(resp.Body)
//	if err != nil {
//		return "", err
//	}
//
//	if resp.StatusCode != http.StatusOK {
//		return "", fmt.Errorf("bad response from other service: %s", resp.Status)
//	}
//
//	return string(respBody), nil
//}
