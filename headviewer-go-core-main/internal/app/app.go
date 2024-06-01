package app

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"github.com/hibiken/asynq"
	"gorm.io/gorm"
	"headviewercore/internal/config"
	"headviewercore/internal/http"
	"headviewercore/pkg/storage/postgres"
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
	app.db, _ = postgres.NewPostgresConnection(
		app.config.Postgres,
	)

	db, _ := postgres.NewPostgresConnection(app.config.Postgres)
	client := asynq.NewClient(asynq.RedisClientOpt{
		Addr: fmt.Sprintf("%s:%s", app.config.RedisConfig.Host, app.config.RedisConfig.Port)})

	//app.gin = controllers.NewRouter(app.log, app.db, app.config)
	app.gin = http.NewHandlers(db, client, app.config)

	return &app
}

func (a *App) Run() {
	err := a.gin.Run(a.config.Port)
	if err != nil {
		log.Panic(err.Error(), a.gin)
	}
}
