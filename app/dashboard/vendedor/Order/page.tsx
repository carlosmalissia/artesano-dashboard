import VendedorOnly from "@/components/auth/VendedorOnly";
import { getUserFromCookie } from "@/lib-server/auth/getUserFromCookie";
import { OrderSeller } from "./OrderSeller";

export default async function Companies() {
  const user = await getUserFromCookie();
  if (!user) return <p>Usuario no autenticado</p>;
console.log("userid:", user.id);

  return (
    
      <OrderSeller userId={user.id} />
    
  );
}