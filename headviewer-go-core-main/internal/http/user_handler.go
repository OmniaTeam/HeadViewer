package http

import (
	"errors"
	"github.com/gin-gonic/gin"
	"headviewercore/internal/domain"
	"headviewercore/internal/service"
	"net/http"
)

type UserHandler struct {
	AccessTokenTtl  int
	RefreshTokenTtl int
	userService     service.UserService
}

func NewUserHandler(accessTokenTtl int, refreshTokenTtl int, userService service.UserService) *UserHandler {
	return &UserHandler{AccessTokenTtl: accessTokenTtl, RefreshTokenTtl: refreshTokenTtl, userService: userService}
}

func (h *UserHandler) SignIn(c *gin.Context) {
	var userSignInInput domain.UserSignInInput
	if err := c.BindJSON(&userSignInInput); err != nil {
		c.Status(http.StatusBadRequest)
		return
	}
	tokens, user, err := h.userService.SignIn(c.Request.Context(), userSignInInput)
	switch {
	case err == nil:
		c.SetCookie("access_token", tokens.AccessToken, h.AccessTokenTtl*60*60, "/", "", true, true)
		c.SetCookie("refresh_token", tokens.RefreshToken, h.RefreshTokenTtl*24*60*60, "/", "", true, true)
		c.JSON(http.StatusOK, user.ToUserResponse())
		return
	case errors.Is(err, domain.ErrForbidden):
		c.Status(http.StatusForbidden)
		return
	case errors.Is(err, domain.ErrUserNotFound):
		c.Status(http.StatusForbidden)
		return
	default:
		c.Status(http.StatusInternalServerError)
		return
	}
}

func (h *UserHandler) Auth(c *gin.Context) {
	user, ok := c.Get("user")
	if !ok {
		c.Status(http.StatusForbidden)
		return
	}
	d := user.(*domain.User)
	c.JSON(200, d.ToUserResponse())
}

func (h *UserHandler) ChangePassword(c *gin.Context) {
	user, ok := c.Get("user")
	if !ok {
		c.Status(http.StatusForbidden)
		return
	}

	var changePass domain.ChangePassword
	if err := c.BindJSON(&changePass); err != nil {
		c.Status(http.StatusBadRequest)
		return
	}

	d := user.(*domain.User)
	err := h.userService.ChangePassword(c.Request.Context(), d, changePass.OldPassword, changePass.NewPassword)
	if err != nil {
		if errors.Is(err, domain.ErrIncorrectPassword) {
			c.Status(http.StatusForbidden)
			return
		}
		c.Status(http.StatusInternalServerError)
		return
	}
	c.Status(http.StatusOK)
}

func (h *UserHandler) ChangeFio(c *gin.Context) {
	user, ok := c.Get("user")
	if !ok {
		c.Status(http.StatusForbidden)
		return
	}

	fio := c.Query("fio")
	if fio == "" {
		c.Status(http.StatusBadRequest)
		return
	}

	d := user.(*domain.User)
	err := h.userService.ChangeFio(c.Request.Context(), d.ID, fio)
	if err != nil {
		c.Status(http.StatusInternalServerError)
		return
	}
	c.Status(http.StatusOK)
}

func (h *UserHandler) Logout(c *gin.Context) {

	c.SetCookie("access_token", "", -1, "/", "", true, true)
	c.SetCookie("refresh_token", "", -1, "/", "", true, true)
}
