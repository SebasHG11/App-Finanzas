import { FinanzaContext } from "@/context/FinanzaContext";
import { MouseEvent, useContext } from "react";

export const BtnCrearCategoriaIngresos = (): JSX.Element => {
  const context = useContext(FinanzaContext);

  const handleBtnAgregar = (e: MouseEvent<HTMLSpanElement, globalThis.MouseEvent>) => {
    e.preventDefault();
    context?.setOpenModalCatIngresos(true);
  }

  return (
    <span
      className="bg-yellow-500 rounded-md px-4 py-2 text-white cursor-pointer font-bold"
      onClick={handleBtnAgregar}
    >
      Agregar Categoria Para Ingresos
    </span>
  );
}