import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const orderApi = createApi({
  reducerPath: 'orderApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
    credentials: 'include', // 🔥 ESTA es la clave
  }),
  tagTypes: ['Orden'],
    endpoints: (builder) => ({
        getOrdenes: builder.query({
            query: () => '/api/ordenes',
            providesTags: ['Orden'],
        }),
        getOrdenById: builder.query({
            query: (id: string) => `/api/ordenes/${id}`,
            providesTags: ['Orden'],
        }),
        createOrden: builder.mutation({
            query: (nuevaOrden) => ({
                url: '/api/ordenes',
                method: 'POST',
                body: nuevaOrden,
            }),
            invalidatesTags: ['Orden'],
        }),
        updateOrden: builder.mutation({
            query: ({ id, ...data }) => ({
                url: `/api/ordenes/${id}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['Orden'],
        }),
        deleteOrden: builder.mutation({
            query: (id: string) => ({
                url: `/api/ordenes/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Orden'],
        }),
    }),
});

export const {
    useGetOrdenesQuery,
    useGetOrdenByIdQuery,
    useCreateOrdenMutation,
    useUpdateOrdenMutation,
    useDeleteOrdenMutation,
} = orderApi;