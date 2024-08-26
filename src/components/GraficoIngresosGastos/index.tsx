import { FinanzaContext } from "@/context/FinanzaContext";
import { sumarTotal } from "@/helpers/sumarTotal";
import { useContext, useEffect, useState } from "react";
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

type Datos = {
  nombre: string,
  total: number
}

export const GraficoIngresosGastos = () => {
  const context = useContext(FinanzaContext);
  const [datos, setDatos] = useState<Datos[]>([]);

  useEffect(() => {
    const data = [
      {
        nombre: 'Ingresos',
        total: sumarTotal(context?.ingresosMes || [])
      },
      {
        nombre: 'Gastos',
        total: sumarTotal(context?.gastosMes || [])
      }
    ];
    setDatos(data);
  }, [context?.ingresosMes, context?.gastosMes]);

  return (
    <div className="grid place-items-center" style={{ width: 200, height: 400 }}>
      <h1 className="m-2 text-center font-extralight">Ingresos por gastos mensual</h1>
      <ResponsiveContainer>
        <BarChart
          data={datos}
        >
          <XAxis dataKey="nombre" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="total" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}