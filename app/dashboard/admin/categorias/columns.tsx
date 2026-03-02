'use client';

import { ArrowUpDown, MoreHorizontal, Pencil } from 'lucide-react';
import { formatDate } from '@/util';
import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Link from 'next/link';
import Image from 'next/image';

import { Categoria } from '@/types/categoria';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { useToggleCategoriaMutation } from '@/redux/services/categoriasApi';
import { toast } from 'sonner';

export const columns: ColumnDef<Categoria>[] = [
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
      const [toggleCategoria] = useToggleCategoriaMutation();
      const handleToggle = async (id: string) => {
        try {
          await toggleCategoria(id).unwrap();
          toast.success('Estado actualizado');
        } catch {
          toast.error('Error al actualizar');
        }
      };

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm">
              ⋮
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => toggleCategoria(_id)}>
              {activa ? 'Desactivar' : 'Activar'}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
