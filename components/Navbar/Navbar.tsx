import { Menu, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ToggleTheme } from "@/components/ToggleTheme"
import LogoutButton from "@/components/logout-button/logout-button"
import SidebarRoutes from "@/components-server/SidebarRoutes";

type User = {
    nombre: string
    avatar?: string
}

export function Navbar({ user }: { user: User }) {
    console.log("user: ", user);

    return (
        <nav className="flex items-center px-2 gap-x-4 md:px-6 
        justify-between w-full bg-background border-b h-20">
            <div className="block xl:hidden">
                <Sheet>
                    <SheetTrigger className="flex items-center">
                        <Menu />
                    </SheetTrigger>
                    <SheetContent side="left">
                        <SidebarRoutes />
                    </SheetContent>
                </Sheet>
            </div>
            <div className="relative w-[300px]">
                <Input placeholder="Search..." className="rounded-lg" />
                <Search strokeWidth={1} className="absolute top-2 right-2" />
            </div>
            <div className="flex gap-x-2 items-center">

                <div className="flex items-center gap-2">
                    {user.avatar ? (
                        <img
                            src={user.avatar}
                            alt="avatar"
                            className="w-8 h-8 rounded-full object-cover"
                        />
                    ) : (
                        <div className="w-8 h-8 rounded-full bg-muted" />
                    )}
                    <span className="text-sm font-medium text-muted-foreground">{user.nombre}</span>
                </div>
                <LogoutButton />
                <ToggleTheme />
            </div>
        </nav>
    )
}