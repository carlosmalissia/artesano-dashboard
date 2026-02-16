"use client"

import { ArrowUpDown, MoreHorizontal, Pencil } from "lucide-react"
import { formatDate } from "@/util"
import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import Link from "next/link"
import Image from "next/image"
//import { DeleteProductDialog } from "../DeleteProductDialog"
import { Product } from "@/components/types/product"
import { Order } from "@/components/types/order";

type GetColumnsProps = {
  isAdmin?: boolean
  refetchOrder?: () => void
}

export const getColumns = ({
  isAdmin = false,
  refetchOrder,
}: GetColumnsProps): ColumnDef<Order>[] => {

  const columns: ColumnDef<Order>[] = [
    
    {
      accessorKey: "numeroFactura",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nº Factura
          <ArrowUpDown className="w-4 h-4 ml-2" />
        </Button>
      )
    },
    
    {
        id: "comprador",
        header: "Comprador",
        cell: ({ row }) => row.original.comprador?.nombre ?? "—"
    },
    {
        accessorKey: "precioTotal",
        header: "Total"
    },
    {
      accessorKey: "estado",
      header: "Estado"
    },

    {
      accessorKey: "fechaCreacion",
      header: "Creado",
      cell: ({ row }) => formatDate(row.original.fechaCreacion)
    },
    {
      accessorKey: "fechaActualizacion",
      header: "Editado",
      cell: ({ row }) => formatDate(row.original.fechaActualizacion)
    },
  ]

  // 👉 COLUMNA SOLO PARA ADMIN
  if (isAdmin) {
    columns.splice(2, 0, {
      id: "vendedor",
      header: "Vendedor",
      cell: ({ row }) => {
        const vendedor = row.original.vendedor
        return vendedor?.nombre ?? "—"
      },
    })
  }

  // 👉 ACTIONS (común a ambos roles)
  columns.push({
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const order = row.original
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="w-8 h-4 p-8">
              <span className="sr-only">Open Menu</span>
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <Link href={`/dashboard/vendedor/ordenes/${order._id}`}>
              <DropdownMenuItem>
                <Pencil className="w-4 h-4 mr-2" />
                Editar
              </DropdownMenuItem>
            </Link>
            <DropdownMenuItem asChild>
              {/* <DeleteProductDialog
                productId={producto._id}
                productName={producto.nombre}
                refetchProductos={refetchProductos}
              /> */}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }
  })

  return columns
}