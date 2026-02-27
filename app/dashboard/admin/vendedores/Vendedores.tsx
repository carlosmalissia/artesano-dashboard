'use client';

import { useGetVendorsWithMetricsQuery } from '@/redux/services/adminApi';
import { DataTable } from '@/components/vendedores/ListUsers/data-table';
import { getVendedoresColumns } from '@/components/vendedores/columnsVendedores';

export function Vendedores() {
  const { data, isLoading, isError } = useGetVendorsWithMetricsQuery();

  if (isLoading) return <p>Cargando...</p>;
  if (isError) return <p>Error cargando vendedores</p>;

  return (
    <div className="p-6">
      <DataTable columns={getVendedoresColumns()} data={data ?? []} />
    </div>
  );
}
