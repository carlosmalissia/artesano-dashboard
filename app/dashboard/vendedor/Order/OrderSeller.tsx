'use client';
import { HeaderOrder } from '@/components/features/ordenes/HeaderOrder';
import { ListOrders } from '@/components/features/ordenes/ListOrders';
import { useGetOrdenesQuery } from '@/redux/services/orderApi';
import { Order } from '@/types/order';

type Props = {
  userId: string;
};

export function OrderSeller({ userId }: Props) {
  const { data, isLoading, refetch } = useGetOrdenesQuery(null);
  const ordenes = Array.isArray(data) ? data : (data?.ordenes ?? []);

  const ordenesVendedor = ordenes.filter((ordenes: Order) => ordenes.vendedor?._id === userId);

  return (
    <>
      <HeaderOrder userId={userId} refetchOrder={refetch} ordenes={ordenesVendedor} />
      <ListOrders ordenes={ordenesVendedor} isLoading={isLoading} refetchOrder={refetch} />
    </>
  );
}
