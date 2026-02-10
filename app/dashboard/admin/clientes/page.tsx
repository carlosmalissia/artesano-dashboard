import AdminOnly from "@/components/auth/AdminOnly";
import { getUserFromCookie } from "@/lib-server/auth/getUserFromCookie";
import { CustomersAdmin } from "./CustomersAdmin";

export default async function Page() {
  const user = await getUserFromCookie();
  if (!user) return <p>Usuario no autenticado</p>;
    const customer = true
  return (
    <AdminOnly user={user}>
      <CustomersAdmin
        userId={user.id}
        isAdmin={user.rol === "admin"}
        customer = {customer}
      />
    </AdminOnly>
  );
}