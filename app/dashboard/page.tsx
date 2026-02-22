export const dynamic = "force-dynamic";

import { redirect } from "next/navigation";
import { getUserFromToken } from "@/lib-server/auth/auth";

import { hasRole } from "@/lib/auth/roles";


export default async function DashboardRedirect() {
  const user = await getUserFromToken();

  if (!user) {
    redirect("/login");
  }

  if (hasRole(user, "admin")) {
    redirect("/dashboard/admin");
  }

  if (hasRole(user, "vendedor")) {
    redirect("/dashboard/vendedor");
  }

  // fallback seguro
  redirect("/login");
}
