import { Role } from "./role"


export type User = {
    _id: string
    roles: Role[]
    nombre: string
    avatar?: string
    fechaCreacion: string;
    fechaActualizacion: string;
}
