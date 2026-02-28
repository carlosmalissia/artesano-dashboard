'use client';

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';

type Vendor = {
  nombre: string;
  totalVendido: number;
};

type Props = {
  data: Vendor[];
};

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ef4444'];

export function SalesByVendorChart({ data }: Props) {
  const formatted = data.map((vendor) => ({
    name: vendor.nombre,
    value: vendor.totalVendido,
  }));

  return (
    <div className="bg-card rounded-2xl p-6 shadow-md border border-border/40">
      <h2 className="text-lg font-semibold mb-4">Distribución de Ventas por Vendedor</h2>

      <ResponsiveContainer width="100%" height={350}>
        <PieChart>
          <Pie
            data={formatted}
            dataKey="value"
            nameKey="name"
            outerRadius={120}
            innerRadius={60}
            paddingAngle={4}
          >
            {formatted.map((_, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>

          <Tooltip
            formatter={(value) =>
              new Intl.NumberFormat('es-AR', {
                style: 'currency',
                currency: 'ARS',
              }).format(Number(value))
            }
          />

          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
