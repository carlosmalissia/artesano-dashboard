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
        href: "/dashboard/admin",
    },
    {
        icon: Shirt,
        label: "Productos",
        href: "/dashboard/admin/productos",
    },
    {
        icon: Users,
        label: "Categorias",
        href: "/dashboard/admin/categorias",
    },
    {
        icon: Users,
        label: "Vendedores",
        href: "/dashboard/admin/vendedores",
    },
    {
        icon: Users,
        label: "Clientes",
        href: "/dashboard/admin/clientes",
    },
    {
        icon: WalletCards,
        label: "Facturas",
        href: "/dashboard/admin/facturas",
    },
];

export const dataGeneralSidebarVendedor = [
    {
        icon: PanelsTopLeft,
        label: "Dashboard",
        href: "/dashboard/vendedor",
    },
    {
        icon: Shirt,
        label: "Productos",
        href: "/dashboard/vendedor/productos",
    },
    {
        icon: Users,
        label: "Categorias",
        href: "/dashboard/vendedor/categorias",
    },
    {
        icon: Users,
        label: "Clientes",
        href: "/dashboard/vendedor/clientes",
    },
    {
        icon: WalletCards,
        label: "Facturas",
        href: "/dashboard/vendedor/facturas",
    },
];

export const dataToolsSidebarAdmin = [
    {
        icon: CircleHelpIcon,
        label: "Faqs",
        href: "/dashboard/admin/faqs",
    },
    {
        icon: BarChart4,
        label: "Analytics",
        href: "/dashboard/admin/analytics",
    },
];

export const dataSupportSidebarAdmin = [
    {
        icon: Settings,
        label: "Setting",
        href: "/dashboard/admin/setting",
    },
    {
        icon: ShieldCheck,
        label: "Security",
        href: "/dashboard/admin/security",
    },
    {
        icon: ShieldCheck,
        label: "Personalizacion",
        href: "/dashboard/admin/personalizacion",
    },
];

export const dataToolsSidebarVendedor = [
    {
        icon: CircleHelpIcon,
        label: "Faqs",
        href: "/dashboard/vendedor/faqs",
    },
    {
        icon: BarChart4,
        label: "Analytics",
        href: "/dashboard/vendedor/analytics",
    },
];

export const dataSupportSidebarVendedor = [
    {
        icon: Settings,
        label: "Setting",
        href: "/dashboard/vendedor/setting",
    },
    {
        icon: ShieldCheck,
        label: "Security",
        href: "/dashboard/vendedor/security",
    },
    {
        icon: ShieldCheck,
        label: "Personalizacion",
        href: "/dashboard/vendedor/personalizacion",
    },
];