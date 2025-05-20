export type UserPayload = {
    id: string;
    nombre: string;
    email: string;
    rol: 'admin' | 'vendedor' | 'usuario';
    avatar?: string;
};