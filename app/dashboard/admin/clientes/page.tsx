import { getUserFromCookie } from '@/lib-server/auth/getUserFromCookie';
import { CustomersAdmin } from './CustomersAdmin';

export default async function Page() {
  const user = await getUserFromCookie();
  if (!user) return <p>Usuario no autenticado</p>;

  return <CustomersAdmin userId={user.id} isAdmin={user.roles.includes('OWNER')} />;
}
