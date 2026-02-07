"use client";

import { HeaderProduct } from "@/components/productos/HeaderProduct";
import { ListProducts } from "@/components/productos/ListProducts";
import { useGetProductosQuery } from "@/redux/services/productosApi";
import { Product } from "@/components/types/product";

type Props = {
  userId: string;
};

export function ProductosAdmin({ userId }: Props) {
  const { data, isLoading, refetch } = useGetProductosQuery(null);

  const productos = Array.isArray(data)  //admin puede ver todos los productos
    ? data
    : data?.productos ?? [];

  const productosVendedor = productos.filter(
    (producto: Product) => producto.vendedorId?._id === userId   // ya no haria falta filtrar aqui
  );

  return (
    <div>
      <HeaderProduct
        userId={userId}
        refetchProductos={refetch}
      />

      <ListProducts
        productos={productos}  //todos los productos
        isLoading={isLoading}
        refetchProductos={refetch}
      />
    </div>
  );
}