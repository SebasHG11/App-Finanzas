import { FinanzaContext } from "@/context/FinanzaContext";
import { useContext, useEffect, useState } from "react";

type Props = {
  sumaTotalIngresos: number,
  sumaTotalGastos: number
}

export const Saldo = ({ sumaTotalIngresos, sumaTotalGastos }: Props): JSX.Element => {
  const context = useContext(FinanzaContext);

  const [saldoTotal, setSaldoTotal] = useState<number>(0);

  useEffect(() => {
    const saldo = sumaTotalIngresos - sumaTotalGastos;
    setSaldoTotal(saldo);
  }, [sumaTotalIngresos, sumaTotalGastos])

  return (
    <p className="font-extralight text-3xl">Saldo: {context?.formatMonto(saldoTotal)}$</p>
  );
}