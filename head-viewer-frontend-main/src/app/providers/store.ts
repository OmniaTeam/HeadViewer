import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { baseApi } from 'shared';
import { IUserSlice } from 'entities'

const rootReducer = combineReducers({
	[baseApi.reducerPath] : baseApi.reducer,
    user : IUserSlice.reducer
})

export const setupStore = () => configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(baseApi.middleware),
})

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']