package mw

import (
	"github.com/gin-gonic/gin"
	"headviewercore/internal/service"
	"net/http"
	"strings"
)

type AuthMiddleware struct {
	userService service.UserService
}

func NewAuthMiddleware(userService service.UserService) *AuthMiddleware {
	return &AuthMiddleware{userService: userService}
}

func (am *AuthMiddleware) Auth(c *gin.Context) {
	url := c.Request.URL.Path
	var roles []string
	switch {
	case strings.HasPrefix(url, "/user/login"):
		roles = nil

	case strings.HasPrefix(url, "/user"):
		roles = []string{}
	case strings.HasPrefix(url, "/files"):
		roles = []string{}
	case strings.HasPrefix(url, "/resume"):
		roles = []string{}
	case strings.HasPrefix(url, "/admin"):
		roles = []string{"Admin"}
	}

	if roles != nil {
		token, err := c.Cookie("access_token")
		if err != nil || token == "" {
			c.AbortWithStatus(403)
			return
		}
		user, err := am.userService.GetUserByToken(c.Request.Context(), token)
		if err != nil {
			c.AbortWithStatus(http.StatusForbidden)
			return
		}

		if checkRole(user.Role, roles) {
			c.Set("user", user)
			c.Next()
			return
		}
		c.AbortWithStatus(http.StatusForbidden)
		return
	}

	c.Next()

}

func checkRole(checkRole string, roles []string) bool {
	if len(roles) == 0 {
		return true
	}
	for _, role := range roles {
		if role == checkRole {
			return true
		}
	}
	return false
}
