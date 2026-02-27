"use client";

import { HeaderSellers } from "@/components/vendedores/HeaderSellers";
import { ListUsers } from "@/components/vendedores/ListUsers";
import { useGetClientesQuery } from "@/redux/services/usuarioApi";
import { useGetOrdenesQuery } from "@/redux/services/orderApi";
import { Order } from "@/components/types/order";
import { BasicUser } from "@/components/types/basicUser";
import { getCustomerColumns } from "@/components/vendedores/ListUsers/columns";
import { User } from "@/components/types/user";


type Props = {
 
  userId: string;
  isAdmin: boolean;
  customer: boolean;
  
};

export function Customers({ userId, isAdmin, customer}: Props) {
    
    
    const { data: clientes, isLoading } = useGetClientesQuery();
        
        console.log("CLIENTES FRONT:", clientes);           
    
    return (
        <>
        {/* <HeaderSellers userId={userId}  customer={customer} /> */}
        <ListUsers<User>
            data={clientes ?? []}
            columns={getCustomerColumns({})}
            isLoading={isLoading}
        />
        </>
    )
}