'use client';

import { TrendingUp, DollarSign, ShoppingCart, Users } from 'lucide-react';
import CountUp from 'react-countup';
import { formatARS } from '../../lib/formatCurrency';

type Stats = {
  ventas: number;
  ingresos: {
    comisiones: number;
    suscripciones: number;
    total: number;
  };
  metricas: {
    ordenes: number;
    vendedores: number;
    clientes: number;
  };
};

type Props = {
  data: Stats;
  growth: number;
  ticketPromedio: number;
  meta: {
    isCurrentMonth: boolean;
    monthCompletionPercentage: number | null;
    projectedVentas: number | null;
    projectedComisiones: number | null;
  };
};

export function ExecutiveCards({ data, growth, ticketPromedio, meta }: Props) {
  /* const formatMoney = (value: number) =>
    new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
    }).format(value); */

  const cards = [
    {
      title: 'Ventas Totales',
      value: formatARS(data.ventas),
      icon: DollarSign,
      color: 'text-green-500',
    },
    {
      title: 'Comisiones',
      value: formatARS(data.ingresos.total),
      icon: TrendingUp,
      color: 'text-blue-500',
    },
    {
      title: 'Órdenes',
      value: data.metricas.ordenes,
      icon: ShoppingCart,
      color: 'text-orange-500',
    },
    {
      title: 'Vendedores',
      value: data.metricas.vendedores,
      icon: Users,
      color: 'text-purple-500',
    },
    {
      title: 'Ticket Promedio',
      value: formatARS(ticketPromedio),
      icon: TrendingUp,
      color: 'text-emerald-400',
    },
  ];

  const isPositive = growth >= 0;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-6">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className="group bg-gradient-to-br from-card to-card/80 rounded-2xl p-6 shadow-md hover:shadow-2xl transition-all duration-300 border border-border/40
"
          >
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">{card.title}</p>
              <Icon className={`w-5 h-5 ${card.color}`} />
            </div>

            <h3 className="text-3xl font-bold mt-4 tracking-tight">
              {typeof card.value === 'number' ? (
                <CountUp end={card.value} duration={1.5} />
              ) : (
                card.value
              )}
            </h3>

            <div className="flex items-center gap-2 mt-2">
              <span
                className={`text-xs font-medium ${isPositive ? 'text-green-500' : 'text-red-500'}`}
              >
                {isPositive ? '↑' : '↓'} {growth.toFixed(1)}%
              </span>
              <span className="text-xs text-muted-foreground">vs mes anterior</span>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              {meta.isCurrentMonth
                ? `Mes en curso (${meta.monthCompletionPercentage}% completado)`
                : 'Mes cerrado. Datos consolidados'}
            </p>
          </div>
        );
      })}
    </div>
  );
}
