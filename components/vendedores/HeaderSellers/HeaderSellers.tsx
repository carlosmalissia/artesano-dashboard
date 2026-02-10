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
import { FormCreateSeller } from "../FormCreateSeller/FormCreateSeller";

type Props = {
    userId: string;
    refetchVendedores: () => void; // ✅ Tipo añadido
    customer: boolean
};

export function HeaderSellers({ userId, refetchVendedores, customer }: Props) {
    const [openModalCreate, setOpenModalCreate] = useState(false);

    const handleSuccess = () => {
        setOpenModalCreate(false);
        refetchVendedores(); // ✅ ejecuta la recarga de la tabla
    };

    return (
        <div className="flex justify-between items-center">
            <h2 className="text-2xl">
                {customer ? ("Listado de Usuarios"):("Listado de Vendedores")}
            </h2>
            <Dialog open={openModalCreate} onOpenChange={setOpenModalCreate}>
                <DialogTrigger asChild>
                    <Button>
                        <CirclePlus className="w-4 h-4 mr-2" />
                            {customer ? ("Nuevo Usuario"): ("Nuevo vendedor")}
                            
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[625px]">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.25 }}
                    >
                        <DialogHeader>
                            <DialogTitle>Nuevo Vendedor</DialogTitle>
                            <DialogDescription>
                                Crear y configurar nuevo vendedor
                            </DialogDescription>
                        </DialogHeader>

                        <FormCreateSeller
                            userId={userId}
                            onSuccess={handleSuccess}
                            refetchUsuario={refetchVendedores}
                        />
                    </motion.div>
                </DialogContent>
            </Dialog>
        </div>
    );
}