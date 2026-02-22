export type UserPayload = {
    id: string;
    nombre: string;
    email: string;
    roles: ('admin' | 'vendedor' | 'comprador')[];
    avatar?: string;
};