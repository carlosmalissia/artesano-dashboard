import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import { Role } from '@/components/types/role';

export interface AuthUser {
  id: string;
  email: string;
  roles: Role[];
  nombre?: string;
  avatar?: string;
}

export async function getUserFromToken(): Promise<AuthUser | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  if (!token) return null;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as AuthUser;
    return decoded;
  } catch {
    return null;
  }
}
