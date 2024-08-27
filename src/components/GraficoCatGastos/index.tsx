import { FinanzaContext } from '@/context/FinanzaContext';
import { tomarTotalPorCategoria } from '@/helpers/tomarTotalPorCategoria';
import React, { useContext, useEffect, useState } from 'react';
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

type Categoria = {
  nombre: string,
  gastoTotal: number,
  presupuesto: number
}

export const GraficoCatGastos: React.FC = () => {
  const context = useContext(FinanzaContext);

  const [categoriaGastos, setCategoriaGastos] = useState<Categoria[] | undefined>();

  useEffect(() => {
    if (context?.gastosMes && context?.categoriasGasto) {
      const totalCategoriaMes = tomarTotalPorCategoria(context.gastosMes || []);

      const categoriaGastosArray = totalCategoriaMes.map(e =>({
        nombre: context.categoriasGasto?.find(cat => cat.id === e.categoriaId)?.nombre || "Desconocido",
        gastoTotal: e.total,
        presupuesto: context.categoriasGasto?.find(cat => cat.id === e.categoriaId)?.presupuesto || 0
      }))

      setCategoriaGastos(categoriaGastosArray);
    }
  }, [context?.gastosMes, context?.categoriasGasto]);

  return (
    <div className="grid place-items-center" style={{ width: 400, height: 300 }}>
      <h1 className="m-2 text-center font-extralight">Gastos por categoria</h1>
      <ResponsiveContainer>
        <BarChart
          data={categoriaGastos}
        >
          <XAxis dataKey="nombre" />
          <YAxis />
          <Tooltip />
          <Bar
            dataKey="gastoTotal"
            fill="#FF6F6F"
          />
          <Bar 
            dataKey="presupuesto"
            fill="#87CEEB"
          />
          <Tooltip />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};