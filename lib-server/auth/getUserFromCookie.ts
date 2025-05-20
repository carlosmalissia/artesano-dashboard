// Este archivo solo corre del lado del servidor
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import { UserPayload } from '@/types/auth';

export const getUserFromCookie = async (): Promise<UserPayload | null> => {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    if (!token) return null;

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as UserPayload;
        return decoded;
    } catch {
        return null;
    }
};

