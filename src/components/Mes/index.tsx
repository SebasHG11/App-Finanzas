import { FinanzaContext } from "@/context/FinanzaContext";
import { useContext } from "react";

export const Mes = (): JSX.Element => {
  const context = useContext(FinanzaContext);

  const meses = [
    { numero: 1, nombre: 'Enero' },
    { numero: 2, nombre: 'Febrero' },
    { numero: 3, nombre: 'Marzo' },
    { numero: 4, nombre: 'Abril' },
    { numero: 5, nombre: 'Mayo' },
    { numero: 6, nombre: 'Junio' },
    { numero: 7, nombre: 'Julio' },
    { numero: 8, nombre: 'Agosto' },
    { numero: 9, nombre: 'Septiembre' },
    { numero: 10, nombre: 'Octubre' },
    { numero: 11, nombre: 'Noviembre' },
    { numero: 12, nombre: 'Diciembre' }
];

  const años = Array.from({ length: 26 }, (_, i) => `${2024 + i}`);

  return (
    <div className="flex items-center justify-around gap-4">
      <div className="flex flex-col items-center">
        <label htmlFor="mes">Mes</label>
        <select
          className="text-gray-800 font-semibold text-2xl text-center"
          name="mes"
          onChange={(e) => context?.setMes(parseInt(e.target.value))}
          value={context?.mes}
        >
          <option value="0">Selecciona un mes</option>
          {meses.map(mes => (
            <option key={mes.numero} value={mes.numero}>
              {mes.nombre}
            </option>
          ))
          }
        </select>
      </div>
      <div className="flex flex-col items-center">
        <label htmlFor="año">Año</label>
        <select
          className="text-gray-800 font-semibold text-2xl text-center"
          name="año"
        >
          <option value="">Selecciona una año</option>
          {años.map((año, index) => (
            <option key={index} value={año}>{año}</option>
          ))
          }
        </select>
      </div>
    </div>
  );
}