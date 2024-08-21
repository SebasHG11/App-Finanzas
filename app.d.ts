type Category = {
    id: number,
    nombre: string,
    tipo: string,
    presupuesto: number
}

type Ingreso = {
    id: number,
    concepto: string,
    monto: number,
    fecha: string
    categoriaId: number,
    categoria: Category
}