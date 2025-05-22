'use client';

import { Loader2 } from "lucide-react";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
    Form, FormControl, FormField, FormItem, FormLabel, FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectContent, SelectValue, SelectItem } from "@/components/ui/select";
import { useCreateProductoMutation } from "@/redux/services/productosApi";
import { useUploadImageMutation } from "@/redux/services/imagenesApi";
import { useGetCategoriasQuery } from "@/redux/services/categoriasApi";
import { FormCreateProductProps } from "./FormCreateProduct.types";

const formSchema = z.object({
    nombre: z.string().min(1, 'Nombre requerido'),
    descripcion: z.string().min(1, 'Descripción requerida'),
    categoriaId: z.string().min(1, 'Categoría requerida'), // 👈 CAMBIO AQUÍ
    precio: z.string().min(1, 'Precio requerido'),
    stock: z.string().min(1, 'Stock requerido'),
    image: z.string().min(1, 'Imagen requerida'),
});
type FormValues = z.infer<typeof formSchema>;

export function FormCreateProduct(props: FormCreateProductProps) {
    const [imageUrl, setImageUrl] = useState('');
    const [uploadImage, { isLoading: uploading }] = useUploadImageMutation();
    const [createProducto, { isLoading: creando }] = useCreateProductoMutation();
    const { data: categorias, isLoading } = useGetCategoriasQuery();

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            nombre: '',
            categoriaId: '', // 👈 AHORA SE LLAMA ASÍ
            descripcion: '',
            precio: '',
            stock: '',
            image: '',
        },
    });

    const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('image', file);

        try {
            const res = await uploadImage(formData).unwrap();
            setImageUrl(res.imageUrl);
            form.setValue('image', res.imageUrl);
        } catch (error) {
            console.error("Error al subir imagen", error);
        }
    };

    const onSubmit = async (values: any) => {
        try {
            const productoPayload = {
                ...values,
                precio: parseFloat(values.precio),
                stock: parseInt(values.stock),
                vendedorId: props.userId,
            };

            await createProducto(productoPayload).unwrap();
            toast.success('✅ Producto creado correctamente', {
                description: values.nombre,
            });
            form.reset();
            setImageUrl('');
            props.onSuccess?.(); // cerrar modal o refrescar tabla
            props.refetchProductos?.();    // Refresca la tabla
        } catch (error) {
            console.error("Error al crear producto", error);
            toast.error('❌ Error al crear el producto', {
                description: 'Verificá los datos e intentá de nuevo',
            });
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="grid grid-cols-2 gap-3">
                    <FormField
                        name="nombre"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Nombre del Producto</FormLabel>
                                <FormControl>
                                    <Input placeholder="Nombre del producto..." {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />


                    <FormField
                        control={form.control}
                        name="categoriaId"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Categoría</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Selecciona una categoría" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {isLoading ? (
                                            <div className="p-4 text-sm text-muted-foreground">
                                                Cargando categorías...
                                            </div>
                                        ) : (
                                            categorias?.map((cat) => (
                                                <SelectItem key={cat._id} value={cat._id}>
                                                    {cat.nombre}
                                                </SelectItem>
                                            ))
                                        )}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        name="descripcion"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Descripción</FormLabel>
                                <FormControl>
                                    <Input placeholder="Descripción del producto..." {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        name="precio"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Precio</FormLabel>
                                <FormControl>
                                    <Input type="number" placeholder="Precio..." {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        name="stock"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Stock</FormLabel>
                                <FormControl>
                                    <Input type="number" placeholder="0" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        name="image"
                        control={form.control}
                        render={() => (
                            <FormItem>
                                <FormLabel>Imagen del Producto</FormLabel>
                                <FormControl>
                                    <Input type="file" onChange={handleImageChange} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <Button type="submit" disabled={uploading || creando}>
                    {(uploading || creando) ? (
                        <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            {uploading ? "Subiendo imagen..." : "Creando producto..."}
                        </>
                    ) : (
                        "Crear Producto"
                    )}
                </Button>
            </form>
        </Form>
    );
}
