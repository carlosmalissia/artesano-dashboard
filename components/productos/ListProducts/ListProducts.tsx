"use client"

import { ProductSkeleton } from "../ProductSkeleton";
import { motion } from "framer-motion";
import { HeaderProduct } from "@/components/productos/HeaderProduct"
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
  const { data, isLoading, error, refetch } = useGetProductosQuery(null);

  // Debug momentáneo
  console.log("data recibida:", data);

  const productos = Array.isArray(data) ? data : data?.productos ?? []; // ajuste por si viene como { productos: [...] }

  const productosVendedor = productos.filter(
    (producto: Product) => producto.vendedorId?._id === userId
  );

  return (
    <>
      <HeaderProduct userId={userId} refetchProductos={refetch} />

      {isLoading ? (
        <>
          <h2 className="text-lg text-muted-foreground mb-4">Cargando productos...</h2>
          <ProductSkeleton />
        </>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <DataTable columns={columns} data={productosVendedor} />
        </motion.div>
      )}
    </>
  );
}