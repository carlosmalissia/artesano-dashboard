import type { AuthUser } from "@/lib-server/auth/auth";

export function hasRole(user: AuthUser | null, role: string): boolean {
  if (!user) return false;
  return user.roles?.includes(role);
}