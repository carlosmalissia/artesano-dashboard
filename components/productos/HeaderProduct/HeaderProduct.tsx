"use client"

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { CirclePlus } from "lucide-react"
import { SetStateAction, useState } from "react";
import { FormCreateProduct } from "../FormCreateProduct/FormCreateProduct"

type Props = {
    userId: string;
};

export function HeaderProduct({ userId }: Props) {
    const [openModalCreate, setOpenModalCreate] = useState(false)
    const handleSuccess = () => {
        setOpenModalCreate(false);
        // acá podrías llamar a refetch() si lo necesitás en el futuro
    };
    return (
        <div className="flex justify-between items-center">
            <h2 className="text-2xl">Listado de Productos</h2>

            <Dialog open={openModalCreate} onOpenChange={setOpenModalCreate}>
                <DialogTrigger asChild>
                    <Button> Nuevo Producto</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[625px]">
                    <DialogHeader>
                        <DialogTitle>Nuevo Producto</DialogTitle>

                        <DialogDescription>
                            Crear y configurar nuevo producto
                        </DialogDescription>
                    </DialogHeader>

                    <FormCreateProduct userId={userId}
                        onSuccess={handleSuccess} />


                </DialogContent>
            </Dialog>
        </div>
    )
}