import { requireRole } from "@/lib-server/auth/guards"

export default async function VendedorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  await requireRole("vendedor")

  return <>{children}</>
}