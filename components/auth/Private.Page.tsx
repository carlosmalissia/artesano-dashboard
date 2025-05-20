'use client';

type Props = {
    user: any;
};

export default function PrivatePage({ user }: Props) {
    if (!user) {
        return <p>Debés estar logueado para acceder.</p>;
    }

    return (
        <div>
            <h1>Zona Privada</h1>
            <p>Hola {user.nombre} ({user.rol})</p>
        </div>
    );
}
