export type UserPayload = {
  id: string
  email: string
  roles: ('admin' | 'vendedor' | 'comprador')[];
  nombre?: string
}