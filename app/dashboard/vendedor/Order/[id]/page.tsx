"use client"

import { useParams, useRouter } from "next/navigation"
import { useGetOrdenByIdQuery, useUpdateOrdenMutation } from "@/redux/services/orderApi"
import { toast } from "sonner"
import { OrderForm, FormData } from "@/components/ordenes/OrderForm"
import { Product } from "@/components/types/product";
 
type OrderItem = {
  producto: Product
  cantidad: number
}



export default function EditOrderPage() {
    const { id } = useParams()
    const router = useRouter()
    const { data, isLoading } = useGetOrdenByIdQuery(id as string)
    const [updateOrder] = useUpdateOrdenMutation()
    
    
    const handleSubmit = async (values: FormData) => {
        try {
            await updateOrder({
                id,
                ...values,
                precioTotal: values.precioTotal,
                numeroFactura: values.numeroFactura,
                compradorId: values.compradorId,
            }).unwrap()

            toast.success("Factura actualizado")
            router.push("/dashboard/vendedor/Order")
        } catch (err) {
            console.error(err)
            toast.error("Error al actualizar factura")
        }
    }
console.log("ID:", id)
console.log("DATA:", data)
console.log("isLoading:", isLoading)
    if (isLoading || !data) return <p className="p-6">Cargando...</p>

    const initialValues: FormData = {
  numeroFactura: data?.numeroFactura ?? "",
  compradorId: data?.comprador?.nombre ?? "",
  precioTotal: data?.precioTotal ?? 0,
  estado:data?.estado ?? "pendiente",
  productos:
    data?.productos?.map((item: OrderItem) => ({
      productoId: item.producto?._id,
      cantidad: item.cantidad,
    })) ?? [],
}

    return (
        <div className="max-w-2xl mx-auto mt-10 p-4 border rounded-md">
            <h2 className="text-xl font-bold mb-6">Editar Factura</h2>

            <OrderForm
                modo="edit"
                initialValues={initialValues}
                onSubmit={handleSubmit}
            />
        </div>
    )
}
