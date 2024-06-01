import { createAsyncThunk } from '@reduxjs/toolkit'
import { RootState } from 'app/providers/store'
import { userApi } from 'entities'

export const changeUserByIdThunk = createAsyncThunk<void, { userId: number, userFio: string, userLogin: string, userPassword: string, userRole: string }, { state: RootState }>(
    'user/change_by_id',
    async (Params, { dispatch }) => {
        try {
            await dispatch(userApi.endpoints.changeUserById.initiate(Params)).unwrap()
        } catch (error) {
            throw new Error('Unknown error')
        }
    }
)