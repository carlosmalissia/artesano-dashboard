"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useParams, useRouter } from "next/navigation"
import { useGetOrdenByIdQuery, useUpdateOrdenMutation } from "@/redux/services/orderApi"

interface ProductoOrden {
  _id: string
  producto: {
    _id: string
    nombre: string
  }
  precioUnitario: number
  cantidad: number
  subtotal: number
}

interface OrdenDetail {
  _id: string
  numeroFactura: string
  fechaCreacion: string
  estado: "pendiente" | "pagada"
  precioTotal: number
  comprador: {
    _id: string
    nombre: string
    email: string
  }
  productos: ProductoOrden[]
}

export default function DetailOrderPage() {
    
    const { id } = useParams()
    const { data, isLoading } = useGetOrdenByIdQuery(id as string)

    if (isLoading) return <div>Cargando...</div>
    if (!data) return <div>No se encontró la orden</div>

    const orden: OrdenDetail = data
    console.log("ver prodcto= ",orden.productos)
    return (
        <>
        <Card className="mb-6">
  <CardHeader className="flex flex-row items-center justify-between">
    <div>
      <CardTitle>Orden #{orden.numeroFactura}</CardTitle>
      <CardDescription>
        {new Date(orden.fechaCreacion).toLocaleString("es-AR")}
      </CardDescription>
    </div>

    <Badge
      variant={
        orden.estado === "pagada"
          ? "default"
          : orden.estado === "pendiente"
          ? "secondary"
          : "destructive"
      }
    >
      {orden.estado.toUpperCase()}
    </Badge>
  </CardHeader>
</Card>

<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
  <Card>
    <CardHeader>
      <CardTitle>Cliente</CardTitle>
    </CardHeader>
    <CardContent className="space-y-2 text-sm">
      <p><strong>Nombre:</strong> {orden.comprador.nombre}</p>
      <p><strong>Email:</strong> {orden.comprador.email}</p>
    </CardContent>
  </Card>

  <Card>
    <CardHeader>
      <CardTitle>Resumen</CardTitle>
    </CardHeader>
    <CardContent className="space-y-3">
      <div className="flex justify-between">
        <span>Total</span>
        <span className="font-bold text-lg">
          ${orden.precioTotal.toLocaleString()}
        </span>
      </div>
    </CardContent>
  </Card>
</div>

<Card>
  <CardHeader>
    <CardTitle>Productos</CardTitle>
  </CardHeader>
  <CardContent>
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Producto</TableHead>
          <TableHead>Precio</TableHead>
          <TableHead>Cantidad</TableHead>
          <TableHead>Subtotal</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orden.productos.map((item) => (
          <TableRow key={item._id}>
            <TableCell>{item.producto?.nombre ?? "Producto eliminado"}</TableCell>
            <TableCell>
              ${item.precioUnitario.toLocaleString()}
            </TableCell>
            <TableCell>{item.cantidad}</TableCell>
            <TableCell className="font-medium">
              ${item.subtotal.toLocaleString()}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </CardContent>
</Card>
</>
    )
}