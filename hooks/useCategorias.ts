import { useGetCategoriasAdminQuery } from '@/redux/services/categoriasApi';

export function useCategorias(search?: string) {
  const {
    data = [],
    isLoading,
    refetch,
  } = useGetCategoriasAdminQuery(search ? { search } : undefined);

  return {
    categorias: data,
    isLoading,
    refetch,
  };
}
