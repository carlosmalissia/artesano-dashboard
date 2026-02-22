import { redirect } from "next/navigation"
import { getUserFromToken } from "./auth"
import type { AuthUser } from "./auth"
import type { Role } from "@/components/types/role"

export async function requireAuth(): Promise<AuthUser> {
  const user = await getUserFromToken()

  if (!user) {
    redirect("/login")
  }

  return user
}

export async function requireRole(requiredRole: Role) {
  const user = await requireAuth()

  if (!user.roles?.includes(requiredRole)) {
    redirect("/dashboard")
  }

  return user
}