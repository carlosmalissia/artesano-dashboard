import LogoutButton from "@/components/logout-button/logout-button"

export default function AdminDashboard() {
  return (
    <div className="p-6 text-white text-2xl font-bold">
      <LogoutButton />
      Bienvenido al Dashboard del Administrador
    </div>
  );
}
