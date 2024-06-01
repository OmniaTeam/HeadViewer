import { createAsyncThunk } from '@reduxjs/toolkit'
import { RootState } from 'app/providers/store'
import { userApi } from 'entities'

export const changeUserPasswordThunk = createAsyncThunk<void, { oldPassword: string, newPassword : string }, { state: RootState }>(
    'user/change_password',
    async (Params, { dispatch }) => {
        try {
            await dispatch(userApi.endpoints.changeUserPassword.initiate(Params)).unwrap()
        } catch (error) {
            throw new Error('Unknown error')
        }
    }
)