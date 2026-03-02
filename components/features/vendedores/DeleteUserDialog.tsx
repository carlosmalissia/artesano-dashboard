"use client"

import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Trash } from "lucide-react"
import { useDeleteProductoMutation } from "@/redux/services/productosApi"
import { toast } from "sonner"

type Props = {
    productId: string
    productName: string
    refetchProductos?: () => void
}

export function DeleteUserDialog({ productId, productName, refetchProductos }: Props) {
    const [deleteProducto, { isLoading }] = useDeleteProductoMutation()
    console.log("id producto", productId);
    console.log("nombre", productName);
    
    
    const handleDelete = async () => {
        try {
            await deleteProducto(productId).unwrap()
            toast.success("Producto eliminado", {
                description: productName,
            })
            refetchProductos?.()
        } catch (error) {
            toast.error("Error al eliminar el producto", {
                description: "Intenta nuevamente",
            })
        }
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="ghost" className="text-red-600 hover:text-red-700">
                    <Trash className="w-4 h-4" />
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        ¿Estás seguro de eliminar este producto?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        Esta acción no se puede deshacer. Se eliminará "{productName}" permanentemente de la base de datos.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <Button onClick={handleDelete} disabled={isLoading} variant="destructive">
                        {isLoading ? "Eliminando..." : "Eliminar"}
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}