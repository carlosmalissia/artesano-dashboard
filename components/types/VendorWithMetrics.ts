export interface VendorWithMetrics {
  _id: string;
  nombre: string;
  email: string;
  avatar?: string;
  roles: string[];
  totalOrdenes: number;
  totalProductos: number;
  totalVendido: number;
  comisionPlataforma: number;
  gananciaVendedor: number;
  createdAt: string;
}
