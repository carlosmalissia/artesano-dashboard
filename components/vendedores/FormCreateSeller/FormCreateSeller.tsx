"use client"

import { useCreateUsuarioMutation } from "@/redux/services/usuarioApi"
import { UserForm, FormData } from "@/components/vendedores/UserForm"
import { toast } from "sonner"

type Props = {
    userId: string
    onSuccess?: () => void
    refetchUsuario?: () => void
    customer: boolean
}

export function FormCreateSeller({ userId, onSuccess, refetchUsuario, customer }: Props) {
    const [createUsuario, { isLoading }] = useCreateUsuarioMutation()

    const handleSubmit = async (values: FormData, imageUrl: string) => {
        try {
            await createUsuario({
                ...values,
                vendedorId: userId,
                image: imageUrl,
                
            }).unwrap()

            customer ? toast.success("✅ Usuario creado correctamente", {
                description: values.nombre,
            }) : toast.success("✅ Vendedor creado correctamente", {
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
            customer= {customer}
        />
    )
}
