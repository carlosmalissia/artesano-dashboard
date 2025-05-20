import { Sidebar } from "@/components/Sidebar"
import { Navbar } from "@/components/Navbar"
import { getUserFromToken } from "@/lib-server/auth/auth"
import type { User } from "@/components/types/user"

export default async function LayoutDashboard({
    children,
}: {
    children: React.ReactNode
}) {
    const user = await getUserFromToken() as User

    return (
        <div className="flex w-full h-full">
            <div className="hidden xl:block w-80 h-full xl:fixed">
                <Sidebar />
            </div>
            <div className="w-full xl:ml-80 h-full">
                <Navbar user={user} />
                <div className="p-6 bg-[#fafbfc] dark:bg-secondary">{children}</div>
            </div>
        </div>
    )
}
