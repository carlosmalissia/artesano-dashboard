export type Order = {
  _id: string;
  numeroFactura: string;
  productos: Object[];
  vendedor: {
    _id: string;
    nombre: string;
    email: string;
    avatar?: string;
  };
  cliente: {
    _id: string;
    roles: ('ADMIN' | 'VENDEDOR' | 'CLIENTE')[];
    nombre: string;
    avatar?: string;
  };
  fechaCreacion: string;
  fechaActualizacion: string;
  precioTotal: number;
};
