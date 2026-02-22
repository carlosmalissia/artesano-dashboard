import { getUserFromToken } from "@/lib-server/auth/auth";
import { SidebarRoutesClient } from "@/components/SidebarRoutesClient";
import type { Role } from "@/components/types/role";

export default async function SidebarRoutes() {
  const user = await getUserFromToken();

  let rol: Role = "vendedor"; // default seguro

  if (user?.roles?.includes("admin")) {
    rol = "admin";
  }

  return <SidebarRoutesClient rol={rol} />;
}