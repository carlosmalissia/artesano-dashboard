import { getUserFromCookie } from "@/lib-server/auth/getUserFromCookie";
import VendedorOnly from "@/components/auth/VendedorOnly";

export default async function VendedorPage() {
  const user = await getUserFromCookie();

  return <VendedorOnly user={user}>
    <h1> Este es el dashboard de vendedor</h1>
  </VendedorOnly>;
}
