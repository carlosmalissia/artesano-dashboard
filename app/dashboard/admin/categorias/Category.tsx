'use client';

import { useState } from 'react';
import { useDebounce } from '@/hooks/useDebounce';
import { SearchInput } from '@/components/shared/SearchInput';
import { useCategorias } from '@/hooks/useCategorias';
import { HeaderList } from '@/components/shared/HeaderList';
import { ListTable } from '@/components/shared/ListTable';
import { columns } from './columns';

type Props = {
  userId: string;
  isAdmin: boolean;
};

export function CategoryPage({ userId, isAdmin }: Props) {
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 500);

  const { categorias, isLoading } = useCategorias(debouncedSearch);

  return (
    <>
      <HeaderList title="Listado de Categorías" actionLabel="Nueva Categoría" />

      <div className="mb-4">
        <SearchInput value={search} onChange={setSearch} placeholder="Buscar categoría..." />
      </div>

      <ListTable data={categorias} isLoading={isLoading} columns={columns} />
    </>
  );
}
