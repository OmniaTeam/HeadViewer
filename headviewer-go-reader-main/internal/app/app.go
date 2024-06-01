package app

import (
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
	"headviewerreader/internal/config"
	"headviewerreader/internal/http"
	"log"
)

type App struct {
	config *config.Config
	gin    *gin.Engine
	db     *gorm.DB
}

func New() *App {
	app := App{}
	//app.log = logger.CreateLogger("service")
	app.config = config.New()

	//app.gin = controllers.NewRouter(app.log, app.db, app.config)
	app.gin = http.NewHandlers(app.config)

	return &app
}

func (a *App) Run() {
	err := a.gin.Run(a.config.Port)
	if err != nil {
		log.Panic(err.Error(), a.gin)
	}
}
