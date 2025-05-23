import { Logo } from "@/components/Logo";

import SidebarRoutes from "@/components-server/SidebarRoutes";

export function Sidebar() {
    return (
        <div className="h-screen">
            <div className="flex flex-col h-full border-r">
                <Logo />
                <SidebarRoutes />
            </div>
        </div>
    )
}