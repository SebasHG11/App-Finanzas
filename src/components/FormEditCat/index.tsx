import { FinanzaContext } from "@/context/FinanzaContext";
import { useForm } from "@/helpers/useForm";
import { FormEvent, useContext, MouseEvent } from "react";

type CategoriaPayload = {
  nombre: string | undefined;
  presupuesto: number | undefined;
};

export const FormEditCat = (): JSX.Element => {
  const context = useContext(FinanzaContext);

  const initialState = {
    nombre: context?.categoriaEdit?.nombre,
    presupuesto: context?.categoriaEdit?.presupuesto
  };

  const { formState, onInputChange, resetForm } = useForm(initialState);

  const { nombre, presupuesto } = formState;

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const envio: CategoriaPayload = {
      nombre: nombre,
      presupuesto: presupuesto
    }
  }

  const handleCancelar = (e: MouseEvent<HTMLSpanElement, globalThis.MouseEvent>) => {
    e.preventDefault();
    context?.setOpenModalEditCat(false);
  }

  return (
    <div className="w-full">
      <div className="flex justify-center">
        <h1 className="text-3xl font-bold text-white">Categoria</h1>
      </div>
      <form onSubmit={onSubmit} className="w-full">
        <div className="flex flex-col items-start w-1/2 mx-auto">
          <label className="text-white text-start" htmlFor="nombre">Nombre</label>
          <input
            className="m-2 w-full border-2 border-gray-300 bg-blue-100 px-4 py-2"
            type="text"
            name="nombre"
            onChange={onInputChange}
            value={nombre}
          />
        </div>
        <div className="flex flex-col items-start w-1/2 mx-auto">
          <label className="text-white text-start" htmlFor="presupuesto">Presupuesto</label>
          <input
            className="m-2 w-full border-2 border-gray-300 bg-blue-100 px-4 py-2"
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