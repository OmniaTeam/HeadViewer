import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const baseApi = createApi({
    reducerPath : "baseApi",
    baseQuery : fetchBaseQuery({
        baseUrl: "https://devhv.theomnia.ru/api/"
    }),
    endpoints: () => ({})
});