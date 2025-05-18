import LogoutButton from "@/components/logout-button/logout-button"
import VendedorOnly from "@/components/auth/VendedorOnly"

export default function VendedorDashboard() {
  return (
    <VendedorOnly>
      <div className="p-6 text-white text-2xl font-bold">
        Bienvenido al Dashboard del Vendedor
      </div>
    </VendedorOnly>

  );
}
