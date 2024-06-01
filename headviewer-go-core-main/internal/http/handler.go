package http

import (
	"github.com/gin-gonic/gin"
	"github.com/hibiken/asynq"
	"gorm.io/gorm"
	"headviewercore/internal/config"
	"headviewercore/internal/repository"
	"headviewercore/internal/service"
	"headviewercore/mw"
	"headviewercore/pkg/auth"
	"headviewercore/pkg/hash"
)

func NewHandlers(db *gorm.DB, client *asynq.Client, cfg *config.Config) *gin.Engine {

	// Repositories
	userRepo := repository.NewUsersRepo(db)

	// Services
	hasher := hash.NewHasher()
	authManager, _ := auth.NewManager(cfg.SecretKey)

	usersService := service.NewUsersService(userRepo, hasher, authManager, cfg.AccessTokenTtl, cfg.RefreshTokenTtl)

	// Handlers
	adminHandler := NewAdminHandler(usersService)
	userHandler := NewUserHandler(cfg.AccessTokenTtl, cfg.RefreshTokenTtl, usersService)
	resumeHandler := NewResumeHandler(db)
	templateHandler := NewTemplateHandler(db)

	// Middleware
	authMiddleware := mw.NewAuthMiddleware(usersService)

	g := gin.Default()
	g.Use(authMiddleware.Auth)

	// TODO delete test handler
	// Test
	g.POST("/create", adminHandler.SignUp)
	g.POST("/files", resumeHandler.UploadFiles)
	g.POST("/template", templateHandler.CreateTemplate)
	g.GET("/template", templateHandler.GetTemplates)
	g.DELETE("/template/:id", templateHandler.DeleteTemplate)
	g.GET("/resume", resumeHandler.GetResume)
	g.GET("/resume/:id", resumeHandler.GetResumeById)
	// User

	user := g.Group("/user")
	user.GET("", userHandler.Auth)
	user.GET("/logout", userHandler.Logout)
	user.POST("/change_password", userHandler.ChangePassword)
	user.PATCH("/change_fio", userHandler.ChangeFio)
	user.POST("/login", userHandler.SignIn)

	// Admin
	admin := g.Group("/admin")
	admin.GET("/user", adminHandler.GetUsers)
	admin.GET("/user/:id", adminHandler.GetUser)
	admin.POST("/user/register", adminHandler.SignUp)
	admin.DELETE("/user/:id", adminHandler.DeleteUser)
	admin.PATCH("/user/:id/change_fio", adminHandler.ChangeFio)
	admin.PATCH("/user/:id/change_password", adminHandler.ChangePassword)
	admin.PUT("/user/:id", adminHandler.UpdateUser)

	return g
}
