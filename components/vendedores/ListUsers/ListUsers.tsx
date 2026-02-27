"use client"

import { motion } from "framer-motion"
import { DataTable } from "./data-table"
import { User } from "@/components/types/user";
import { getCustomerColumns } from "./columns"
import { ColumnDef } from "@tanstack/react-table";

type Props<TData> = {
  data: TData[]
  columns: ColumnDef<TData>[]
  isLoading: boolean
}

export function ListUsers<TData>({
  data,
  columns,
  isLoading,
}: Props<TData>) {
  return (
    <>
      {isLoading ? (
        <h2 className="text-lg text-muted-foreground mb-4">
          Cargando datos...
        </h2>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <DataTable columns={columns} data={data} />
        </motion.div>
      )}
    </>
  )
}