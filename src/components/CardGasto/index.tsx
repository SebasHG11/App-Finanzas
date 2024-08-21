import { FinanzaContext } from "@/context/FinanzaContext";
import { useContext } from "react";

type Props = {
  gasto: Gasto
}

export const CardGasto = ({ gasto }: Props): JSX.Element => {
  const context = useContext(FinanzaContext);

  return (
    <div className="p-4 w-60 grid place-items-center border-2 border-red-600 rounded-lg">
      <h4 className="font-semibold text-xl text-center">
        {gasto.concepto}
      </h4>
      <p className="font-light">Monto</p>
      <p>
        {context?.formatMonto(gasto.monto)}$
      </p>
      <p className="font-extralight">
        {context?.formatFecha(gasto.fecha)}
      </p>
      <p className="font-bold text-red-800">
        {gasto.categoria.nombre}
      </p>
    </div>
  );
}