import { FinanzaContext } from "@/context/FinanzaContext";
import { useContext } from "react";

type Props = {
  sumaTotalIngresos: number
}

export const TotalIngresos = ({ sumaTotalIngresos }: Props): JSX.Element => {
  const context = useContext(FinanzaContext);

  return (
    <div className="m-3 grid place-items-center">
      <h2 className="text-lg">Total Ingresos</h2>
      <p className="font-bold text-xl text-green-600">{context?.formatMonto(sumaTotalIngresos)}$</p>
    </div>
  );
}