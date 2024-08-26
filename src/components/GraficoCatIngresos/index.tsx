import { FinanzaContext } from "@/context/FinanzaContext";
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
    const totalPorCategoria = context?.ingresosMes?.reduce((acc: Record<number, number>, ingreso) => {
      if (!acc[ingreso.categoriaId]) {
        acc[ingreso.categoriaId] = 0;
      }
      acc[ingreso.categoriaId] += ingreso.monto;
      return acc;
    }, {}) || {}

    const categoriaIngresosArray = Object.keys(totalPorCategoria || {}).map(categoriaId => {
      const id = Number(categoriaId);
      const categoria = context?.categoriasIngreso?.find(cat => cat.id === id);
      return {
        nombre: categoria?.nombre || "Desconocido",
        gastoTotal: totalPorCategoria[id]
      };
    })

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