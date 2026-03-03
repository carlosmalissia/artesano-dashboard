'use client';

import { useState } from 'react';
import { useDebounce } from '@/hooks/useDebounce';
import { SearchInput } from '@/components/shared/SearchInput';
import { useCategorias } from '@/hooks/useCategorias';
import { HeaderList } from '@/components/shared/HeaderList';
import { ListTable } from '@/components/shared/ListTable';
import { getColumns } from './columns';

import {
  useToggleCategoriaMutation,
  useLazyGetImpactoCategoriaQuery,
} from '@/redux/services/categoriasApi';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';

import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

type Props = {
  userId: string;
  isAdmin: boolean;
};

export function CategoryPage({ userId, isAdmin }: Props) {
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 500);

  const { categorias, isLoading } = useCategorias(debouncedSearch);

  const [openConfirm, setOpenConfirm] = useState(false);

  const [categoriaPendiente, setCategoriaPendiente] = useState<{
    id: string;
    impacto: {
      productosActivos: number;
      vendedoresAfectados: number;
    };
  } | null>(null);

  const [toggleCategoria] = useToggleCategoriaMutation();
  const [getImpacto] = useLazyGetImpactoCategoriaQuery();

  const handleToggle = async (id: string, activa: boolean) => {
    try {
      if (activa) {
        const impacto = await getImpacto(id).unwrap();

        if (impacto.productosActivos > 0) {
          setCategoriaPendiente({ id, impacto });
          setOpenConfirm(true);
          return;
        }
      }

      await toggleCategoria(id).unwrap();
      toast.success('Estado actualizado');
    } catch {
      toast.error('Error al actualizar');
    }
  };

  const confirmarDesactivacion = async () => {
    if (!categoriaPendiente) return;

    try {
      await toggleCategoria(categoriaPendiente.id).unwrap();
      toast.success('Categoría desactivada');
    } catch {
      toast.error('Error al desactivar');
    } finally {
      setOpenConfirm(false);
      setCategoriaPendiente(null);
    }
  };

  const columns = getColumns(handleToggle);

  return (
    <>
      <HeaderList title="Listado de Categorías" actionLabel="Nueva Categoría" />

      <div className="mb-4">
        <SearchInput value={search} onChange={setSearch} placeholder="Buscar categoría..." />
      </div>

      <ListTable data={categorias} isLoading={isLoading} columns={columns} />

      {/* Dialog Confirmación */}
      <Dialog open={openConfirm} onOpenChange={setOpenConfirm}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar desactivación</DialogTitle>
            <DialogDescription>
              Esta categoría tiene <strong>{categoriaPendiente?.impacto.productosActivos}</strong>{' '}
              productos activos pertenecientes a{' '}
              <strong>{categoriaPendiente?.impacto.vendedoresAfectados}</strong> vendedores.
              <br />
              Si la desactivás, dejarán de mostrarse en la tienda pública.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenConfirm(false)}>
              Cancelar
            </Button>

            <Button variant="destructive" onClick={confirmarDesactivacion}>
              Desactivar igual
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
