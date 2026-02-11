import VendedorOnly from "@/components/auth/VendedorOnly";
import { getUserFromCookie } from "@/lib-server/auth/getUserFromCookie";
import { Customers } from "./Customers";

export default async function Page() {
  const user = await getUserFromCookie();
  if (!user) return <p>Usuario no autenticado</p>;
    const customer = true
  return (
    <VendedorOnly user={user}>
      <Customers
        userId={user.id}
        isAdmin={user.rol === "vendedor"}
        customer = {customer}
      />
    </VendedorOnly>
  );
}