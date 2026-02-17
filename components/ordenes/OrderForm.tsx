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
        productoId: z.string().min(1),
        cantidad: z.number().min(1)
  })).min(1, "Debe añadir al menos un producto"),
    precioTotal: z.number().min(1),
    compradorId: z.string().min(1),
    estado: z.enum(["pendiente", "pagada"])
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
            productos:[{productoId:"", cantidad:0}],
            precioTotal:0,
            compradorId: "",
            estado: "pendiente"
        },
    })

    const [uploading, setUploading] = useState(false)
    const [imageUrl, setImageUrl] = useState("")

    const { data: categorias = [] } = useGetCategoriasQuery()

    useEffect(() => {
        if (initialValues) {
            form.reset(initialValues)
            
        }
    }, [initialValues])

    const estadoActual = form.watch("estado")
    const isPagada = estadoActual === "pagada"
    
    const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        const formData = new FormData()
        /* formData.append("image", file)

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
        } */
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
                            <FormControl><Input {...field} disabled={isPagada} /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />


                <FormField
                    control={form.control}
                    name="precioTotal"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Precio Total (en $A)</FormLabel>
                            <FormControl><Input {...field} disabled={isPagada} /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />

                <FormField
                    control={form.control}
                    name="compradorId"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Comprador</FormLabel>
                            <FormControl><Input {...field} disabled={isPagada} /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                <div className="mt-6">
                    <h3 className="text-lg font-semibold mb-2">Productos</h3>

  <div className="space-y-2">
    {form.watch("productos")?.map((item, index) => (
      <div
        key={index}
        className="flex justify-between bg-slate-800 p-3 rounded-md"
      >
        <div>
          <p className="font-medium">Producto ID: {item.productoId}</p>
          <p className="text-sm text-gray-400">
            Cantidad: {item.cantidad}
          </p>
        </div>
      </div>
    ))}
  </div>
</div>
                
                <Button
  type="submit"
  disabled={uploading || loading || isPagada}
>
  {isPagada
    ? "Factura Pagada"
    : modo === "edit"
      ? uploading
        ? "Actualizando imagen..."
        : "Actualizar"
      : uploading
        ? "Subiendo imagen..."
        : "Crear Factura"}
</Button>
            </form>
        </Form>
    )
}
