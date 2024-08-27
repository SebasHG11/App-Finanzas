import { FinanzaContext } from "@/context/FinanzaContext";
import { extraerAnio } from "@/helpers/extraerAnio";
import { extraerMes } from "@/helpers/extraerMes";
import { sumarTotal } from "@/helpers/sumarTotal";
import { useContext, useEffect, useState } from "react";
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

type MesesAño = {
  nombre: string,
  ingresos: number,
  gastos: number
}

export const GraficoIngGasPorAnio = () => {
  const context = useContext(FinanzaContext);
  const [añoActual, setAñoActual] = useState<number>();
  const [datosAño, setDatosAño] = useState<MesesAño[]>();

  const filtrarDatosPorMes = (mes: number) => {
    const ingresos = context?.allIngresos?.filter(
      (i) => extraerAnio(i.fecha) === context.año && extraerMes(i.fecha) === mes
    );
    const gastos = context?.allGastos?.filter(
      (g) => extraerAnio(g.fecha) === context.año && extraerMes(g.fecha) === mes
    );

    return {
      ingresos: sumarTotal(ingresos || []),
      gastos: sumarTotal(gastos || [])
    }
  }
  
  useEffect(() => {
    setAñoActual(context?.año);

    const meses = [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre",
    ];

    const data: MesesAño[] = meses.map((nombre, index) =>({
      nombre,
      ...filtrarDatosPorMes(index + 1)
    }));

    setDatosAño(data);
  },[context?.año, context?.allIngresos, context?.allGastos]);

  return(
    <div className="grid items-center" style={{ width: "100%", height: 320 }}>
      <h1 className="m-3 text-center text-2xl font-extralight">Resumen año {añoActual}</h1>
      <ResponsiveContainer>
        <BarChart
          data={datosAño}
        >
        <XAxis dataKey="nombre" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="ingresos" fill="#82ca9d" />
        <Bar dataKey="gastos" fill="#FF6F6F" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}