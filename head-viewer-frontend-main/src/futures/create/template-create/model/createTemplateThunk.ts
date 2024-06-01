import { createAsyncThunk } from '@reduxjs/toolkit'
import { RootState } from 'app/providers/store'
import { ITemplateCreateReq, templateApi } from 'entities/template'

export const createTemplateThunk = createAsyncThunk<void, ITemplateCreateReq, { state: RootState }>(
    'template/create',
    async (Params, { dispatch }) => {
        try {
            await dispatch(templateApi.endpoints.createTemplate.initiate(Params)).unwrap()
        } catch (error) {
            throw new Error('Unknown error')
        }
    }
)