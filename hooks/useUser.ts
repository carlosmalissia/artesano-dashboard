"use client";

import { useEffect, useState } from "react";
import { parseJwt } from "@/lib/utils"; // Asegurate de tener esta función o te la paso
import { cookies } from "next/headers";

interface User {
  id: string;
  rol: string;
  nombre?: string;
  avatar?: string;
}

export function useUser() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const token = document.cookie
      .split('; ')
      .find(row => row.startsWith('token='))
      ?.split('=')[1];

    if (token) {
      const decoded = parseJwt(token);
      if (decoded?.id && decoded?.rol) {
        setUser({
          id: decoded.id,
          rol: decoded.rol,
          nombre: decoded.nombre,
          avatar: decoded.avatar,
        });
      }
    }
  }, []);

  return { user };
}