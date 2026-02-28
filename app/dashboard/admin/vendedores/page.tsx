import { getUserFromCookie } from '@/lib-server/auth/getUserFromCookie';
import { Vendedores } from './Vendedores';

export default async function Page() {
  const user = await getUserFromCookie();
  if (!user) return <p>Usuario no autenticado</p>;

  return <Vendedores />;
}
