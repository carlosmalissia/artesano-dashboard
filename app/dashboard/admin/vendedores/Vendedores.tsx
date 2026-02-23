"use client";

import { HeaderSellers } from "@/components/vendedores/HeaderSellers";
import { ListUsers } from "@/components/vendedores/ListUsers";
import { useGetUsuariosQuery } from "@/redux/services/usuarioApi";
import { User } from "@/components/types/user";

type Props = {
 
  userId: string;
  isAdmin: boolean;
  customer: boolean
};

export function Vendedores({ userId, isAdmin, customer }: Props) {
    
    const { data, isLoading, refetch } = useGetUsuariosQuery(null);

    const usuarios = Array.isArray(data)
    ? data
    : data?.usuarios ?? [];

    const UsuariosFiltrados = usuarios.filter(
        (u:User) => (u.roles.includes("vendedor"))
    ) 
    
    return (
        <>
        <HeaderSellers userId={userId} refetchVendedores={refetch} customer={customer} />
        <ListUsers
                usuarios={UsuariosFiltrados}
                isLoading={isLoading}
                refetchUsuarios={refetch}
                isAdmin={isAdmin}
              />
        </>
    )
}