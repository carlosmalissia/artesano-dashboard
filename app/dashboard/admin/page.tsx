import AdminOnly from "@/components/auth/AdminOnly"

export default function AdminDashboard() {
  return (
    <AdminOnly>
      <div className="p-6 text-2xl font-bold">

        Bienvenido al Dashboard del Administrador
      </div>
    </AdminOnly>

  );
}
