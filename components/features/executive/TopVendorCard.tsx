'use client';

type Vendor = {
  nombre: string;
  totalVendido: number;
  totalOrdenes: number;
};

type Props = {
  vendor: Vendor | null;
};

export function TopVendorCard({ vendor }: Props) {
  if (!vendor) return null;

  const formatMoney = (value: number) =>
    new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
    }).format(value);

  return (
    <div className="bg-card rounded-2xl p-6 shadow-md border border-border/40">
      <h2 className="text-lg font-semibold mb-4">🏆 Top Vendedor del Mes</h2>

      <div className="space-y-2">
        <p className="text-xl font-bold">{vendor.nombre}</p>

        <p className="text-2xl font-bold text-green-500">{formatMoney(vendor.totalVendido)}</p>

        <p className="text-sm text-muted-foreground">{vendor.totalOrdenes} órdenes este mes</p>
      </div>
    </div>
  );
}
