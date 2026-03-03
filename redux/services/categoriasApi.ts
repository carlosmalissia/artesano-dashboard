import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const categoriasApi = createApi({
  reducerPath: 'categoriasApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
    credentials: 'include', // 👈 necesario si usás cookies
  }),
  tagTypes: ['Categorias'],
  endpoints: (builder) => ({
    getCategoriasPublic: builder.query<Categoria[], { search?: string } | void>({
      query: (params) => {
        const queryParams = new URLSearchParams();

        if (params?.search) {
          queryParams.append('search', params.search);
        }

        return `/api/categorias/public${queryParams.toString() ? `?${queryParams}` : ''}`;
      },
    }),

    getCategoriasAdmin: builder.query<Categoria[], { search?: string } | void>({
      query: (params) => {
        const queryParams = new URLSearchParams();

        if (params?.search) {
          queryParams.append('search', params.search);
        }

        return `/api/categorias/admin${queryParams.toString() ? `?${queryParams}` : ''}`;
      },
      providesTags: ['Categorias'],
    }),

    getImpactoCategoria: builder.query<
      { productosActivos: number; vendedoresAfectados: number },
      string
    >({
      query: (id) => `/api/categorias/${id}/impact`,
    }),

    toggleCategoria: builder.mutation<Categoria, string>({
      query: (id) => ({
        url: `/api/categorias/${id}/toggle`,
        method: 'PATCH',
      }),
      invalidatesTags: ['Categorias'],
    }),
  }),
});

export const {
  useGetCategoriasPublicQuery,
  useGetCategoriasAdminQuery,
  useToggleCategoriaMutation,
  useLazyGetImpactoCategoriaQuery,
} = categoriasApi;

// Tipado completo
export interface Categoria {
  _id: string;
  nombre: string;
  slug: string;
  activa: boolean;
  parent?: string | null;
  orden?: number;
  fechaCreacion?: string;
  fechaActualizacion?: string;
}
