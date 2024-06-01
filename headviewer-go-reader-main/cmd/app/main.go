package main

import (
	"headviewerreader/internal/app"
	"log"
)

func main() {
	log.Println("starting application")
	application := app.New()
	application.Run()
}
