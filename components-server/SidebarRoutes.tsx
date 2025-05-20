import { getUserFromCookie } from "@/lib-server/auth/getUserFromCookie";
import { SidebarRoutesClient } from "@/components/SidebarRoutesClient";

export default async function SidebarRoutes() {
    const user = await getUserFromCookie();
    const rol = user?.rol ?? "usuario"; // fallback si no hay usuario

    return <SidebarRoutesClient rol={rol} />;
}