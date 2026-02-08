export type UserPayload = {
  id: string
  email: string
  rol: "admin" | "vendedor"
  nombre?: string
}