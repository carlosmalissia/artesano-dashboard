'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { Categoria } from '@/types/categoria';
import { StatusBadge } from '@/components/ui/StatusBadge';

export const getColumns = (
  handleToggle: (id: string, activa: boolean) => void
): ColumnDef<Categoria>[] => [
  {
    accessorKey: 'nombre',
    header: 'Nombre',
  },
  {
    accessorKey: 'slug',
    header: 'Slug',
  },
  {
    accessorKey: 'activa',
    header: 'Estado',
    cell: ({ row }) => <StatusBadge active={row.original.activa} />,
  },
  {
    id: 'actions',
    header: 'Control de estado',
    cell: ({ row }) => {
      const { _id, activa } = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm">
              ⋮
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => handleToggle(_id, activa)}>
              {activa ? 'Desactivar' : 'Activar'}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
