import { createAsyncThunk } from '@reduxjs/toolkit'
import { RootState } from 'app/providers/store'
import { userApi } from 'entities'

interface Params {
    userId : number
}

export const deleteUserThunk = createAsyncThunk<void, Params, { state: RootState }>(
    'user/delete',
    async (Params, { dispatch }) => {
        try {
            await dispatch(userApi.endpoints.deleteUser.initiate(Params)).unwrap()
        } catch (error) {
            throw new Error('Unknown error')
        }
    }
)