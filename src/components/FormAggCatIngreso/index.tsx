import { FinanzaContext } from "@/context/FinanzaContext";
import { postData } from "@/helpers/postData";
import { useForm } from "@/helpers/useForm";
import { FormEvent, MouseEvent, useContext } from "react";
import { toast } from "sonner";

type CategoriaIngresoPayload = {
  nombre: string,
  presupuesto: number
}

export const FormAggCatIngreso = (): JSX.Element => {
  const context = useContext(FinanzaContext);

  const initialState = {
    nombre: "",
    presupuesto: "0"
  };

  const { formState, onInputChange, resetForm } = useForm(initialState);

  const { nombre, presupuesto } = formState;

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const url = "http://localhost:5216/v1/Categoria/Ingresos";
    const payload: CategoriaIngresoPayload = {
      nombre: nombre,
      presupuesto: parseFloat(presupuesto)
    };
    
    try{
      const response = await postData<CategoriaIngresoPayload, Category>(url, payload)
      resetForm();
      context?.setOpenModalCatIngresos(false);
      toast.success(`¡La categoria de ingreso ${response.nombre} se agrego con exito!`);
    } catch(error) {
      console.error("Error al crear la categoría:", error);
    }
  }

  const handleCancelar = (e: MouseEvent<HTMLSpanElement, globalThis.MouseEvent>) => {
    e.preventDefault();
    context?.setOpenModalCatIngresos(false);
  }

  return (
    <div className="w-full">
      <div className="flex justify-center">
        <h1 className="text-3xl font-bold text-white">Categoria Ingresos</h1>
      </div>
      <form className="w-full" onSubmit={onSubmit}>
        <div className="flex flex-col items-start w-1/2 mx-auto">
          <label className="text-white text-start" htmlFor="nombre">Nombre</label>
          <input 
            className="m-2 w-full border-2 border-gray-300 px-4 py-2 bg-blue-100" 
            type="text" 
            name="nombre" onChange={onInputChange}
            value={nombre} 
          />
        </div>
        <div className="flex flex-col items-start w-1/2 mx-auto">
          <label className="text-white text-start" htmlFor="presupuesto">Presupuesto</label>
          <input 
            className="m-2 w-full border-2 border-gray-300 px-4 py-2 bg-blue-100" 
            type="text" 
            name="presupuesto" 
            onChange={onInputChange} 
            value={presupuesto}
          />
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