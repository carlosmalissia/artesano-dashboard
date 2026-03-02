'use client';

import { HeaderSellers } from '@/components/features/vendedores/HeaderSellers';
import { ListUsers } from '@/components/features/vendedores/ListUsers';
import { useGetClientesQuery } from '@/redux/services/usuarioApi';
import { useGetOrdenesQuery } from '@/redux/services/orderApi';
import { Order } from '@/types/order';
import { BasicUser } from '@/types/basicUser';
import { getCustomerColumns } from '@/components/features/vendedores/ListUsers/columns';
import { User } from '@/types/user';

type Props = {
  userId: string;
  isAdmin: boolean;
  customer: boolean;
};

export function Customers({ userId, isAdmin, customer }: Props) {
  const { data: clientes, isLoading } = useGetClientesQuery();

  console.log('CLIENTES FRONT:', clientes);

  return (
    <>
      {/* <HeaderSellers userId={userId}  customer={customer} /> */}
      {/*  <ListUsers<User>
            data={clientes ?? []}
            columns={getCustomerColumns({})}
            isLoading={isLoading}
        /> */}
    </>
  );
}
