export type UserPayload = {
  id: string;
  nombre: string;
  email: string;
  roles: ('OWNER' | 'ADMIN' | 'VENDEDOR' | 'CLIENTE')[];
  avatar?: string;
};
