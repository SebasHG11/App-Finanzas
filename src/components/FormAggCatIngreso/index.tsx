import { useForm } from "@/helpers/useForm";
import { FormEvent } from "react";

export const FormAggCatIngreso = (): JSX.Element => {
  const initialState = {
    nombre: "",
    presupuesto: "0"
  };

  const { formState, onInputChange, resetForm } = useForm(initialState);

  const { nombre, presupuesto } = formState;

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const payload = {
      nombre: nombre,
      presupuesto: presupuesto
    }
    console.log(payload);
    resetForm();
  }

  return (
    <div className="w-full">
      <form className="w-full" onSubmit={onSubmit}>
        <div className="flex flex-col items-start w-1/2 mx-auto">
          <label className="text-start" htmlFor="nombre">Nombre</label>
          <input className="m-2 w-full border-2 border-gray-300 px-4 py-2 bg-blue-100" type="text" name="nombre" onChange={onInputChange} />
        </div>
        <div className="flex flex-col items-start w-1/2 mx-auto">
          <label className="text-start" htmlFor="presupuesto">Presupuesto</label>
          <input className="m-2 w-full border-2 border-gray-300 px-4 py-2 bg-blue-100" type="text" name="presupuesto" onChange={onInputChange} />
        </div>
        <div className="flex justify-center w-full">
          <input className="m-4 px-6 py-2 bg-blue-500 text-white font-bold rounded-lg" type="submit" value="Enviar" />
        </div>
      </form>
    </div>

  );
}