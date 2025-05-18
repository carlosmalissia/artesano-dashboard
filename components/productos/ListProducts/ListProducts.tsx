
import { columns, Product } from "./columns"
import { DataTable } from "./data-table"
import {
  useGetProductosQuery,
  useGetProductoByIdQuery,
  useCreateProductoMutation,
  useUpdateProductoMutation,
  useDeleteProductoMutation
} from "@/redux/services/productosApi";
import { useUser } from "@/hooks/useUser";

export function ListProducts() {
  const { user } = useUser();
  const { data, error, isLoading, isFetching } = useGetProductosQuery(null);

  const productosVendedor = data?.filter(
    (producto: Product) => producto.vendedorId === user?.id
  ) || [];

  return (
    <DataTable columns={columns} data={productosVendedor} />
  );
}