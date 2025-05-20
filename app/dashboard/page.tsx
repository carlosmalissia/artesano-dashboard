export const dynamic = "force-dynamic"

import { redirect } from "next/navigation"
import { getUserFromToken } from "@/lib-server/auth/auth"

export default async function DashboardRedirect() {
  const user = await getUserFromToken()

  if (!user) {
    redirect("/login")
  }

  if (user.rol === "admin") {
    redirect("/dashboard/admin")
  } else if (user.rol === "vendedor") {
    redirect("/dashboard/vendedor")
  } else {
    redirect("/login")
  }
}
