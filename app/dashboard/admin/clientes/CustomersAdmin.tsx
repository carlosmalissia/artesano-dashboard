"use client";

import { HeaderSellers } from "@/components/vendedores/HeaderSellers";
import { ListUsers } from "@/components/vendedores/ListUsers";
import { useGetClientesQuery } from "@/redux/services/usuarioApi";
import { User } from "@/components/types/user";

type Props = {
 
  userId: string;
  isAdmin: boolean;
  customer: boolean
};

export function CustomersAdmin({ userId, isAdmin, customer }: Props) {
    
    const { data: clientes, isLoading, refetch } = useGetClientesQuery();

    const usuarios = Array.isArray(clientes)
    ? clientes
    : clientes ?? [];

    
    return (
        <>
        <HeaderSellers userId={userId} refetchVendedores={refetch} customer={customer} />
        <ListUsers
                usuarios = {usuarios}
                isLoading={isLoading}
                refetchUsuarios={refetch}
                isAdmin={isAdmin}
              />
        </>
    )
}