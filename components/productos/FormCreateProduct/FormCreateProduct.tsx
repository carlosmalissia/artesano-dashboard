'useclient'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { SetStateAction, useState } from 'react';
import axios from 'axios';
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Select, SelectTrigger, SelectContent, SelectValue, SelectItem } from "@/components/ui/select";
import { Input } from "@/components/ui/input"
import { FormCreateProductProps } from "./FormCreateProduct.types"



const formSchema = z.object({
    title: z.string().min(1, 'Título requerido'),
    description: z.string().min(1, 'Descripción requerida'),
    category: z.string().min(2),
    price: z.string().min(1, 'Precio requerido'),
    stock: z.string().min(1, 'Stock requerido'),
    image: z.string().min(1, 'Imagen requerida'),
});

export function FormCreateProduct(props: FormCreateProductProps) {
    interface Imagen {
        ruta: string;
        objeto: File;
    }

    const [imageUrl, setImageUrl] = useState('');
    const [imagen, setImagen] = useState<Imagen | null>(null);
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: '',
            category: "",
            description: '',
            price: '',
            stock: '',
            image: '',
        },
    });
    const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            const file = event.target.files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagen({
                    ruta: reader.result as string,
                    objeto: file
                });
            };
            reader.readAsDataURL(file);
        }

        //Si solamene quiero subir jpg
        //If(fileName.ends.Width('.jpg')...setear archivo sino ingresen el archivo corecto)



    }

    const controlSubidaImagen = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {

        event.preventDefault()
        const formData = new FormData();
        if (imagen !== null) {
            formData.append('file', imagen.objeto);
        }
        //Enviar el archivo al servidor
        await axios.post('/api/product', formData,
            {
                headers: { 'Content-Type': 'multipart/form-data', },
            })
            .then(async (response) => {
                console.log(response);
                if (response.status === 200) {
                    console.log('exito');

                } else {
                    console.log('error');

                }
            }

            )

    }

    const onSubmit = async (values: any) => {

        try {
            await axios.post('/api/products', { ...values, image: imageUrl });
            alert('Producto creado con éxito');
        } catch (error) {
            console.error('Error al crear el producto:', error);
        }
    };
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

                <div className="grid grid-cols-2 gap-3">
                    <FormField
                        name="title"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Nomre del Producto</FormLabel>
                                <FormControl>
                                    <Input placeholder="Nombre del proucto ..." type="text"  {...field} />

                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="category"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Categoría</FormLabel>
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            < SelectValue placeholder="Seleciona la categoría" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="Ropa de Hombre">Ropa de Hombre</SelectItem>
                                        <SelectItem value="Ropa de Mujer">Ropa de Mujer</SelectItem>
                                        <SelectItem value="Joyeria">Joyería</SelectItem>

                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        name="description"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Descripción</FormLabel>
                                <FormControl>
                                    <Input placeholder="Descripción del producto ..." type="text"  {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="price"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Precio</FormLabel>
                                <FormControl>
                                    <Input placeholder="precio ..." type="text" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}

                    />

                    <FormField
                        control={form.control}
                        name="stock"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Stock</FormLabel>
                                <FormControl>
                                    <Input placeholder="0" type="number"  {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        name="image"
                        control={form.control}
                        render={({ field }) => (
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
                <Button type="submit">Crear Producto</Button>
            </form>
        </Form>
    );
}