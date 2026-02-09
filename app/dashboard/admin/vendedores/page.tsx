import AdminOnly from "@/components/auth/AdminOnly";
import { getUserFromCookie } from "@/lib-server/auth/getUserFromCookie";
import { Vendedores } from "./Vendedores";

export default async function Page() {
  const user = await getUserFromCookie();
  if (!user) return <p>Usuario no autenticado</p>;

  return (
    <AdminOnly user={user}>
      <Vendedores
        userId={user.id}
        isAdmin={user.rol === "admin"}
      />
    </AdminOnly>
  );
}