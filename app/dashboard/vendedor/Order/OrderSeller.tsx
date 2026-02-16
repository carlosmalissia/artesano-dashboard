'use client'
import { HeaderOrder } from "@/components/ordenes/HeaderOrder";
import { ListOrders } from "@/components/ordenes/ListOrders";
import { useGetOrdenesQuery } from "@/redux/services/orderApi";
import { Order } from "@/components/types/order";

type Props = {
  userId: string;
};

export function OrderSeller({userId}:Props) {
    const { data, isLoading, refetch } = useGetOrdenesQuery(null);
    const ordenes = Array.isArray(data)
        ? data
        : data?.ordenes ?? [];
    
      const ordenesVendedor = ordenes.filter(
        (ordenes: Order) => ordenes.vendedor?._id === userId
      );
console.log("UserId: ", userId);
console.log("ORDEN VENDEDOR", ordenes);
    return (
        <>
        
            <HeaderOrder
                    userId={userId}
                    refetchOrder={refetch}
                    ordenes= {ordenesVendedor}
                  />
            <ListOrders
                    ordenes={ordenesVendedor}
                    isLoading={isLoading}
                    refetchOrder={refetch}
                  />
        </>
    )
}