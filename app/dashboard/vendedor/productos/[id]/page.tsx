"use client"

import { useParams, useRouter } from "next/navigation"
import { useGetProductoByIdQuery, useUpdateProductoMutation } from "@/redux/services/productosApi"
import { toast } from "sonner"
import { ProductForm, FormData } from "@/components/productos/ProductForm"


export default function EditProductPage() {
    const { id } = useParams()
    const router = useRouter()
    const { data, isLoading } = useGetProductoByIdQuery(id as string)
    const [updateProducto] = useUpdateProductoMutation()
    
    
    const handleSubmit = async (values: FormData, imageUrl: string) => {
        try {
            await updateProducto({
                id,
                ...values,
                precio: parseFloat(values.precio),
                stock: parseInt(values.stock),
                image: imageUrl,
            }).unwrap()

            toast.success("Producto actualizado")
            router.push("/dashboard/vendedor/productos")
        } catch (err) {
            console.error(err)
            toast.error("Error al actualizar producto")
        }
    }

    if (isLoading) return <p className="p-6">Cargando...</p>

    const initialValues: FormData = {
        nombre: data?.nombre ?? "",
        descripcion: data?.descripcion ?? "",
        precio: data?.precio?.toString() ?? "",
        stock: data?.stock?.toString() ?? "",
        image: data?.image ?? "",
        categoriaId: data?.categoriaId?._id ?? "", // ⚠️ asegurate que sea string
    }

    return (
        <div className="max-w-2xl mx-auto mt-10 p-4 border rounded-md">
            <h2 className="text-xl font-bold mb-6">Editar Producto</h2>

            {data?.image && (
                <div className="mb-4">
                    <p className="text-sm text-muted-foreground mb-1">Imagen actual:</p>
                    <img src={data.image} alt="Producto" className="w-32 h-auto rounded-md" />
                </div>
            )}

            <ProductForm
                modo="edit"
                initialValues={initialValues}
                defaultImage={data.image}
                onSubmit={handleSubmit}
            />
        </div>
    )
}
