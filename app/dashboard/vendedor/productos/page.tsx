import { HeaderProduct } from "@/components/productos/HeaderProduct"
import { ListProducts } from "@/components/productos/ListProducts"
import VendedorOnly from "@/components/auth/VendedorOnly"
import { getUserFromCookie } from "@/lib-server/auth/getUserFromCookie";

export default async function Companies() {
    const user = await getUserFromCookie();
    if (!user) return <p>Usuario no autenticado</p>;
    return (
        <VendedorOnly user={user}>
            <div>
                <HeaderProduct userId={user.id} />
                <ListProducts userId={user?.id} />
            </div>
        </VendedorOnly>

    )
}