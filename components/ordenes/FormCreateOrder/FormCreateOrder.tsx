"use client"

import { useCreateOrdenMutation } from "@/redux/services/orderApi"
import { OrderForm, FormData } from "@/components/ordenes/OrderForm"
import { toast } from "sonner"

type Props = {
    userId: string
    onSuccess?: () => void
    refetchOrder?: () => void
}

export function FormCreateOrder({ userId, onSuccess, refetchOrder }: Props) {
    const [createOrder, { isLoading }] = useCreateOrdenMutation()

    const handleSubmit = async (values: FormData, imageUrl: string) => {
        try {
            await createOrder({
                ...values,
                precioTotal: parseFloat(values.precioTotal),
                numeroFactura: parseInt(values.numeroFactura),
                vendedorId: userId,
                image: imageUrl,
                compradorId: values.compradorId,
            }).unwrap()

            toast.success("✅ Orden creada correctamente", {
                description: values.numeroFactura,
            })

            onSuccess?.()
            refetchOrder?.()
        } catch (error) {
            console.error("Error al crear orden", error)
            toast.error("❌ Error al crear el orden", {
                description: "Verificá los datos e intentá de nuevo",
            })
        }
    }

    return (
        <OrderForm
            modo="create"
            onSubmit={handleSubmit}
            loading={isLoading}
        />
    )
}