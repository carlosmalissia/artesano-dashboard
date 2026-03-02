import { Role } from '../../types/role';

export type User = {
  _id: string;
  roles: Role[];
  nombre: string;
  avatar?: string;
  fechaCreacion: string;
  fechaActualizacion: string;
};
