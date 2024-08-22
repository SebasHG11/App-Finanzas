import { FinanzaContext } from "@/context/FinanzaContext";
import { fetchData } from "@/helpers/fetchData";
import { useForm } from "@/helpers/useForm";
import { FormEvent, useContext, useEffect, useState } from "react";

export const FormAggGasto = (): JSX.Element => {
  const context = useContext(FinanzaContext);

  const [categoriasGasto, setCategoriasGasto] = useState<Category[]>([]);

  const initialState = {
    concepto: "",
    monto: "0",
    fecha: "",
    categoriaId: 0
  };

  const { formState, setFormState, onInputChange, resetForm } = useForm(initialState);

  const { data, error, loading } = fetchData<Category[]>("http://localhost:5216/v1/Categoria");

  if (error) {
    console.log(error);
  }

  useEffect(() => {
    if (data) {
      const filterCategorias = data.filter(d => d.tipo === "Gastos");
      setCategoriasGasto(filterCategorias);

      if (filterCategorias.length > 0) {
        setFormState({
          ...formState,
          categoriaId: filterCategorias[0].id
        });
      }
    }
  }, [data]);

  const { concepto, monto, fecha, categoriaId } = formState;

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const payload = {
      concepto: concepto,
      monto: parseFloat(monto),
      fecha: context?.formatDateUTC(fecha),
      categoriaId: categoriaId
    };
    console.log(payload);
    resetForm();
  }

  return (
    <div className="w-full">
      <form onSubmit={onSubmit} className="w-full">
        <div className="flex flex-col items-start w-1/2 mx-auto">
          <label htmlFor="concepto">Concepto</label>
          <input
            className="m-2 w-full border-2 border-gray-300 px-4 py-2 bg-blue-100"
            type="text"
            name="concepto"
            onChange={onInputChange}
            value={concepto}
          />
        </div>
        <div className="flex flex-col items-start w-1/2 mx-auto">
          <label htmlFor="monto">Monto</label>
          <input
            className="m-2 w-full border-2 border-gray-300 px-4 py-2 bg-blue-100"
            type="text"
            name="monto"
            onChange={onInputChange}
            value={monto}
          />
        </div>
        <div className="flex flex-col items-start w-1/2 mx-auto">
          <label htmlFor="fecha">Fecha</label>
          <input
            className="m-2 w-full border-2 border-gray-300 px-4 py-2 bg-blue-100"
            type="datetime-local"
            name="fecha"
            onChange={onInputChange}
            value={fecha}
          />
        </div>
        <div className="flex flex-col items-start w-1/2 mx-auto">
          <label htmlFor="categoriaId">Categoria</label>
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
            value="Enviar" 
          />
        </div>
      </form>
    </div>
  );
}