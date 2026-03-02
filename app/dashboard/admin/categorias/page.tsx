import { getUserFromCookie } from '@/lib-server/auth/getUserFromCookie';
import { CategoryPage } from './Category';

export default async function Page() {
  const user = await getUserFromCookie();
  if (!user) return <p>Usuario no autenticado</p>;

  return <CategoryPage userId={user.id} isAdmin={user.roles.includes('OWNER')} />;
}
