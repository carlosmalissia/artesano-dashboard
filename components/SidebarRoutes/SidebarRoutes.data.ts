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

export const dataGeneralSidebarAdmin = [
    {
        icon: PanelsTopLeft,
        label: "Dashboard",
        href: "/admin",
    },
    {
        icon: Shirt,
        label: "Productos",
        href: "/admin/productos",
    },
    {
        icon: Users,
        label: "Categorias",
        href: "/admin/categorias",
    },
    {
        icon: Users,
        label: "Clientes",
        href: "/admin/clientes",
    },
    {
        icon: WalletCards,
        label: "Facturas",
        href: "/admin/facturas",
    },
];

export const dataGeneralSidebarVendedor = [
    {
        icon: PanelsTopLeft,
        label: "Dashboard",
        href: "/vendedor",
    },
    {
        icon: Shirt,
        label: "Productos",
        href: "/vendedor/productos",
    },
    {
        icon: Users,
        label: "Categorias",
        href: "/vendedor/categorias",
    },
    {
        icon: Users,
        label: "Clientes",
        href: "/vendedor/clientes",
    },
    {
        icon: WalletCards,
        label: "Facturas",
        href: "/vendedor/facturas",
    },
];

export const dataToolsSidebarAdmin = [
    {
        icon: CircleHelpIcon,
        label: "Faqs",
        href: "/admin/faqs",
    },
    {
        icon: BarChart4,
        label: "Analytics",
        href: "/admin/analytics",
    },
];

export const dataSupportSidebarAdmin = [
    {
        icon: Settings,
        label: "Setting",
        href: "/admin/setting",
    },
    {
        icon: ShieldCheck,
        label: "Security",
        href: "/admin/security",
    },
    {
        icon: ShieldCheck,
        label: "Personalizacion",
        href: "/admin/personalizacion",
    },
];

export const dataToolsSidebarVendedor = [
    {
        icon: CircleHelpIcon,
        label: "Faqs",
        href: "/vendedor/faqs",
    },
    {
        icon: BarChart4,
        label: "Analytics",
        href: "/vendedor/analytics",
    },
];

export const dataSupportSidebarVendedor = [
    {
        icon: Settings,
        label: "Setting",
        href: "/vendedor/setting",
    },
    {
        icon: ShieldCheck,
        label: "Security",
        href: "/vendedor/security",
    },
    {
        icon: ShieldCheck,
        label: "Personalizacion",
        href: "/vendedor/personalizacion",
    },
];