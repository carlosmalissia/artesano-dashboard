'use client';

import { HeaderSellers } from '@/components/features/vendedores/HeaderSellers';
import { ListUsers } from '@/components/features/vendedores/ListUsers';
import { useGetClientesQuery } from '@/redux/services/usuarioApi';
import { User } from '@/types/user';

type Props = {
  userId: string;
  isAdmin: boolean;
};

export function CustomersAdmin({ userId, isAdmin }: Props) {
  const { data: clientes, isLoading, refetch } = useGetClientesQuery();

  const usuarios = Array.isArray(clientes) ? clientes : (clientes ?? []);

  return (
    <>
      {/* <HeaderSellers userId={userId} refetchVendedores={refetch}  /> */}
      {/*  <ListUsers
                usuarios = {usuarios}
                isLoading={isLoading}
                refetchUsuarios={refetch}
                isAdmin={isAdmin}
              /> */}
    </>
  );
}
