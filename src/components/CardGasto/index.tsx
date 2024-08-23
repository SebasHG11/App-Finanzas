import { FinanzaContext } from "@/context/FinanzaContext";
import { deleteData } from "@/helpers/deleteData";
import { useContext, MouseEvent } from "react";
import { toast } from "sonner";

type Props = {
  gasto: Gasto
}

export const CardGasto = ({ gasto }: Props): JSX.Element => {
  const context = useContext(FinanzaContext);

  const handleEliminarGasto = async () => {
    const url = `http://localhost:5216/v1/Gasto/${gasto.id}`;

    try {
      await deleteData(url);
      toast.success(`El gasto ${gasto.concepto} se elimino con exito`, { duration: 3000 });
      context?.setDeleteElement(true);
    } catch (error) {
      console.error(error);
      toast.error(`Error al intentar eliminar el gasto ${gasto.concepto}`, { duration: 3000 })
    }
  }

  const handleToastEliminarGas = (e: MouseEvent<HTMLSpanElement, globalThis.MouseEvent>) => {
    e.preventDefault();
    toast(`¿Estas seguro de eliminar ${gasto.concepto}?`, {
      action: {
        label: 'Si',
        onClick: () => handleEliminarGasto()
      },
    })
  }

  return (
    <div className="p-4 min-w-60 w-60 grid place-items-center border-2 bg-red-100 border-red-600 rounded-lg">
      <h4 className="font-semibold text-xl text-center">
        {gasto.concepto}
      </h4>
      <p className="font-light">Monto</p>
      <p className="font-semibold text-lg">
        {context?.formatMonto(gasto.monto)}$
      </p>
      <p className="roboto-condensed font-extralight">
        {context?.formatFecha(gasto.fecha)}
      </p>
      <p className="font-bold text-red-800">
        {gasto.categoria.nombre}
      </p>
      <div className="m-1 flex items-center justify-around gap-2">
        <span
          onClick={handleToastEliminarGas}
          className="bg-red-500 text-white font-bold px-2 py-1 rounded-lg cursor-pointer"
        >
          Eliminar
        </span>
        <span className="bg-yellow-400 text-white font-bold px-2 py-1 rounded-lg cursor-pointer">
          Editar
        </span>
      </div>
    </div>
  );
}