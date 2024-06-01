import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { EUserRoles } from "./enums";
import { IUser } from "./interfaces";
import { userApi } from "../api";

const initialState: IUser = {
    userId: 0,
    userFio: "Фамилия Имя Отчество",
    userLogin: "user-email@mail.ru",
    userRole: EUserRoles.Manager
}

export const IUserSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUserId : (state, action : PayloadAction<number>) => {
            state.userId = action.payload
        },
        setUserFio : (state, action : PayloadAction<string>) => {
            state.userFio = action.payload
        },
        setUserLogin : (state, action : PayloadAction<string>) => {
            state.userLogin = action.payload
        },
        setUserRole : (state, action : PayloadAction<EUserRoles>) => {
            state.userRole = action.payload
        }
    },
    extraReducers(builder) {
        builder.addMatcher(
            userApi.endpoints.getUserByToken.matchFulfilled,
            (state, action : any) => {
                state.userId = action.payload.id,
                state.userFio = action.payload.fio,
                state.userLogin = action.payload.login,
                state.userRole = action.payload.role
            }
        ),
        builder.addMatcher(
            userApi.endpoints.signIn.matchFulfilled,
            (state, action : any) => {
                state.userId = action.payload.id,
                state.userFio = action.payload.fio,
                state.userLogin = action.payload.login,
                state.userRole = action.payload.role
            }
        )
    },
})

export const {
    setUserId,
    setUserFio,
    setUserLogin,
    setUserRole
} = IUserSlice.actions