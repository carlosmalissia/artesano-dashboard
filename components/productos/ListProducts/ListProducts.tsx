"use client"

import { columns, Product } from "./columns"
import { DataTable } from "./data-table"
import {
  useGetProductosQuery,
  useGetProductoByIdQuery,
  useCreateProductoMutation,
  useUpdateProductoMutation,
  useDeleteProductoMutation
} from "@/redux/services/productosApi";
type Props = {
  userId: string;
};

export function ListProducts({ userId }: Props) {
  const { data, isLoading, error } = useGetProductosQuery(null);

  // Debug momentáneo
  console.log("data recibida:", data);

  const productos = Array.isArray(data) ? data : data?.productos ?? []; // ajuste por si viene como { productos: [...] }

  const productosVendedor = productos.filter(
    (producto: Product) => producto.vendedorId === userId
  );

  return <DataTable columns={columns} data={productosVendedor} />;
}