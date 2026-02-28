import { getUserFromToken } from '@/lib-server/auth/auth';
import { SidebarRoutesClient } from '@/components/SidebarRoutesClient';
import type { Role } from '@/components/types/role';

export default async function SidebarRoutes() {
  const user = await getUserFromToken();
  if (!user) return null;

  // prioridad jerárquica
  const rol: Role = user.roles.includes('OWNER')
    ? 'OWNER'
    : user.roles.includes('ADMIN')
      ? 'ADMIN'
      : user.roles.includes('VENDEDOR')
        ? 'VENDEDOR'
        : 'CLIENTE';

  return <SidebarRoutesClient rol={user.roles} />;
}
