import { FinanzaContext } from "@/context/FinanzaContext";
import { fetchData } from "@/helpers/fetchData";
import { postData } from "@/helpers/postData";
import { useForm } from "@/helpers/useForm";
import { FormEvent, useContext, useEffect, useState, MouseEvent } from "react";
import { toast } from "sonner";

type IngresoPayload = {
  concepto: string,
  monto: number,
  fecha: string,
  categoriaId: number
};

export const FormAggIngreso = (): JSX.Element => {
  const context = useContext(FinanzaContext);

  const [categoriasIngreso, setCategoriasIngreso] = useState<Category[]>([]);

  const { data, error, loading } = fetchData<Category[]>("http://localhost:5216/v1/Categoria", false);

  if (error) {
    console.log(error);
  }

  const initialState = {
    concepto: "",
    monto: "0",
    fecha: "",
    categoriaId: 0
  };

  const { formState, setFormState, onInputChange, resetForm } = useForm(initialState);

  useEffect(() => {
    if (data) {
      const filterCategorias = data.filter(d => d.tipo === "Ingresos");
      setCategoriasIngreso(filterCategorias);

      if (filterCategorias.length > 0) {
        setFormState({
          ...formState,
          categoriaId: filterCategorias[0].id
        });
      }
    }
  }, [data]);

  const { concepto, monto, fecha, categoriaId } = formState;

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const url = "http://localhost:5216/v1/Ingreso";

    const payload: IngresoPayload = {
      concepto: concepto,
      monto: parseFloat(monto),
      fecha: context?.formatDateUTC(fecha) ?? new Date().toISOString(),
      categoriaId: categoriaId
    };
    try{
      const response = await postData<IngresoPayload, Ingreso>(url, payload);
      resetForm();
      context?.setOpenModalIngresos(false);
      toast.success(`¡El ingreso ${response.concepto} se agrego con exito!`);
    } catch(error) {
      console.error("Error al crear la categoría:", error);
    }
  }

  const handleCancelar = (e: MouseEvent<HTMLSpanElement, globalThis.MouseEvent>) => {
    e.preventDefault();
    context?.setOpenModalIngresos(false);
  }

  return (
    <div className="w-full">
      <div className="flex justify-center">
        <h1 className="text-3xl font-bold text-white">Ingresos</h1>
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
            {categoriasIngreso &&
              categoriasIngreso.map(cat => (
                <option
                  key={cat.id}
                  value={cat.id}>
                  {cat.nombre}
                </option>
              ))
            }
          </select>
        </div>
        <div className="flex justify-center w-full">
          <input
            className="m-4 px-6 py-2 bg-blue-500 text-white font-bold rounded-lg cursor-pointer"
            type="submit"
            value="Enviar"
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