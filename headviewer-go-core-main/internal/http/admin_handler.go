package http

import (
	"errors"
	"github.com/gin-gonic/gin"
	"headviewercore/internal/domain"
	"headviewercore/internal/service"
	"net/http"
	"strconv"
)

type AdminHandler struct {
	userService service.UserService
}

func NewAdminHandler(userService service.UserService) *AdminHandler {
	return &AdminHandler{userService: userService}
}

func (uh *AdminHandler) SignUp(c *gin.Context) {
	var userCreate domain.UserCreate
	if err := c.BindJSON(&userCreate); err != nil {
		c.Status(http.StatusBadRequest)
		return
	}

	user, err := uh.userService.SignUp(c.Request.Context(), userCreate)
	if err != nil {
		if errors.Is(err, domain.ErrUserAlreadyExists) {
			c.Status(http.StatusConflict)
			return
		}
		c.Status(http.StatusInternalServerError)
		return
	}
	c.JSON(http.StatusOK, user.ToUserResponse())
}

func (uh *AdminHandler) ChangePassword(c *gin.Context) {
	userIdParam := c.Param("id")
	userId, err := strconv.Atoi(userIdParam)
	if err != nil {
		c.Status(http.StatusBadRequest)
		return
	}
	newPassword := c.Query("password")
	if newPassword == "" {
		c.Status(http.StatusBadRequest)
		return
	}

	err = uh.userService.SetPassword(c.Request.Context(), userId, newPassword)
	if err != nil {
		c.Status(http.StatusInternalServerError)
		return
	}
	c.Status(http.StatusOK)
}

func (uh *AdminHandler) ChangeFio(c *gin.Context) {

	userIdParam := c.Param("id")
	userId, err := strconv.Atoi(userIdParam)
	if err != nil {
		c.Status(http.StatusBadRequest)
		return
	}
	fio := c.Query("fio")
	if fio == "" {
		c.Status(http.StatusBadRequest)
		return
	}

	err = uh.userService.ChangeFio(c.Request.Context(), userId, fio)
	if err != nil {
		c.Status(http.StatusInternalServerError)
		return
	}
	c.Status(http.StatusOK)
}

func (uh *AdminHandler) UpdateUser(c *gin.Context) {

	userIdParam := c.Param("id")
	userId, err := strconv.Atoi(userIdParam)
	if err != nil {
		c.Status(http.StatusBadRequest)
		return
	}

	var userUpdate domain.UserUpdateByAdmin
	if err := c.BindJSON(&userUpdate); err != nil {
		c.Status(http.StatusBadRequest)
		return
	}

	err = uh.userService.UpdateUser(c.Request.Context(), userId, &userUpdate)
	if err != nil {
		c.Status(http.StatusInternalServerError)
		return
	}
	c.Status(http.StatusOK)
}

func (uh *AdminHandler) GetUsers(c *gin.Context) {

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

	users, count, err := uh.userService.GetUsers(c.Request.Context(), page, limit)
	if err != nil {
		c.Status(http.StatusInternalServerError)
		return
	}
	userOut := make([]domain.UserResponse, len(users))
	for i, user := range users {
		userOut[i] = user.ToUserResponse()
	}
	c.JSON(http.StatusOK, gin.H{
		"total": count,
		"users": userOut,
	})
}

func (uh *AdminHandler) DeleteUser(c *gin.Context) {

	userIdParam := c.Param("id")
	userId, err := strconv.Atoi(userIdParam)
	if err != nil {
		c.Status(http.StatusBadRequest)
		return
	}

	err = uh.userService.DeleteUser(c.Request.Context(), userId)
	if err != nil {
		c.Status(http.StatusInternalServerError)
		return
	}
	c.Status(http.StatusOK)
}

func (uh *AdminHandler) GetUser(c *gin.Context) {

	userIdParam := c.Param("id")
	userId, err := strconv.Atoi(userIdParam)
	if err != nil {
		c.Status(http.StatusBadRequest)
		return
	}

	user, err := uh.userService.GetUser(c.Request.Context(), userId)
	if err != nil {
		if errors.Is(err, domain.ErrUserNotFound) {
			c.Status(http.StatusNotFound)
			return
		}
		c.Status(http.StatusInternalServerError)
		return
	}
	c.JSON(http.StatusOK, user.ToUserResponse())
}
