import { createAsyncThunk } from '@reduxjs/toolkit'
import { RootState } from 'app/providers/store'
import { userApi } from 'entities'

export const changeUserFioThunk = createAsyncThunk<void, { userFio: string }, { state: RootState }>(
    'user/change_fio',
    async (Params, { dispatch }) => {
        try {
            await dispatch(userApi.endpoints.changeUserFio.initiate(Params)).unwrap()
        } catch (error) {
            throw new Error('Unknown error')
        }
    }
)