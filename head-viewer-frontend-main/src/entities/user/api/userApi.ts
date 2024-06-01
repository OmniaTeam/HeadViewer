import { baseApi } from "../../../shared/api";
import { IUser, IUserChangeReq, IUserLoginReq, IUserRegisterReq } from "../model";

export const userApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        signIn : build.mutation<IUser, IUserLoginReq>({
			query : ( args : IUserLoginReq ) => ({
				url : "/user/login",
				headers : {
					"Content-Type": "application/json",
				},
				method : "POST",
				redirect : "follow",
				body : JSON.stringify({
					"login" : args.userLogin,
					"password" : args.userPassword
				})
			})
		}),
        signUp : build.mutation<IUser, IUserRegisterReq>({
			query : ( args : IUserRegisterReq ) => ({
				url : "/user",
				headers : {
					"Content-Type": "application/json",
				},
				method : "POST",
				redirect : "follow",
				body : JSON.stringify({
                    "fio" : args.userFio,
					"login" : args.userLogin,
					"password" : args.userPassword
				})
			})
		}),
		getUserByToken : build.query<IUser, any>({
			query : () => ({
				url : "/user",
				headers : {
					"Content-Type": "application/json",
				},
				method : "GET",
				redirect : "follow"
			})
		}),
        getUserById : build.query<any, { userId: number }>({
			query : ( args ) => ({
				url : `/admin/user/${args.userId}`,
				headers : {
					"Content-Type": "application/json",
				},
				method : "GET",
				redirect : "follow"
			})
		}),
		getUsers : build.query<any, any>({
			query : () => ({
				url : `/admin/user`,
				headers : {
					"Content-Type": "application/json",
				},
				method : "GET",
				redirect : "follow"
			})
		}),
		changeUser : build.mutation<any, IUserChangeReq>({
			query : ( args ) => ({
				url : `/admin/change/user/${args.userId}`,
				headers : {
					"Content-Type": "application/json",
				},
				method : "POST",
				body : JSON.stringify({
                    "fio" : args.userFio,
					"login" : args.userLogin,
					"password" : args.userPassword
				})
			})
		}),
		changeUserFio : build.mutation<any, { userFio: string }>({
			query : ( args ) => ({
				url : `/user/change_fio?fio=${args.userFio}`,
				headers : {
					"Content-Type": "application/json",
				},
				method : "PATCH"
			})
		}),
		changeUserPassword : build.mutation<any, { oldPassword: string, newPassword: string }>({
			query : ( args ) => ({
				url : `/user/change_password`,
				headers : {
					"Content-Type": "application/json",
				},
				method : "POST",
				body : JSON.stringify({
					"old_password" : args.oldPassword,
					"new_password" : args.newPassword
				})
			})
		}),
		deleteUser : build.mutation<any, { userId: number }>({
			query : ( args ) => ({
				url : `/admin/user/${args.userId}`,
				headers : {
					"Content-Type": "application/json",
				},
				method : "DELETE",
				redirect : "follow"
			})
		}),
        logout : build.query<any, any>({
			query : () => ({
				url : "/user/logout",
				headers : {
					"Content-Type": "application/json",
				},
				method : "GET",
				redirect : "follow"
			})
		}),
		createUser : build.mutation<IUser, { userFio: string, userLogin: string, userPassword: string, userRole: string }>({
			query : ( args ) => ({
				url : "/admin/user/register",
				headers : {
					"Content-Type": "application/json",
				},
				method : "POST",
				redirect : "follow",
				body : JSON.stringify({
                    "fio" : args.userFio,
					"login" : args.userLogin,
					"password" : args.userPassword,
					"role" : args.userRole
				})
			})
		}),
		changeUserById : build.mutation<any, { userId: number, userFio: string, userLogin: string, userPassword: string, userRole: string }>({
			query : ( args ) => ({
				url : `/admin/user/${args.userId}`,
				headers : {
					"Content-Type": "application/json",
				},
				method : "PUT",
				redirect : "follow",
				body : JSON.stringify({
                    "fio" : args.userFio,
					"login" : args.userLogin,
					"password" : args.userPassword,
					"role" : args.userRole
				})
			})
		})
    }),
});

export const {
	useSignInMutation,
    useSignUpMutation,
    useGetUserByTokenQuery,
    useGetUserByIdQuery,
    useDeleteUserMutation,
    useLogoutQuery,
	useChangeUserFioMutation,
	useChangeUserPasswordMutation,
	useGetUsersQuery,
	useCreateUserMutation,
	useChangeUserByIdMutation
} = userApi;