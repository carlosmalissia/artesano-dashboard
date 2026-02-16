'use client'
import { HeaderOrder } from "@/components/ordenes/HeaderOrder";
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
        (ordenes: Order) => ordenes.vendedorId?._id === userId
      );
console.log("UserId: ", userId);

    return (
        <>
        
            <HeaderOrder
                    userId={userId}
                    refetchOrder={refetch}
                  />
        
        </>
    )
}