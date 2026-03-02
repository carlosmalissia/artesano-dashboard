'use client';

import { motion } from 'framer-motion';
import { DataTable } from '@/components/shared/data-table';
import { ColumnDef } from '@tanstack/react-table';

type Props<T> = {
  data: T[];
  columns: ColumnDef<T>[];
  isLoading: boolean;
  loadingText?: string;
};

export function ListTable<T>({
  data,
  columns,
  isLoading,
  loadingText = 'Cargando datos...',
}: Props<T>) {
  if (isLoading) {
    return <h2 className="text-lg text-muted-foreground mb-4">{loadingText}</h2>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <DataTable columns={columns} data={data} />
    </motion.div>
  );
}
