"use client"

import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
} from "@/components/ui/form"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { toast } from "sonner"
import { useGetCategoriasQuery } from "@/redux/services/categoriasApi"

const formSchema = z.object({
    numeroFactura: z.string().min(1),
    productos: z.array(z.object({
    nombre: z.string().min(1, "Nombre requerido"),
    cantidad: z.number().min(1),
    precio: z.number().min(1)
  })).min(1, "Debe añadir al menos un producto"),
    precioTotal: z.string().min(1),
    compradorId: z.string().min(1),
    image: z.string().optional(),
    vendedorId: z.string().min(1, "Categoría requerida"),
})

export type FormData = z.infer<typeof formSchema>

type Props = {
    modo: "create" | "edit"
    initialValues?: FormData
    onSubmit: (values: FormData, imageUrl: string) => Promise<void>
    defaultImage?: string
    loading?: boolean
}

export function OrderForm({ modo, initialValues, onSubmit, defaultImage, loading }: Props) {
    const form = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: initialValues || {
            numeroFactura: "",
            productos:[{nombre:"", cantidad:0, precio:0}],
            precioTotal: "",
            compradorId: "",
            image: "",
            vendedorId: "",
        },
    })

    const [uploading, setUploading] = useState(false)
    const [imageUrl, setImageUrl] = useState("")

    const { data: categorias = [] } = useGetCategoriasQuery()

    useEffect(() => {
        if (initialValues) {
            form.reset(initialValues)
            setImageUrl(initialValues.image || "")
        }
    }, [initialValues])

    const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        const formData = new FormData()
        formData.append("image", file)

        try {
            setUploading(true)
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/images/upload`, {
                method: "POST",
                body: formData,
                credentials: "include",
            })
            const data = await res.json()
            setImageUrl(data.imageUrl)
            toast.success("Imagen subida con éxito")
        } catch (err) {
            console.error("Error al subir imagen", err)
            toast.error("Error al subir imagen")
        } finally {
            setUploading(false)
        }
    }

    const handleSubmit = (values: FormData) => {
        onSubmit(values, imageUrl || defaultImage || "")
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="numeroFactura"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nº Factura</FormLabel>
                            <FormControl><Input type="string" {...field} /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />

                

                <FormField
                    control={form.control}
                    name="precioTotal"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Precio</FormLabel>
                            <FormControl><Input type="number" {...field} /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />

                <FormField
                    control={form.control}
                    name="compradorId"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Comprador</FormLabel>
                            <FormControl><Input type="string" {...field} /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                <FormField
                    control={form.control}
                    name="vendedorId"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Vendedor</FormLabel>
                            <FormControl><Input type="string" {...field} /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                

                <FormField
                    control={form.control}
                    name="image"
                    render={() => (
                        <FormItem>
                            <FormLabel>Imagen</FormLabel>
                            <FormControl>
                                <Input type="file" onChange={handleImageChange} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />

                <Button type="submit" disabled={uploading || loading}>
                    {modo === "edit"
                        ? uploading
                            ? "Actualizando imagen..."
                            : "Actualizar"
                        : uploading
                            ? "Subiendo imagen..."
                            : "Crear Producto"}
                </Button>
            </form>
        </Form>
    )
}
