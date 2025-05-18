"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { parseJwt } from "@/lib/utils";

export function useAuthRedirect() {
    const router = useRouter();

    useEffect(() => {
        const token = document.cookie
            .split('; ')
            .find(row => row.startsWith('token='))
            ?.split('=')[1];

        const decoded = token ? parseJwt(token) : null;

        if (!decoded) {
            router.push("/login");
        }
    }, [router]);
}