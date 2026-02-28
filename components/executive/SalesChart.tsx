'use client';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';
import { Area } from 'recharts';

type Props = {
  data: {
    year: number;
    month: number;
    totalVentas: number;
    totalComisiones: number;
  }[];
};

export function SalesChart({ data }: Props) {
  const safeData = Array.isArray(data) ? data : [];
  const formatted = safeData.map((item) => ({
    name: `${item.month}/${item.year}`,
    ventas: item.totalVentas,
    comisiones: item.totalComisiones,
  }));
  const compactFormatter = new Intl.NumberFormat('es-AR', {
    notation: 'compact',
    maximumFractionDigits: 1,
  });

  return (
    <div className="bg-card p-6 rounded-xl shadow-md">
      <h2 className="text-lg font-semibold mb-4">Ventas por Mes</h2>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={formatted}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis
            tickFormatter={(value) => compactFormatter.format(value)}
            tick={{ fill: '#94a3b8' }}
          />
          <Tooltip
            formatter={(value) => {
              if (typeof value !== 'number') return value;

              return new Intl.NumberFormat('es-AR', {
                style: 'currency',
                currency: 'ARS',
              }).format(value);
            }}
          />
          <Area type="monotone" dataKey="ventas" fill="#3b82f6" fillOpacity={0.1} stroke="none" />
          <Line
            type="monotone"
            dataKey="ventas"
            stroke="#3b82f6"
            strokeWidth={3}
            dot={{ r: 5 }}
            activeDot={{ r: 7 }}
          />

          <Line
            type="monotone"
            dataKey="comisiones"
            stroke="#10b981"
            strokeWidth={3}
            dot={{ r: 5 }}
            activeDot={{ r: 7 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
