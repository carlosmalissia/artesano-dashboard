// /redux/services/imagenesApi.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const imagenesApi = createApi({
    reducerPath: 'imagenesApi',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL, // ej: http://localhost:4000/api
    }),
    endpoints: (builder) => ({
        uploadImage: builder.mutation<{ imageUrl: string }, FormData>({
            query: (formData) => ({
                url: '/api/images/upload',
                method: 'POST',
                body: formData,
            }),
        }),

        deleteImage: builder.mutation<{ message: string }, { imageUrl: string }>({
            query: ({ imageUrl }) => ({
                url: '/api/images/remove',
                method: 'DELETE',
                body: { imageUrl },
            }),
        }),
    }),
});

export const {
    useUploadImageMutation,
    useDeleteImageMutation,
} = imagenesApi;
