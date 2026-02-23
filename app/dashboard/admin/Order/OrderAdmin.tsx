'use client'
import { HeaderOrder } from "@/components/ordenes/HeaderOrder";
import { ListOrders } from "@/components/ordenes/ListOrders";
import { useGetOrdenesQuery } from "@/redux/services/orderApi";
import { Order } from "@/components/types/order";

type Props = {
  userId: string;
  isAdmin: boolean;
};

export function OrderAdmin({userId, isAdmin}:Props) {
    const { data, isLoading, refetch } = useGetOrdenesQuery(null);
    const ordenes = Array.isArray(data)
        ? data
        : data?.ordenes ?? [];
    
      /* const ordenesVendedor = ordenes.filter(
        (ordenes: Order) => ordenes.vendedor?._id === userId
      ); */

    return (
        <>
        
            <HeaderOrder
                    userId={userId}
                    refetchOrder={refetch}
                    ordenes= {ordenes}
                  />
            <ListOrders
                    ordenes={ordenes}
                    isLoading={isLoading}
                    refetchOrder={refetch}
                    isAdmin={isAdmin}
                    
                  />
        </>
    )
}