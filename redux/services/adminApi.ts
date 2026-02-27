import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { VendorWithMetrics } from '@/components/types/VendorWithMetrics';

export const adminApi = createApi({
  reducerPath: 'adminApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
    credentials: 'include',
  }),
  endpoints: (builder) => ({
    getVendorsWithMetrics: builder.query<VendorWithMetrics[], void>({
      query: () => ({
        url: 'api/vendors-with-metrics',
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetVendorsWithMetricsQuery } = adminApi;
