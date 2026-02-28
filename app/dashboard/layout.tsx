import { Sidebar } from '@/components/Sidebar';
import { Navbar } from '@/components/Navbar';
import { requireAuth } from '@/lib-server/auth/guards';
import type { AuthUser } from '@/components/types/auth';

export default async function LayoutDashboard({ children }: { children: React.ReactNode }) {
  const user: AuthUser = await requireAuth();

  console.log('User actual:', user);

  return (
    <div className="flex w-full h-full">
      <div className="hidden xl:block w-80 h-full xl:fixed">
        <Sidebar />
      </div>
      <div className="w-full xl:ml-80 h-full">
        <Navbar user={user} />
        <div className="p-6 bg-[#fafbfc] dark:bg-secondary">{children}</div>
      </div>
    </div>
  );
}
