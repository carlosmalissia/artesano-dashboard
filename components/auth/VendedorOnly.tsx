'use client';

import { ReactNode } from 'react';
import { UserPayload } from '@/types/auth'; // si ya lo definiste

type Props = {
    user: UserPayload | null;
    children: ReactNode;
};

export default function VendedorOnly({ user, children }: Props) {
    if (!user || !user.roles.includes('vendedor')) {
        return <p>No autorizado</p>;
    }

    return <>{children}</>;
}

