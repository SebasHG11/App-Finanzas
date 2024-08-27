import { GraficoCatGastos } from "../GraficoCatGastos";
import { GraficoCatIngresos } from "../GraficoCatIngresos";
import { GraficoIngGasPorAnio } from "../GraficoIngGasPorAnio";
import { GraficoIngresosGastos } from "../GraficoIngresosGastos";

export const Dashboard = (): JSX.Element => {
  return (
    <div className="m-6 w-full h-full grid place-items-center">
      <h1 className="font-light text-3xl">Dashboard</h1>
      <div className="m-6 w-full h-full flex justify-around items-center">
        <GraficoIngresosGastos />
        <GraficoCatGastos />
        <GraficoCatIngresos />
      </div>
      <div className="m-6 w-full h-full flex justify-center items-center">
        <GraficoIngGasPorAnio />
      </div>
    </div>
  );
}