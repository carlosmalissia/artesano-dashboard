'use client';

import { HeaderProduct } from '@/components/features/productos/HeaderProduct';
import { ListProducts } from '@/components/features/productos/ListProducts';
import { useGetProductosQuery } from '@/redux/services/productosApi';
import { Product } from '@/types/product';

type Props = {
  userId: string;
};

export function ProductosClient({ userId }: Props) {
  const { data, isLoading, refetch } = useGetProductosQuery(null);

  const productos = Array.isArray(data) ? data : (data?.productos ?? []);

  const productosVendedor = productos.filter(
    (producto: Product) => producto.vendedorId?._id === userId
  );

  return (
    <div>
      <HeaderProduct userId={userId} refetchProductos={refetch} />

      <ListProducts
        productos={productosVendedor}
        isLoading={isLoading}
        refetchProductos={refetch}
      />
    </div>
  );
}
