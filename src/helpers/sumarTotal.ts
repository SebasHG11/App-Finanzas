type Transaccion = {
    monto: number
}

export const sumarTotal = <T extends Transaccion> (items: T[]): number =>{
    return items.reduce((total, item) => total + item.monto, 0);
};