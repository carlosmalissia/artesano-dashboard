import AdminOnly from "@/components/auth/AdminOnly";
import { getUserFromCookie } from "@/lib-server/auth/getUserFromCookie";
import { ProductosAdmin } from "./ProductosAdmin";


export default async function Companies() {
  const user = await getUserFromCookie();
  if (!user) return <p>Usuario no autenticado</p>;

  return (
   
        <ProductosAdmin userId={user.id} />
    
  );
}

