import { getUserFromCookie } from "@/lib-server/auth/getUserFromCookie";
import AdminOnly from "@/components/auth/AdminOnly";

export default async function AdminPage() {
  const user = await getUserFromCookie();

  if (!user) return <p>Usuario no autenticado</p>;

  return (
    <AdminOnly user={user}>
      <h1>Este es el dashboard de admin</h1>
    </AdminOnly>
  );
}
