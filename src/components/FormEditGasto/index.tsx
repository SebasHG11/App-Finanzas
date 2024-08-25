import { FinanzaContext } from "@/context/FinanzaContext";
import { fetchData } from "@/helpers/fetchData";
import { putData } from "@/helpers/putData";
import { useForm } from "@/helpers/useForm";
import { FormEvent, MouseEvent, useContext, useEffect, useState } from "react";
import { toast } from "sonner";

type GastoPayload = {
  concepto: string | undefined,
  monto: number | undefined,
  fecha: string | undefined,
  categoriaId: number | undefined
};

export const FormEditGasto = (): JSX.Element => {
  const context = useContext(FinanzaContext);
  const [categoriasGasto, setCategoriasGasto] = useState<Category[]>([]);

  const { data, error, loading } = fetchData<Category[]>("http://localhost:5216/v1/Categoria", false);

  if (error) {
    console.log(error);
  }

  useEffect(() => {
    if (data) {
      const filterCategorias = data.filter(d => d.tipo === "Gastos");
      setCategoriasGasto(filterCategorias);
    }
  }, [data]);

  const initialState: GastoPayload = {
    concepto: context?.gastoEdit?.concepto,
    monto: context?.gastoEdit?.monto,
    fecha: context?.gastoEdit?.fecha,
    categoriaId: context?.gastoEdit?.categoriaId
  };

  const { formState, onInputChange, resetForm } = useForm(initialState);

  const { concepto, monto, fecha, categoriaId } = formState;

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!context?.gastoEdit?.id) {
      toast.error("ID de gasto no disponible", { duration: 3000 });
      return;
    }

    const url = `http://localhost:5216/v1/Gasto/${context?.gastoEdit?.id}`;
    const envio: GastoPayload = {
      concepto: concepto,
      monto: monto,
      fecha: context.formatDateUTC(fecha || ""),
      categoriaId: categoriaId
    }

    try {
      await putData(url, envio);
      context.setEditElement(true);
    } catch {
      toast.error("Error al enviar los datos", { duration: 3000 });
    }

    context.setOpenModalEditGasto(false);
  }

  const handleCancelar = (e: MouseEvent<HTMLSpanElement, globalThis.MouseEvent>) => {
    e.preventDefault();
    context?.setOpenModalEditGasto(false);
  }

  return (
    <div className="w-full">
      <div className="flex justify-center">
        <h1 className="text-3xl font-bold text-white">Gastos</h1>
      </div>
      <form onSubmit={onSubmit} className="w-full">
        <div className="flex flex-col items-start w-1/2 mx-auto">
          <label className="text-white" htmlFor="concepto">Concepto</label>
          <input
            className="m-2 w-full border-2 border-gray-300 px-4 py-2 bg-blue-100"
            type="text"
            name="concepto"
            onChange={onInputChange}
            value={concepto}
          />
        </div>
        <div className="flex flex-col items-start w-1/2 mx-auto">
          <label className="text-white" htmlFor="monto">Monto</label>
          <input
            className="m-2 w-full border-2 border-gray-300 px-4 py-2 bg-blue-100"
            type="text"
            name="monto"
            onChange={onInputChange}
            value={monto}
          />
        </div>
        <div className="flex flex-col items-start w-1/2 mx-auto">
          <label className="text-white" htmlFor="fecha">Fecha</label>
          <input
            className="m-2 w-full border-2 border-gray-300 px-4 py-2 bg-blue-100"
            type="datetime-local"
            name="fecha"
            onChange={onInputChange}
            value={fecha}
          />
        </div>
        <div className="flex flex-col items-start w-1/2 mx-auto">
          <label className="text-white" htmlFor="categoriaId">Categoria</label>
          <select
            className="m-2 w-full border-2 border-gray-300 px-4 py-2 bg-blue-100"
            name="categoriaId"
            onChange={onInputChange}
            value={categoriaId}
          >
            {categoriasGasto &&
              categoriasGasto.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.nombre}</option>
              ))
            }
          </select>
        </div>
        <div className="flex justify-center w-full">
          <input 
            className="m-4 px-6 py-2 bg-blue-500 text-white font-bold rounded-lg cursor-pointer"
            type="submit" 
            value="Editar" 
          />
        </div>
      </form>
      <div className="grid place-items-center">
        <span 
          onClick={handleCancelar}
          className="px-6 py-2 bg-red-600 text-white font-bold rounded-lg cursor-pointer"
        >
          Cancelar
        </span>
      </div>
    </div>
  );
}