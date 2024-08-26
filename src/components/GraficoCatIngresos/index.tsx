import { FinanzaContext } from "@/context/FinanzaContext";
import { tomarTotalPorCategoria } from "@/helpers/tomarTotalPorCategoria";
import { useContext, useEffect, useState } from "react";
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

type Categoria = {
  nombre: string,
  gastoTotal: number
}

export const GraficoCatIngresos = () => {
  const context = useContext(FinanzaContext);
  const [categoriasIngreso, setCategoriasIngreso] = useState<Categoria[]>([]);

  useEffect(() => {
    const totalCategoriaMes = tomarTotalPorCategoria(context?.ingresosMes || []);

    const categoriaIngresosArray = totalCategoriaMes.map(a =>({
      nombre: context?.categoriasIngreso?.find(cat => cat.id === a.categoriaId)?.nombre || "Desconocido",
      gastoTotal: a.total
    }));

    setCategoriasIngreso(categoriaIngresosArray);
    console.log(categoriasIngreso);
  }, [context?.categoriasIngreso, context?.ingresosMes]);

  return (
    <div className="grid items-center" style={{ width: 400, height: 320 }}>
      <h1 className="m-2 text-center font-extralight">Ingresos por categoria</h1>
      <ResponsiveContainer>
        <BarChart data={categoriasIngreso}>
          <XAxis dataKey="nombre" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="gastoTotal" fill="#77DD77" />
        </BarChart>
      </ResponsiveContainer>
    </div>

  );
}