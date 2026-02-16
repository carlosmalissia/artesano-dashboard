export type Order = {

    _id: string
    productos: Object[]
    vendedorId: {
        _id: string;
        nombre: string;
        email: string;
        avatar?: string;
    };
    compradorId:{
        _id: string
        rol: "admin" | "vendedor" | "usuario"
        nombre: string
        avatar?: string
    }
    fechaCreacion: string
    fechaActualizacion: string
    precioTotal:number
    numeroFactura:number

}