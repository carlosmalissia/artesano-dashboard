"use client"

//import { ProductSkeleton } from "../ProductSkeleton"
import { motion } from "framer-motion"
import { getColumns } from "./columns"
import { DataTable } from "./data-table"
import { User } from "@/components/types/user"

type Props = {
  usuarios: User[]
  isLoading: boolean
  refetchUsuarios: () => void
  isAdmin?: boolean
}

export function ListUsers({
  usuarios,
  isLoading,
  refetchUsuarios,
  isAdmin = false,
}: Props) {
  return (
    <>
      {isLoading ? (
        <>
          <h2 className="text-lg text-muted-foreground mb-4">
            Cargando usuarios...
          </h2>
          {/* <ProductSkeleton /> */}
        </>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <DataTable
            columns={getColumns({
              isAdmin,
              refetchUsuarios,
            })}
            data={usuarios}
          />
        </motion.div>
      )}
    </>
  )
}