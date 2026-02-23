"use client"

//import { ProductSkeleton } from "../ProductSkeleton"
import { motion } from "framer-motion"
import { getColumns } from "./columns"
import { DataTable } from "./data-table"
import { Order } from "@/components/types/order"

type Props = {
  ordenes: Order[]
  isLoading: boolean
  refetchOrder: () => void
  isAdmin?: boolean
}

export function ListOrders({
  ordenes,
  isLoading,
  refetchOrder,
  isAdmin,
}: Props) {
  return (
    <>
      {isLoading ? (
        <>
          <h2 className="text-lg text-muted-foreground mb-4">
            Cargando facturas...
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
              refetchOrder,
            })}
            data={ordenes}
          />
        </motion.div>
      )}
    </>
  )
}