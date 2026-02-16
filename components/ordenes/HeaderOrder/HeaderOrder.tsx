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
import { FormCreateOrder } from "../FormCreateOrder/FormCreateOrder";

type Props = {
    userId: string;
    refetchOrder: () => void; // ✅ Tipo añadido
};

export function HeaderOrder({ userId, refetchOrder }: Props) {
    const [openModalCreate, setOpenModalCreate] = useState(false);

    const handleSuccess = () => {
        setOpenModalCreate(false);
        refetchOrder(); // ✅ ejecuta la recarga de la tabla
    };

    return (
        <div className="flex justify-between items-center">
            <h2 className="text-2xl">Listado de Facturas</h2>

            <Dialog open={openModalCreate} onOpenChange={setOpenModalCreate}>
                <DialogTrigger asChild>
                    <Button>
                        <CirclePlus className="w-4 h-4 mr-2" />
                        Nueva Factura
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[625px]">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.25 }}
                    >
                        <DialogHeader>
                            <DialogTitle>Nuevo Factura</DialogTitle>
                            <DialogDescription>
                                Crear y configurar nueva factura
                            </DialogDescription>
                        </DialogHeader>

                        <FormCreateOrder
                            userId={userId}
                            onSuccess={handleSuccess}
                            refetchOrder={refetchOrder}
                        />
                    </motion.div>
                </DialogContent>
            </Dialog>
        </div>
    );
}

