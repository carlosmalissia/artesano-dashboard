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
import { DeleteProductDialog } from "../DeleteProductDialog"
import { Product } from "@/components/types/product"

type GetColumnsProps = {
  isAdmin?: boolean
  refetchProductos?: () => void
}

export const getColumns = ({
  isAdmin = false,
  refetchProductos,
}: GetColumnsProps): ColumnDef<Product>[] => {

  const columns: ColumnDef<Product>[] = [
    {
      accessorKey: "image",
      header: "Imagen",
      cell: ({ row }) => {
        const image = row.getValue("image")
        return (
          <div className="px-3">
            <Image
              src={typeof image === "string" ? image : "/image/product-icon.png"}
              width={40}
              height={40}
              alt="Image"
              className="h-auto w-auto"
            />
          </div>
        )
      }
    },
    {
      accessorKey: "nombre",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nombre Producto
          <ArrowUpDown className="w-4 h-4 ml-2" />
        </Button>
      )
    },
    {
      accessorKey: "descripcion",
      header: "Descripción"
    },
    {
      accessorKey: "precio",
      header: "Precio"
    },
    {
      accessorKey: "categoriaId.nombre",
      header: "Categoria"
    },
    {
      accessorKey: "stock",
      header: "Stock"
    },
    {
      accessorKey: "isDeleted",
      header: "Activo"
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
        const vendedor = row.original.vendedorId
        return vendedor?.nombre ?? "—"
      },
    })
  }

  // 👉 ACTIONS (común a ambos roles)
  columns.push({
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const producto = row.original
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="w-8 h-4 p-8">
              <span className="sr-only">Open Menu</span>
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <Link href={`/dashboard/vendedor/productos/${producto._id}`}>
              <DropdownMenuItem>
                <Pencil className="w-4 h-4 mr-2" />
                Editar
              </DropdownMenuItem>
            </Link>
            <DropdownMenuItem asChild>
              <DeleteProductDialog
                productId={producto._id}
                productName={producto.nombre}
                refetchProductos={refetchProductos}
              />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }
  })

  return columns
}
