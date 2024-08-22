import { FinanzaContext } from "@/context/FinanzaContext";
import { useContext, MouseEvent } from "react";

export const BtnCrearIngreso = (): JSX.Element => {
  const context = useContext(FinanzaContext);

  const handleAgregar = (e: MouseEvent<HTMLSpanElement, globalThis.MouseEvent>) =>{
    e.preventDefault();
    context?.setOpenModalIngresos(true);
  }

  return (
    <span 
      onClick={handleAgregar}
      className="bg-yellow-500 rounded-md px-4 py-2 text-white cursor-pointer font-bold"
    >
      Agregar Ingreso
    </span>
  );
}