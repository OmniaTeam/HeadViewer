import { createAsyncThunk } from '@reduxjs/toolkit'
import { RootState } from 'app/providers/store'
import { IUserRegisterReq, userApi } from 'entities'

export const signUpUserThunk = createAsyncThunk<void, IUserRegisterReq, { state: RootState }>(
    'user/signUp',
    async (Params, { dispatch }) => {
        try {
            await dispatch(userApi.endpoints.signUp.initiate(Params)).unwrap()
        } catch (error) {
            throw new Error('Unknown error')
        }
    }
)