type Props = {
    categoria: Category
}

export const CardCategoria = ({ categoria }:Props): JSX.Element =>{
    return(
        <div className="p-4 w-48 grid place-items-center border border-black rounded-lg">
            <h4 className="font-semibold text-lg">{categoria.nombre}</h4>
            <p>{categoria.presupuesto}</p>
            <p>{categoria.tipo}</p>
        </div>
    );
}