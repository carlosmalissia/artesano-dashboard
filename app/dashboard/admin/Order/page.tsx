import AdminOnly from "@/components/auth/AdminOnly";
import { getUserFromCookie } from "@/lib-server/auth/getUserFromCookie";
import { OrderAdmin } from "./OrderAdmin";

export default async function Page() {
  const user = await getUserFromCookie();
  if (!user) return <p>Usuario no autenticado</p>;

  return (
    <AdminOnly user={user}>
      <OrderAdmin
        userId={user.id}
        isAdmin={user.rol === "admin"}
      />
    </AdminOnly>
  );
}