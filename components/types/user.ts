export type User = {
    _id: string
    rol: "admin" | "vendedor" | "usuario"
    nombre: string
    avatar?: string
    fechaCreacion: string;
    fechaActualizacion: string;
}
