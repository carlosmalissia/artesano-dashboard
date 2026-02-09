"use client"

import { useParams, useRouter } from "next/navigation"
import { useGetUsuarioByIdQuery, useUpdateUsuarioMutation } from "@/redux/services/usuarioApi"
import { toast } from "sonner"
import { UserForm, FormData } from "@/components/vendedores/UserForm"

console.log("estoy en el pag correcto");


export default function EditProductPage() {
    const { id } = useParams()
    const router = useRouter()
    const { data, isLoading } = useGetUsuarioByIdQuery(id as string)
    const [updateUsuario] = useUpdateUsuarioMutation()
    
    console.log("id", id);
    
    console.log("data: ", data);
    
    const handleSubmit = async (values: FormData, imageUrl: string) => {
        try {
            await updateUsuario({
                id,
                ...values,
                avatar: imageUrl,
            }).unwrap()

            toast.success("Usuario actualizado")
            router.push("/dashboard/admin/vendedores")
        } catch (err) {
            console.error(err)
            toast.error("Error al actualizar usuario")
        }
    }

    if (isLoading) return <p className="p-6">Cargando...</p>

    const initialValues: FormData = {
        nombre: data?.nombre ?? "",
        email: data?.email ?? "",
        avatar: data?.avatar ?? "",
    }

    return (
        <div className="max-w-2xl mx-auto mt-10 p-4 border rounded-md">
            <h2 className="text-xl font-bold mb-6">Editar Usuario</h2>

            {data?.avatar && (
                <div className="mb-4">
                    <p className="text-sm text-muted-foreground mb-1">Imagen actual:</p>
                    <img src={data.avatar} alt="Usuario" className="w-32 h-auto rounded-md" />
                </div>
            )}

            <UserForm
                modo="edit"
                initialValues={initialValues}
                defaultImage={data.avatar}
                onSubmit={handleSubmit}
            />
        </div>
    )
}