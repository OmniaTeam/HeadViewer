import { createAsyncThunk } from '@reduxjs/toolkit'
import { RootState } from 'app/providers/store'
import { IUserLoginReq, userApi } from 'entities'

export const signInUserThunk = createAsyncThunk<void, IUserLoginReq, { state: RootState }>(
    'user/signIn',
    async (Params, { dispatch }) => {
        try {
            await dispatch(userApi.endpoints.signIn.initiate(Params)).unwrap()
        } catch (error) {
            throw new Error('Unknown error')
        }
    }
)