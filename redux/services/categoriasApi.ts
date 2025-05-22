// src/redux/services/categoriasApi.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const categoriasApi = createApi({
    reducerPath: 'categoriasApi',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
        credentials: 'include', // 👈 necesario si usás cookies
    }),
    endpoints: (builder) => ({
        getCategorias: builder.query<Categoria[], void>({
            query: () => '/api/categorias',
        }),
    }),
});

export const { useGetCategoriasQuery } = categoriasApi;

// Tipado básico
export interface Categoria {
    _id: string;
    nombre: string;
}
