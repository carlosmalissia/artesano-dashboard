"use client"

import { useCreateProductoMutation } from "@/redux/services/productosApi"
import { ProductForm, FormData } from "@/components/productos/ProductForm"
import { toast } from "sonner"

type Props = {
    userId: string
    onSuccess?: () => void
    refetchProductos?: () => void
}

export function FormCreateProduct({ userId, onSuccess, refetchProductos }: Props) {
    const [createProducto, { isLoading }] = useCreateProductoMutation()

    const handleSubmit = async (values: FormData, imageUrl: string) => {
        try {
            await createProducto({
                ...values,
                precio: parseFloat(values.precio),
                stock: parseInt(values.stock),
                vendedorId: userId,
                image: imageUrl,
                categoriaId: values.categoriaId,
            }).unwrap()

            toast.success("✅ Producto creado correctamente", {
                description: values.nombre,
            })

            onSuccess?.()
            refetchProductos?.()
        } catch (error) {
            console.error("Error al crear producto", error)
            toast.error("❌ Error al crear el producto", {
                description: "Verificá los datos e intentá de nuevo",
            })
        }
    }

    return (
        <ProductForm
            modo="create"
            onSubmit={handleSubmit}
            loading={isLoading}
        />
    )
}

