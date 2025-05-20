'use client';

type Props = {
    user: any; // o mejor: { id: string; rol: string; nombre: string; ... }
};

export default function AdminOnly({ user }: Props) {
    if (!user || user.rol !== 'admin') {
        return <p>No estás autorizado para ver esta página.</p>;
    }

    return (
        <div>
            <h1>Panel del Administrador</h1>
            <p>Bienvenido, {user.nombre}</p>
        </div>
    );
}

