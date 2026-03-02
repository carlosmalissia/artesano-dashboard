import VendedorOnly from '@/components/features/auth/VendedorOnly';
import { getUserFromCookie } from '@/lib-server/auth/getUserFromCookie';
import { ProductosClient } from './ProductosClient';

export default async function Companies() {
  const user = await getUserFromCookie();
  if (!user) return <p>Usuario no autenticado</p>;

  return (
    <VendedorOnly user={user}>
      <ProductosClient userId={user.id} />
    </VendedorOnly>
  );
}
