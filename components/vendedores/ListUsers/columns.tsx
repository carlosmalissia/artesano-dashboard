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
import { DeleteUserDialog } from "../DeleteUserDialog"
import { User } from "@/components/types/user"

type GetColumnsProps = {
  isAdmin?: boolean
  refetchUsuarios?: () => void
}

export const getCustomerColumns = ({
  isAdmin = false,
  refetchUsuarios,
}: GetColumnsProps): ColumnDef<User>[] => {

  const columns: ColumnDef<User>[] = [
    {
      accessorKey: "avatar",
      header: "Imagen",
      cell: ({ row }) => {
        const image = row.getValue("avatar")
        return (
          <div className="px-3">
            <Image
              src={typeof image === "string" ? image : "/image/avatarPorDefecto.jpg"}
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
          Nombre
          <ArrowUpDown className="w-4 h-4 ml-2" />
        </Button>
      )
    },
    {
      accessorKey: "email",
      header: "Email"
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

  // 👉 ACTIONS (común a ambos roles)
  columns.push({
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const usuario = row.original
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="w-8 h-4 p-8">
              <span className="sr-only">Open Menu</span>
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <Link href={`/dashboard/admin/vendedores/${usuario._id}`}>
              <DropdownMenuItem>
                <Pencil className="w-4 h-4 mr-2" />
                Editar
              </DropdownMenuItem>
            </Link>
            {/* <DropdownMenuItem asChild>
              <DeleteUserDialog
                productId={usuario._id}
                productName={usuario.nombre}
                refetchProductos={refetchUsuarios
                }
              />
            </DropdownMenuItem> */}
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }
  })

  return columns
}
