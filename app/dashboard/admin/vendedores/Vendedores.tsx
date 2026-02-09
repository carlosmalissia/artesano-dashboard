"use client";

import { HeaderSellers } from "@/components/vendedores/HeaderSellers";
import { ListUsers } from "@/components/vendedores/ListUsers";
import { useGetUsuariosQuery } from "@/redux/services/usuarioApi";
import { User } from "@/components/types/user";

type Props = {
 
  userId: string;
  isAdmin: boolean;
};

export function Vendedores({ userId, isAdmin }: Props) {
    
    const { data, isLoading, refetch } = useGetUsuariosQuery(null);

    const usuarios = Array.isArray(data)
    ? data
    : data?.usuarios ?? [];

    const UsuariosFiltrados = usuarios.filter(
        (u:User) => (u.rol === "vendedor")
    ) 
    
    return (
        <>
        <HeaderSellers userId={userId} refetchVendedores={refetch} />
        <ListUsers
                usuarios={UsuariosFiltrados}
                isLoading={isLoading}
                refetchUsuarios={refetch}
                isAdmin={isAdmin}
              />
        </>
    )
}