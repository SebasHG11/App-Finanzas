import { FinanzaContext } from '@/context/FinanzaContext';
import React, { useContext, useEffect, useState } from 'react';
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

type Categoria = {
  nombre: string,
  gastoTotal: number
}

export const GraficoCatGastos: React.FC = () => {
  const context = useContext(FinanzaContext);

  const [categoriaGastos, setCategoriaGastos] = useState<Categoria[] | undefined>();

  useEffect(() => {
    if (context?.gastosMes && context?.categoriasGasto) {
      
      const totalPorCategoria = context.gastosMes.reduce((acc: Record<number, number>, gasto) => {
        if (!acc[gasto.categoriaId]) {
          acc[gasto.categoriaId] = 0;
        }
        acc[gasto.categoriaId] += gasto.monto;
        return acc;
      }, {});

      const categoriaGastosArray = Object.keys(totalPorCategoria).map(categoriaId => {
        const id = Number(categoriaId);
        const categoria = context.categoriasGasto?.find(cat => cat.id === id);
        return {
          nombre: categoria?.nombre || 'Desconocido',
          gastoTotal: totalPorCategoria[id]
        };
      });

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
          <Tooltip />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
