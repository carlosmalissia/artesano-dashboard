
import { getUserFromCookie } from "@/lib-server/auth/getUserFromCookie";
import { Customers } from "./Customers";

export default async function Page() {
  const user = await getUserFromCookie();
  if (!user) return <p>Usuario no autenticado</p>;
    const customer = false
  return (
          <Customers
        userId={user.id}
        isAdmin={user.roles.includes("vendedor")}
        customer = {customer}
      />
  
  );
}