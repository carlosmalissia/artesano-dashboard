import { ColumnDef } from '@tanstack/react-table';
import { VendorWithMetrics } from '@/components/types/VendorWithMetrics';

const formatCurrency = (value: number) =>
  new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
  }).format(value);

export const getVendedoresColumns = (): ColumnDef<VendorWithMetrics>[] => [
  {
    accessorKey: 'nombre',
    header: 'Nombre',
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'totalProductos',
    header: 'Productos',
  },
  {
    accessorKey: 'totalOrdenes',
    header: 'Órdenes',
  },
  {
    accessorKey: 'totalVendido',
    header: 'Total Vendido',
    cell: ({ row }) => formatCurrency(row.original.totalVendido),
  },
  {
    accessorKey: 'comisionPlataforma',
    header: 'Comisión (10%)',
    cell: ({ row }) => formatCurrency(row.original.comisionPlataforma),
  },
  {
    accessorKey: 'gananciaVendedor',
    header: 'Ganancia Vendedor',
    cell: ({ row }) => formatCurrency(row.original.gananciaVendedor),
  },
];
