export type Order = {

    _id: string
    numeroFactura: string
    productos: Object[]
    vendedor: {
        _id: string;
        nombre: string;
        email: string;
        avatar?: string;
    };
    comprador:{
        _id: string
        rol: "admin" | "vendedor" | "usuario"
        nombre: string
        avatar?: string
    }
    fechaCreacion: string
    fechaActualizacion: string
    precioTotal:number
    

}