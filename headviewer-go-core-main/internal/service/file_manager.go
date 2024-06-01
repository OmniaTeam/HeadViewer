package service

import (
	"encoding/json"
	"github.com/hibiken/asynq"
)

type TaskManager struct {
	client *asynq.Client
}

func NewFileManager(client *asynq.Client) *TaskManager {
	return &TaskManager{client: client}
}

type TaskFile struct {
	FilePath string `json:"file_path"`
}

func NewTaskFile(pathFile string) *TaskFile {
	return &TaskFile{FilePath: pathFile}
}

func (fsm *TaskManager) CreateFile(filePath string) error {
	task, err := NewProcessFileTask(filePath)
	if err != nil {
		return err
	}
	fsm.client.Enqueue(task)
	return nil
}

func NewProcessFileTask(filePath string) (*asynq.Task, error) {
	payload, err := json.Marshal(NewTaskFile(filePath))
	if err != nil {
		return nil, err
	}
	return asynq.NewTask("process_file", payload), nil
}
