import { createAsyncThunk } from '@reduxjs/toolkit'
import { RootState } from 'app/providers/store'
import { userApi } from 'entities'

export const createUserThunk = createAsyncThunk<void, { userFio: string, userLogin: string, userPassword: string, userRole: string }, { state: RootState }>(
    'user/create',
    async (Params, { dispatch }) => {
        try {
            await dispatch(userApi.endpoints.createUser.initiate(Params)).unwrap()
        } catch (error) {
            throw new Error('Unknown error')
        }
    }
)