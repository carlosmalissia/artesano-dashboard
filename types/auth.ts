import { Role } from './role';

export type UserPayload = {
  id: string;
  email: string;
  roles: Role[];
  nombre?: string;
};

export type AuthUser = {
  id: string;
  roles: Role[];
  nombre?: string;
  avatar?: string;
};
