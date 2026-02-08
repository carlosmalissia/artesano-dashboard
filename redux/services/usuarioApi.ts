import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const usuarioApi = createApi({
  reducerPath: 'usuarioApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
    credentials: 'include', // 🔥 ESTA es la clave
  }),
  tagTypes: ['Usuario'],
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credenciales) => ({
        url: '/api/login',
        method: 'POST',
        body: credenciales,
      }),
    }),
    getUsuarios: builder.query({
      query: () => '/api/usuarios',
      providesTags: ['Usuario'],
    }),
  }),
});

export const { useLoginMutation, useGetUsuariosQuery } = usuarioApi;
