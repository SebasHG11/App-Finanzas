import { FinanzaContext } from "@/context/FinanzaContext";
import { deleteData } from "@/helpers/deleteData";
import { useContext, MouseEvent } from "react";
import { toast } from "sonner";

type Props = {
  ingreso: Ingreso
}

export const CardIngreso = ({ ingreso }: Props): JSX.Element => {
  const context = useContext(FinanzaContext);

  const handleEliminarIngreso = async () => {
    const url = `http://localhost:5216/v1/Ingreso/${ingreso.id}`;

    try {
      await deleteData(url);
      toast.success(`El ingreso ${ingreso.concepto} se elimino con exito`, { duration: 3000 })
      context?.setDeleteElement(true);
    } catch (error) {
      console.error(error);
      toast.error(`Error al intentar eliminar el ingreso ${ingreso.concepto}`, { duration: 3000 });
    }
  }

  const handleToastEliminarIng = (e: MouseEvent<HTMLSpanElement, globalThis.MouseEvent>) => {
    e.preventDefault();
    toast(`¿Estas seguro de eliminar ${ingreso.concepto}?`, {
      action: {
        label: 'Si',
        onClick: () => handleEliminarIngreso()
      },
    })
  }

  return (
    <div className="p-4 min-w-60 w-60 grid place-items-center border-2 bg-green-100 border-green-600 rounded-lg">
      <h4 className="font-semibold text-xl text-center">
        {ingreso.concepto}
      </h4>
      <p className="font-light">Monto</p>
      <p className="font-semibold text-lg">
        {context?.formatMonto(ingreso.monto)}$
      </p>
      <p className="roboto-condensed font-extralight">
        {context?.formatFecha(ingreso.fecha)}
      </p>
      <p className="font-bold text-green-800">
        {ingreso.categoria.nombre}
      </p>
      <div className="m-1 flex items-center justify-around gap-2">
        <span
          onClick={handleToastEliminarIng}
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