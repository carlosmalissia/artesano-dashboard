export type Product = {
    _id: string;
    nombre: string;
    descripcion: string;
    precio: number;
    stock: number;
    image: string;
    isDeleted: boolean;
    vendedorId: {
        _id: string;
        nombre: string;
        email: string;
        avatar?: string;
    };
    categoriaId: {
        _id: string;
        nombre: string;
    };
    fechaCreacion: string;
    fechaActualizacion: string;
};
