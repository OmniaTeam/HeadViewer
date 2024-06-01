package service

import (
	"bytes"
	"encoding/json"
	"errors"
	"fmt"
	"io"
	"io/ioutil"
	"log"
	"mime/multipart"
	"net/http"
	"net/url"
	"os"
	"path/filepath"
	"strconv"
	"time"
)

var gptUrl = "https://api.openai.com/v1"

type RequestThread struct {
	AssistantId string `json:"assistant_id"`
	Thread      struct {
		Messages []struct {
			Role    string   `json:"role"`
			Content string   `json:"content"`
			FileIds []string `json:"file_ids"`
		} `json:"messages"`
	} `json:"thread"`
}

type CreateThread struct {
	RunId  string `json:"id"`
	Thread string `json:"thread_id"`
}

type CheckStatusRunner struct {
	Status string `json:"status"`
}

type CreateAssistant struct {
	Instructions string `json:"instructions"`
	//Name         string   `json:"name"`
	Tools   []Tool   `json:"tools"`
	FileIDs []string `json:"file_ids"`
	Model   string   `json:"model"`
}

type Tool struct {
	Type string `json:"type"`
}

type Message struct {
	Role    string   `json:"role"`
	Content string   `json:"content"`
	FileIDs []string `json:"file_ids"`
}

type Thread struct {
	Messages []Message `json:"messages"`
}

type Payload struct {
	AssistantID string `json:"assistant_id"`
	Thread      Thread `json:"thread"`
}
type GptService struct {
	token string
}

func NewGptService(token string) *GptService {
	return &GptService{token: token}
}

func (g *GptService) CreateAssistant(fileId string) (string, error) {
	requestUrl, _ := url.JoinPath(gptUrl, "assistants")
	method := "POST"
	//	assistant := CreateAssistant{
	//		Tools: []Tool{
	//			{Type: "retrieval"},
	//		},
	//		Model: "gpt-3.5-turbo-0125",
	//		Instructions: fmt.Sprintf(`json ниже для  примера структуры, данные от туда брать не надо, а надо из текстового файла %s прикрепленного к сообщению и ассистенту, из данных файла необходимо получить информация для полей json:
	//{
	//    "fio": "Иван Иванов",
	//    "birthday": "1990-01-01",
	//    "residence": "Москва, Россия",
	//    "citizenship": "Россия",
	//    "phone": "89001234567",
	//    "email": "ivan.ivanov@example.com",
	//    "desired_position": "Разработчик программного обеспечения",
	//    "grade": "Старший",
	//    "salary_expectations": "80000 - 120000",
	//    "experiences": [
	//        {
	//            "company_name": "ТехноКорп",
	//            "start_work": "2015-06-01",
	//            "end_work": "2018-12-31",
	//            "post": "Младший разработчик",
	//            "responsibilities": "Разработка новых функций и исправление ошибок.",
	//            "progress": "Продвинут до старшего разработчика."
	//        },
	//        {
	//            "company_name": "Инновационные решения",
	//            "start_work": "2019-01-01",
	//            "end_work": "2021-05-31",
	//            "post": "Старший разработчик",
	//            "responsibilities": "Руководство командой разработчиков.",
	//            "progress": "Улучшено качество кода."
	//        }
	//    ],
	//    "technologies": [
	//        {
	//            "name": "Go"
	//        },
	//        {
	//            "name": "JavaScript"
	//        },
	//        {
	//            "name": "Python"
	//        }
	//    ],
	//    "languages": [
	//        {
	//            "name": "Русский",
	//            "grade": "C1"
	//        },
	//        {
	//            "name": "Английский",
	//            "grade": "B2"
	//        }
	//    ]
	//}
	//`, fileId),
	//		//Tools:   `{"type": "retrieval"}`,
	//		FileIDs: []string{fileId},
	//	}
	assistant := CreateAssistant{
		Tools: []Tool{
			{Type: "retrieval"},
		},
		Model:        "gpt-3.5-turbo-0125",
		Instructions: fmt.Sprintf(``),
		//Tools:   `{"type": "retrieval"}`,
		FileIDs: []string{fileId},
	}
	log.Println(assistant)
	jsonData, err := json.Marshal(assistant)
	log.Println(jsonData)
	client := &http.Client{}
	req, err := http.NewRequest(method, requestUrl, bytes.NewBuffer(jsonData))

	if err != nil {
		fmt.Println(err)
	}
	req.Header.Add("Content-Type", "application/json")
	req.Header.Add("OpenAI-Beta", "assistants=v1")
	req.Header.Add("Authorization", fmt.Sprintf("Bearer %s", g.token))

	res, err := client.Do(req)
	if err != nil {
		fmt.Println(err)

	}
	defer res.Body.Close()
	//log.Println(res.Body)
	if res.StatusCode != 200 {
		return "", errors.New("api error")
	}
	decoder := json.NewDecoder(res.Body)

	var result map[string]interface{}

	err = decoder.Decode(&result)
	if err != nil {
		log.Fatalf("Error unmarshaling JSON: %v", err)
	}
	assistantId := result["id"].(string)
	log.Println("assistantId:", assistantId)
	return assistantId, nil
}

func (g *GptService) AddFile(filePath string) (string, error) {
	requestUrl, _ := url.JoinPath(gptUrl, "files")
	method := "POST"

	payload := &bytes.Buffer{}
	writer := multipart.NewWriter(payload)
	_ = writer.WriteField("purpose", "assistants")
	file, errFile2 := os.Open(filePath)
	defer file.Close()
	part2,
		errFile2 := writer.CreateFormFile("file", filepath.Base(filePath))
	_, errFile2 = io.Copy(part2, file)
	if errFile2 != nil {
		fmt.Println(errFile2)
		return "", errFile2
	}
	err := writer.Close()
	if err != nil {
		fmt.Println(err)
		return "", err
	}

	client := &http.Client{}
	req, err := http.NewRequest(method, requestUrl, payload)

	if err != nil {
		fmt.Println(err)
		return "", err
	}
	req.Header.Add("Authorization", fmt.Sprintf("Bearer %s", g.token))

	req.Header.Set("Content-Type", writer.FormDataContentType())
	res, err := client.Do(req)
	if err != nil {
		fmt.Println(err)
		return "", err
	}
	fmt.Println(res)
	defer res.Body.Close()

	body, err := ioutil.ReadAll(res.Body)
	if err != nil {
		fmt.Println(err)
		return "", err
	}
	fmt.Println(string(body))

	var result map[string]interface{}

	err = json.Unmarshal(body, &result)
	if err != nil {
		log.Fatalf("Error unmarshaling JSON: %v", err)
	}
	fileId := result["id"].(string)
	//time.Sleep(15 * time.Second)
	return fileId, nil
}

func (g *GptService) CreateThreadAndRun(assistantId, fileId string) (string, string) {
	log.Println(assistantId, fileId)
	requestUrl, _ := url.JoinPath(gptUrl, "threads", "runs")
	method := "POST"

	//	payload := fmt.Sprintf(`{
	//	 "assistant_id": "%s",
	//	 "thread": {
	//	   "messages": [
	//	     {"role": "user",
	//	     "content": "%s",
	//	     "file_ids": ["%s"]
	//	     }
	//	   ]
	//	 }
	//	}`, assistantId, `Для этих gorm моделей составь соответствующий json на основе данных из файла
	//
	//type Resume struct {
	//	ID int json:id gorm:primary_key
	//	// полное имя
	//	Fio string json:fio gorm:type:varchar(255)
	//	// день рождения
	//	Birthday string json:birthday gorm:type:date
	//	// город проживания
	//	Residence string json:residence gorm:type:varchar(255)
	//	//Гражданство
	//	Citizenship string json:citizenship gorm:type:varchar(255)
	//	//номер телефона
	//	Phone string json:phone gorm:type:varchar(12)
	//	Email string json:email gorm:type:varchar(255)
	//	//Желаемая должность
	//	DesiredPosition string json:desired_position gorm:type:varchar(255)
	//	// категория должности
	//	Grade string json:grade gorm:type:varchar(255)
	//	// Зарплатные ожидания нижняя вилка
	//	SalaryExpectationsLow string json:salary_expectations_low gorm:type:varchar(255)
	//	// Зарплатные ожидания вурхняя вилка
	//	SalaryExpectationsHigh string       json:salary_expectations_high gorm:type:varchar(255)
	//	Experiences            []Experience gorm:foreignKey:ResumeID
	//	Technologies           []Technology gorm:foreignKey:ResumeID
	//	Languages              []Languages  gorm:foreignKey:ResumeID
	//	Educations             []Education  gorm:foreignKey:ResumeID
	//}
	//
	//type Experience struct {
	//	ID int json:id gorm:primary_key
	//	// название камапании
	//	CompanyName string json:company_name gorm:type:varchar(255)
	//	// начало срока работы
	//	StartWork string json:start_work gorm:type:varchar(255)
	//	//конец срока работы
	//	EndWork string json:end_work gorm:type:varchar(255)
	//	// занимаемая должность
	//	Post string json:post gorm:type:varchar(255)
	//	// Обязанности должности
	//	Responsibilities string json:responsibilities gorm:type:varchar(255)
	//	// Достижения работника
	//	Progress string json:progress gorm:type:varchar(255)
	//	ResumeID int
	//}
	//
	//type Technology struct {
	//	ID int json:id gorm:primary_key
	//	// название технологии
	//	Name     string json:name gorm:type:varchar(255)
	//	ResumeID int
	//}
	//
	//type Languages struct {
	//	ID int json:id gorm:primary_key
	//	// название по формату Английский B1 либо без категории
	//	Name     string json:name gorm:type:varchar(255)
	//	ResumeID int
	//}
	//
	//type Education struct {
	//	ID       int    json:id gorm:primary_key
	//	Name     string json:name gorm:type:varchar(255)
	//	Period   string json:period gorm:type:varchar(255)
	//	Grade    string json:grade gorm:type:varchar(255)
	//	ResumeID int
	//}`, fileId)
	//payload := RequestThread{
	//	AssistantId: assistantId,
	//	Thread: struct {
	//		Messages []struct {
	//			Role    string   `json:"role"`
	//			Content string   `json:"content"`
	//			FileIds []string `json:"file_ids"`
	//		} `json:"messages"`
	//	}(struct {
	//		Messages []struct {
	//			Role    string   `json:"role"`
	//			Content string   `json:"content"`
	//			FileIds []string `json:"file_ids"`
	//		} `json:"messages"`
	//	}{
	//		Messages: []struct {
	//			Role    string   `json:"role"`
	//			Content string   `json:"content"`
	//			FileIds []string `json:"file_ids"`
	//		}([]struct {
	//			Role    string   `json:"role"`
	//			Content string   `json:"content"`
	//			FileIds []string `json:"file_ids"`
	//		}{
	//			{
	//				Role: "user",
	//				Content: `Для этих gorm моделей составь соответствующий json на основе данных из файла
	//
	//type Resume struct {
	//	ID int json:"id" gorm:"primary_key"
	//	// полное имя
	//	Fio string json:"fio" gorm:"type:varchar(255)"
	//	// день рождения
	//	Birthday string json:"birthday" gorm:"type:date"
	//	// город проживания
	//	Residence string json:"residence" gorm:"type:varchar(255)"
	//	//Гражданство
	//	Citizenship string json:"citizenship" gorm:"type:varchar(255)"
	//	//номер телефона
	//	Phone string json:"phone" gorm:"type:varchar(12)"
	//	Email string json:"email" gorm:"type:varchar(255)"
	//	//Желаемая должность
	//	DesiredPosition string json:"desired_position" gorm:"type:varchar(255)"
	//	// категория должности
	//	Grade string json:"grade" gorm:"type:varchar(255)"
	//	// Зарплатные ожидания нижняя вилка
	//	SalaryExpectationsLow string json:"salary_expectations_low" gorm:"type:varchar(255)"
	//	// Зарплатные ожидания вурхняя вилка
	//	SalaryExpectationsHigh string       json:"salary_expectations_high" gorm:"type:varchar(255)"
	//	Experiences            []Experience gorm:"foreignKey:ResumeID"
	//	Technologies           []Technology gorm:"foreignKey:ResumeID"
	//	Languages              []Languages  gorm:"foreignKey:ResumeID"
	//	Educations             []Education  gorm:"foreignKey:ResumeID"
	//}
	//
	//type Experience struct {
	//	ID int json:"id" gorm:"primary_key"
	//	// название камапании
	//	CompanyName string json:"company_name" gorm:"type:varchar(255)"
	//	// начало срока работы
	//	StartWork string json:"start_work" gorm:"type:varchar(255)"
	//	//конец срока работы
	//	EndWork string json:"end_work" gorm:"type:varchar(255)"
	//	// занимаемая должность
	//	Post string json:"post" gorm:"type:varchar(255)"
	//	// Обязанности должности
	//	Responsibilities string json:"responsibilities" gorm:"type:varchar(255)"
	//	// Достижения работника
	//	Progress string json:"progress" gorm:"type:varchar(255)"
	//	ResumeID int
	//}
	//
	//type Technology struct {
	//	ID int json:"id" gorm:"primary_key"
	//	// название технологии
	//	Name     string json:"name" gorm:"type:varchar(255)"
	//	ResumeID int
	//}
	//
	//type Languages struct {
	//	ID int json:"id" gorm:"primary_key"
	//	// название по формату Английский B1 либо без категории
	//	Name     string json:"name" gorm:"type:varchar(255)"
	//	ResumeID int
	//}
	//
	//type Education struct {
	//	ID       int    json:"id" gorm:"primary_key"
	//	Name     string json:"name" gorm:"type:varchar(255)"
	//	Period   string json:"period" gorm:"type:varchar(255)"
	//	Grade    string json:"grade" gorm:"type:varchar(255)"
	//	ResumeID int
	//}
	//`,
	//				FileIds: []string{fileId},
	//			},
	//		}),
	//	}),
	//}

	query := `необходимо составить json (в ответе нужен только json от { до } без лишних слов и символов) для моделей gorm, данные для подстановки брать из файла резюме
type Resume struct {
	ID int json:id gorm:primary_key
	// полное имя
	Fio string json:fio gorm:type:varchar(255)
	// день рождения
	Birthday string json:birthday gorm:type:date
	// город проживания
	Residence string json:residence gorm:type:varchar(255)
	//Гражданство
	Citizenship string json:citizenship gorm:type:varchar(255)
	//номер телефона
	Phone string json:phone gorm:type:varchar(12)
	Email string json:email gorm:type:varchar(255)
	//Желаемая должность
	DesiredPosition string json:desired_position gorm:type:varchar(255)
	// категория должности
	Grade string json:grade gorm:type:varchar(255)
	// Зарплатные ожидания нижняя вилка
	SalaryExpectationsLow string json:salary_expectations_low gorm:type:varchar(255)
	// Зарплатные ожидания вурхняя вилка
	SalaryExpectationsHigh string       json:salary_expectations_high gorm:type:varchar(255)
	Experiences            []Experience gorm:foreignKey:ResumeID
	Technologies           []Technology gorm:foreignKey:ResumeID
	Languages              []Languages  gorm:foreignKey:ResumeID
	Educations             []Education  gorm:foreignKey:ResumeID
}

type Experience struct {
	ID int json:id gorm:primary_key
	// название камапании
	CompanyName string json:company_name gorm:type:varchar(255)
	// начало срока работы
	StartWork string json:start_work gorm:type:varchar(255)
	//конец срока работы
	EndWork string json:end_work gorm:type:varchar(255)
	// занимаемая должность
	Post string json:post gorm:type:varchar(255)
	// Обязанности должности
	Responsibilities string json:responsibilities gorm:type:varchar(255)
	// Достижения работника
	Progress string json:progress gorm:type:varchar(255)
	ResumeID int
}

type Technology struct {
	ID int json:id gorm:primary_key
	// название технологии
	Name     string json:name gorm:type:varchar(255)
	ResumeID int
}

type Languages struct {
	ID int json:id gorm:primary_key
	// название по формату Английский B1 либо без категории
	Name     string json:name gorm:type:varchar(255)
	ResumeID int
}

type Education struct {
	ID       int    json:id gorm:primary_key
	Name     string json:name gorm:type:varchar(255)
	Period   string json:period gorm:type:varchar(255)
	Grade    string json:grade gorm:type:varchar(255)
	ResumeID int
}`

	payload := fmt.Sprintf(`{
		"assistant_id": "%s",
		"thread": {
			"messages": [
				{
					"role": "user",
					"content": %s,
					"file_ids": ["%s"]
				}
			]
		}
	}`, assistantId, strconv.Quote(query), fileId)

	fmt.Println(payload)

	//jsonData, err := json.Marshal(payload)
	//log.Println(err)
	//var a string
	//json.Unmarshal(jsonData, &a)
	//log.Println(a)
	client := &http.Client{}
	req, err := http.NewRequest(method, requestUrl, bytes.NewBuffer([]byte(payload)))

	if err != nil {
		fmt.Println(err)
		return "", ""
	}
	req.Header.Add("Authorization", fmt.Sprintf("Bearer %s", g.token))
	req.Header.Add("Content-Type", "application/json")
	req.Header.Add("OpenAI-Beta", "assistants=v1")
	log.Println(req)
	res, err := client.Do(req)
	if err != nil {
		fmt.Println(err)
		return "", ""
	}
	defer res.Body.Close()
	fmt.Println(res)
	fmt.Println(res.Body)
	decoder := json.NewDecoder(res.Body)

	var result CreateThread

	err = decoder.Decode(&result)
	if err != nil {
		log.Fatalf("Error unmarshaling JSON: %v", err)
	}
	threadId := result.Thread
	runId := result.RunId
	log.Println("runId", runId)
	log.Println("threadId", threadId)
	return threadId, runId
}

func (g *GptService) CheckRunner(threadId, runId string) error {
	requestUrl, _ := url.JoinPath(gptUrl, "threads", threadId, "runs", runId)
	method := "GET"

	client := &http.Client{}
	req, err := http.NewRequest(method, requestUrl, nil)

	if err != nil {
		fmt.Println(err)
		return err
	}
	req.Header.Add("Authorization", fmt.Sprintf("Bearer %s", g.token))
	req.Header.Add("OpenAI-Beta", "assistants=v1")
	i := 0
	for {
		if i > 5 {
			return errors.New("api error")
		}
		res, err := client.Do(req)
		if err != nil {
			fmt.Println(err)
			return err
		}
		defer res.Body.Close()

		fmt.Println(res)
		decoder := json.NewDecoder(res.Body)

		var result CheckStatusRunner

		err = decoder.Decode(&result)
		if err != nil {
			log.Fatalf("Error unmarshaling JSON: %v", err)
		}
		check := result.Status
		log.Println(check)
		if check == "completed" {
			return nil
		}
		time.Sleep(3 * time.Second)
		i++
	}

}

func (g *GptService) ListMessages(threadId string) (string, error) {
	log.Println("ListMessages")
	requestUrl, _ := url.JoinPath(gptUrl, "threads", threadId, "messages")

	method := "GET"

	client := &http.Client{}
	req, err := http.NewRequest(method, requestUrl, nil)

	if err != nil {
		fmt.Println(err)
		return "", err
	}
	req.Header.Add("Content-Type", "application/json")
	req.Header.Add("Authorization", fmt.Sprintf("Bearer %s", g.token))
	req.Header.Add("OpenAI-Beta", "assistants=v1")

	res, err := client.Do(req)
	if err != nil {
		fmt.Println(err)
		return "", err
	}
	defer res.Body.Close()
	fmt.Println(res)
	body, _ := ioutil.ReadAll(res.Body)

	var result map[string]interface{}

	// Парсим JSON данные
	err = json.Unmarshal(body, &result)
	if err != nil {
		log.Fatalf("Error parsing JSON: %v", err)
	}

	// Извлекаем первый элемент content и его значение value
	data, ok := result["data"].([]interface{})
	if !ok || len(data) == 0 {
		log.Fatalf("No data found")
	}

	firstMessage, ok := data[0].(map[string]interface{})
	if !ok {
		log.Fatalf("Invalid data format for first message")
	}

	content, ok := firstMessage["content"].([]interface{})
	if !ok || len(content) == 0 {
		log.Fatalf("No content found in first message")
	}

	firstContent, ok := content[0].(map[string]interface{})
	if !ok {
		log.Fatalf("Invalid data format for first content")
	}

	text, ok := firstContent["text"].(map[string]interface{})
	if !ok {
		log.Fatalf("Invalid data format for text")
	}

	value, ok := text["value"].(string)
	if !ok {
		log.Fatalf("Invalid data format for value")
	}
	return value, nil
}
