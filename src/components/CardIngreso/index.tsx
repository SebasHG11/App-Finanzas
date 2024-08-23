import { FinanzaContext } from "@/context/FinanzaContext";
import { useContext } from "react";

type Props = {
    ingreso: Ingreso
}

export const CardIngreso = ({ ingreso }: Props): JSX.Element => {
    const context = useContext(FinanzaContext);

    return(
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
        </div>
    );
}