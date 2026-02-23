import AdminOnly from "@/components/auth/AdminOnly";
import { getUserFromCookie } from "@/lib-server/auth/getUserFromCookie";
import { Vendedores } from "./Vendedores";

export default async function Page() {
  const user = await getUserFromCookie();
  if (!user) return <p>Usuario no autenticado</p>;
  const customer = false
  return (
    
      <Vendedores
        userId={user.id}
        isAdmin={user.roles.includes("admin")}
        customer = {customer}
      />
    
  );
}