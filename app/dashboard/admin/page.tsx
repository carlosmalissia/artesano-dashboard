import { cookies } from 'next/headers';
import { ExecutiveCards } from '@/components/executive/ExecutiveCards';
import { SalesChart } from '@/components/executive/SalesChart';
import { SalesByVendorChart } from '@/components/executive/SalesByVendorChart';
import { TopVendorCard } from '@/components/executive/TopVendorCard';

export default async function Page() {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  // 1️⃣ Stats generales
  const statsRes = await fetch('http://localhost:5000/api/executive/stats', {
    headers: {
      Cookie: `token=${token}`,
    },
    cache: 'no-store',
  });

  const stats = await statsRes.json();

  // 2️⃣ Ventas por mes
  const salesRes = await fetch('http://localhost:5000/api/executive/sales-by-month', {
    headers: {
      Cookie: `token=${token}`,
    },
    cache: 'no-store',
  });

  //Ticket x venta
  const ticketPromedio = stats.metricas.ordenes > 0 ? stats.ventas / stats.metricas.ordenes : 0;

  const json = await salesRes.json();
  const sales = json.data;
  const meta = json.meta;

  let growth = 0;

  if (Array.isArray(sales) && sales.length >= 2) {
    const last = sales[sales.length - 1].totalVentas;
    const prev = sales[sales.length - 2].totalVentas;

    if (prev > 0) {
      growth = ((last - prev) / prev) * 100;
    }
  }

  // sales x vendor
  const vendorsRes = await fetch('http://localhost:5000/api/vendors-with-metrics', {
    headers: {
      Cookie: `token=${token}`,
    },
    cache: 'no-store',
  });

  const vendors = await vendorsRes.json();

  let topVendor = null;

  // top vendedor x mes
  if (Array.isArray(vendors) && vendors.length > 0) {
    topVendor = [...vendors].sort((a, b) => b.totalVendido - a.totalVendido)[0];
  }

  return (
    <div className="space-y-10">
      <ExecutiveCards data={stats} growth={growth} ticketPromedio={ticketPromedio} meta={meta} />
      <SalesChart data={Array.isArray(sales) ? sales : []} />
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2">
          <SalesByVendorChart data={vendors} />
        </div>

        <TopVendorCard vendor={topVendor} />
      </div>
    </div>
  );
}
