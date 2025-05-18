import { HeaderProduct } from "@/components/productos/HeaderProduct"
import { ListProducts } from "@/components/productos/ListProducts"
import VendedorOnly from "@/components/auth/VendedorOnly"

export default function Companies() {
    return (
        <VendedorOnly>
            <div>
                <HeaderProduct />
                <ListProducts />
            </div>
        </VendedorOnly>

    )
}