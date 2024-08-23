import { FinanzaContext } from "@/context/FinanzaContext";
import { useContext } from "react";

type Props = {
  categoria: Category
}

export const CardCategoria = ({ categoria }: Props): JSX.Element => {
  const context = useContext(FinanzaContext);

  return (
    <div className="p-4 min-w-60 w-60 grid place-items-center border border-black rounded-lg">
      <h4 className="font-semibold text-xl">
        {categoria.nombre}
      </h4>
      <p className="font-light">Ppto</p>
      <p>
        {context?.formatMonto(categoria.presupuesto)}$
      </p>
      <p className={`${categoria.tipo === 'Gastos' ? 'text-red-600' : 'text-green-600'} font-semibold`}>
        {categoria.tipo}
      </p>
      <div className="m-1 flex items-center justify-around gap-2">
        <span className="bg-yellow-400 text-white font-bold px-2 py-1 rounded-lg cursor-pointer">
          Editar
        </span>
      </div>
    </div>
  );
}