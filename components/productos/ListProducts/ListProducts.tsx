"use client"

import { ProductSkeleton } from "../ProductSkeleton"
import { motion } from "framer-motion"
import { getColumns } from "./columns"
import { DataTable } from "./data-table"
import { Product } from "@/components/types/product"

type Props = {
  productos: Product[]
  isLoading: boolean
  refetchProductos: () => void
  isAdmin?: boolean
}

export function ListProducts({
  productos,
  isLoading,
  refetchProductos,
  isAdmin = false,
}: Props) {
  return (
    <>
      {isLoading ? (
        <>
          <h2 className="text-lg text-muted-foreground mb-4">
            Cargando productos...
          </h2>
          <ProductSkeleton />
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
              refetchProductos,
            })}
            data={productos}
          />
        </motion.div>
      )}
    </>
  )
}

