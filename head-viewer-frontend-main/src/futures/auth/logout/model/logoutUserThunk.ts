import { createAsyncThunk } from '@reduxjs/toolkit'
import { RootState } from 'app/providers/store'
import { userApi } from 'entities'

export const logoutUserThunk = createAsyncThunk<void, any, { state: RootState }>(
    'user/logout',
    async (_, { dispatch }) => {
        try {
            await dispatch(userApi.endpoints.logout.initiate({})).unwrap()
        } catch (error) {
            throw new Error('Unknown error')
        }
    }
)