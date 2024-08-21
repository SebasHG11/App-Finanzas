import { FinanzaContext } from "@/context/FinanzaContext";
import { useContext } from "react";

type Props = {
    ingreso: Ingreso
}

export const CardIngreso = ({ ingreso }: Props): JSX.Element => {
    const context = useContext(FinanzaContext);

    return(
        <div className="p-4 w-60 grid place-items-center border-2 border-green-600 rounded-lg">
            <h4 className="font-semibold text-xl text-center">
                {ingreso.concepto}
            </h4>
            <p className="font-light">Monto</p>
            <p>
                {context?.formatMonto(ingreso.monto)}$    
            </p>
            <p className="font-extralight">
                {context?.formatFecha(ingreso.fecha)}
            </p>
            <p className="font-bold text-green-800">
                {ingreso.categoria.nombre}
            </p>
        </div>
    );
}