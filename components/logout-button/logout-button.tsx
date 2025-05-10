"use client"

import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import axios from "axios"

export default function LogoutButton() {
  const router = useRouter()

  const handleLogout = async () => {
    await axios.post("/api/logout")
    router.push("/login")
  }

  return <Button variant="outline" onClick={handleLogout}>Cerrar sesión</Button>
}
