import { createAsyncThunk } from '@reduxjs/toolkit'
import { RootState } from 'app/providers/store'
import { IUserChangeReq, userApi } from 'entities'

export const changeUserThunk = createAsyncThunk<void, IUserChangeReq, { state: RootState }>(
    'user/change',
    async (Params, { dispatch }) => {
        try {
            await dispatch(userApi.endpoints.changeUser.initiate(Params)).unwrap()
        } catch (error) {
            throw new Error('Unknown error')
        }
    }
)