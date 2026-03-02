export type Categoria = {
  _id: string;
  nombre: string;
  slug: string;
  activa: boolean;
  parent?: string | null;
  orden?: number;
  fechaCreacion?: string;
  fechaActualizacion?: string;
};
