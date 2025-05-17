import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const productosApi = createApi({
    reducerPath: 'productosApi',
    baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL }),
    tagTypes: ['Producto'],
    endpoints: (builder) => ({
        getProductos: builder.query({
            query: () => '/api/productos',
            providesTags: ['Producto'],
        }),
        getProductoById: builder.query({
            query: (id: string) => `/api/productos/${id}`,
            providesTags: ['Producto'],
        }),
        createProducto: builder.mutation({
            query: (nuevoProducto) => ({
                url: '/api/productos',
                method: 'POST',
                body: nuevoProducto,
            }),
            invalidatesTags: ['Producto'],
        }),
        updateProducto: builder.mutation({
            query: ({ id, ...data }) => ({
                url: `/api/productos/${id}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['Producto'],
        }),
        deleteProducto: builder.mutation({
            query: (id: string) => ({
                url: `/api/productos/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Producto'],
        }),
    }),
});

export const {
    useGetProductosQuery,
    useGetProductoByIdQuery,
    useCreateProductoMutation,
    useUpdateProductoMutation,
    useDeleteProductoMutation,
} = productosApi;
