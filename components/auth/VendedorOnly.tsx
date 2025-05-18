"use client";

import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/hooks/useUser";
import { toast } from "sonner";

interface Props {
    children: ReactNode;
}

export default function VendedorOnly({ children }: Props) {
    const { user } = useUser();
    const router = useRouter();

    useEffect(() => {
        if (user && user.rol !== "vendedor") {
            toast.warning("Acceso denegado. Serás redirigido al login en 5 segundos...");
            setTimeout(() => {
                router.push("/login");
            }, 5000);
        }
    }, [user, router]);

    if (!user || user.rol !== "vendedor") return null;

    return <>{children}</>;
}