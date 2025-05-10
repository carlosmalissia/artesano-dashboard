import {
    BarChart4,
    Shirt,
    PanelsTopLeft,
    Settings,
    ShieldCheck,
    CircleHelpIcon,
    Users,
    WalletCards
} from "lucide-react";

export const dataGeneralSidebar = [
    {
        icon: PanelsTopLeft,
        label: "Dashboard",
        href: "/",
    },
    {
        icon: Shirt,
        label: "Productos",
        href: "/companies",
    },
    {
        icon: Users,
        label: "Clientes",
        href: "/tasks",
    },
    {
        icon: WalletCards,
        label: "Facturas",
        href: "/facturas",
    },
];

export const dataToolsSidebar = [
    {
        icon: CircleHelpIcon,
        label: "Faqs",
        href: "/faqs",
    },
    {
        icon: BarChart4,
        label: "Analytics",
        href: "/analytics",
    },
];

export const dataSupportSidebar = [
    {
        icon: Settings,
        label: "Setting",
        href: "/setting",
    },
    {
        icon: ShieldCheck,
        label: "Security",
        href: "/security",
    },
];