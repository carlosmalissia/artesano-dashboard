import { requireRole } from '@/lib-server/auth/guards';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  await requireRole('OWNER');

  return <>{children}</>;
}
