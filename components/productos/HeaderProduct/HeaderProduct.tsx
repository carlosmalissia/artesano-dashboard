"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { CirclePlus } from "lucide-react";
import { useState } from "react";
import { FormCreateProduct } from "../FormCreateProduct/FormCreateProduct";

type Props = {
    userId: string;
    refetchProductos: () => void; // ✅ Tipo añadido
};

export function HeaderProduct({ userId, refetchProductos }: Props) {
    const [openModalCreate, setOpenModalCreate] = useState(false);

    const handleSuccess = () => {
        setOpenModalCreate(false);
        refetchProductos(); // ✅ ejecuta la recarga de la tabla
    };

    return (
        <div className="flex justify-between items-center">
            <h2 className="text-2xl">Listado de Productos</h2>

            <Dialog open={openModalCreate} onOpenChange={setOpenModalCreate}>
                <DialogTrigger asChild>
                    <Button>
                        <CirclePlus className="w-4 h-4 mr-2" />
                        Nuevo Producto
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[625px]">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.25 }}
                    >
                        <DialogHeader>
                            <DialogTitle>Nuevo Producto</DialogTitle>
                            <DialogDescription>
                                Crear y configurar nuevo producto
                            </DialogDescription>
                        </DialogHeader>

                        <FormCreateProduct
                            userId={userId}
                            onSuccess={handleSuccess}
                            refetchProductos={refetchProductos}
                        />
                    </motion.div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
