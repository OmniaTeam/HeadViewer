import { createAsyncThunk } from '@reduxjs/toolkit'
import { RootState } from 'app/providers/store'
import { templateApi } from 'entities'


export const deleteTemplateThunk = createAsyncThunk<void, { templateId: number }, { state: RootState }>(
    'user/delete',
    async (Params, { dispatch }) => {
        try {
            await dispatch(templateApi.endpoints.deleteTemplateById.initiate(Params)).unwrap()
        } catch (error) {
            throw new Error('Unknown error')
        }
    }
)