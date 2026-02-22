export const ROLES = ["admin", "vendedor", "comprador"] as const

export type Role = (typeof ROLES)[number]