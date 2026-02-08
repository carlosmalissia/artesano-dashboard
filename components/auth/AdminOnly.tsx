"use client";
import { ReactNode } from "react";
import { UserPayload } from "@/types/auth";

type Props = {
  user: UserPayload;
  children: ReactNode;
};

export default function AdminOnly({ user, children }: Props) {
  if (user.rol !== "admin") {
    return <p>No autorizado</p>;
  }

  return <>{children}</>;
}



