import { User } from "@/components/types/user"
import { Role } from "@/components/types/role"

export const hasRole = (user: User | null, role: Role) => {
  if (!user) return false
  return user.roles.includes(role)
}

export const hasAnyRole = (user: User | null, roles: Role[]) => {
  if (!user) return false
  return roles.some((role) => user.roles.includes(role))
}