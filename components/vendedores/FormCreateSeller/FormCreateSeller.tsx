"use client"

import { useCreateUsuarioMutation } from "@/redux/services/usuarioApi"
import { UserForm, FormData } from "@/components/vendedores/UserForm"
import { toast } from "sonner"

type Props = {
    userId: string
    onSuccess?: () => void
    refetchUsuario?: () => void
}

export function FormCreateSeller({ userId, onSuccess, refetchUsuario }: Props) {
    const [createUsuario, { isLoading }] = useCreateUsuarioMutation()

    const handleSubmit = async (values: FormData, imageUrl: string) => {
        try {
            await createUsuario({
                ...values,
                vendedorId: userId,
                image: imageUrl,
                
            }).unwrap()

            toast.success("✅ Vendedor creado correctamente", {
                description: values.nombre,
            })

            onSuccess?.()
            refetchUsuario?.()
        } catch (error) {
            console.error("Error al crear usuario", error)
            toast.error("❌ Error al crear el usuario", {
                description: "Verificá los datos e intentá de nuevo",
            })
        }
    }

    return (
        <UserForm
            modo="create"
            onSubmit={handleSubmit}
            loading={isLoading}
        />
    )
}
