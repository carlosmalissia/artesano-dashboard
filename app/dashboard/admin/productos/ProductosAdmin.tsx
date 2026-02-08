"use client";

import { HeaderProduct } from "@/components/productos/HeaderProduct";
import { ListProducts } from "@/components/productos/ListProducts";
import { useGetProductosQuery } from "@/redux/services/productosApi";
import { useGetUsuariosQuery } from "@/redux/services/usuarioApi";
import { Product } from "@/components/types/product";
import { useState } from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { User } from "@/components/types/user";
import { useEffect } from "react";


type Props = {
 
  userId: string;
  isAdmin: boolean;
};

export function ProductosAdmin({ userId, isAdmin }: Props) {
  const { data, isLoading, refetch } = useGetProductosQuery(null);
  const { data: usuarios } = useGetUsuariosQuery(null);

  useEffect(() => {
  if (usuarios) {
    console.log("Usuarios recibidos:", usuarios);
  }
}, [usuarios]);
  
  
  const vendedores = usuarios?.filter(
  (u: User) => u.rol === "vendedor"
) ?? [];

  
  console.log("vendedores", vendedores);
  
  const [vendedorSeleccionado, setVendedorSeleccionado] =
    useState<string>("all");

  const productos = Array.isArray(data)
    ? data
    : data?.productos ?? [];

  const productosFiltrados =
    isAdmin && vendedorSeleccionado !== "all"
      ? productos.filter(
          (p:Product) => p.vendedorId?._id === vendedorSeleccionado
        )
      : productos;
  

  

  return (
    <div>
      <HeaderProduct userId={userId} refetchProductos={refetch} />

      {isAdmin && (
        <div className="mb-4 max-w-xs">
          <Select
            value={vendedorSeleccionado}
            onValueChange={setVendedorSeleccionado}
          >
            <SelectTrigger>
              <SelectValue placeholder="Filtrar por vendedor" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="all">Todos los vendedores</SelectItem>
              {vendedores?.map((v:User) => (
                <SelectItem key={v._id} value={v._id}>
                  {v.nombre}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      <ListProducts
        productos={productosFiltrados}
        isLoading={isLoading}
        refetchProductos={refetch}
        isAdmin={isAdmin}
      />
    </div>
  );
}