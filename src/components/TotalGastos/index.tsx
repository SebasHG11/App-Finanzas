import { FinanzaContext } from "@/context/FinanzaContext";
import { useContext } from "react";

type Props = {
  sumaTotalGastos: number
}

export const TotalGastos = ({ sumaTotalGastos }: Props): JSX.Element => {
  const context = useContext(FinanzaContext);

  return (
    <div className="m-3 grid place-items-center">
      <h2 className="text-lg">Total Gastos</h2>
      <p className="text-xl font-bold text-red-600">{context?.formatMonto(sumaTotalGastos)}$</p>
    </div>
  );
}