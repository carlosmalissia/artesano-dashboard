import { getUserFromCookie } from "@/lib-server/auth/getUserFromCookie";
import AdminOnly from "@/components/auth/AdminOnly";

export default async function AdminPage() {
  const user = await getUserFromCookie();

  return <AdminOnly user={user} />;
}