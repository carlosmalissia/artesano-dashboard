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
    getUsuarioById: builder.query({
            query: (id: string) => `/api/usuarios/${id}`,
            providesTags: ['Usuario'],
        }),
        createUsuario: builder.mutation({
            query: (nuevoUsuario) => ({
                url: '/api/usuarios',
                method: 'POST',
                body: nuevoUsuario,
            }),
            invalidatesTags: ['Usuario'],
        }),
        updateUsuario: builder.mutation({
            query: ({ id, ...data }) => ({
                url: `/api/usuarios/${id}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['Usuario'],
        }),
        deleteUsuario: builder.mutation({
            query: (id: string) => ({
                url: `/api/usuarios/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Usuario'],
        }),
  }),
});

export const { 
  useLoginMutation,
   useGetUsuariosQuery, 
   useCreateUsuarioMutation,
   useGetUsuarioByIdQuery,
   useDeleteUsuarioMutation,
   useUpdateUsuarioMutation
  } = usuarioApi;
