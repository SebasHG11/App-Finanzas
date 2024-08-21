import { createContext, Dispatch, SetStateAction, useState } from "react";

type Props ={
    children: React.ReactNode
}

type FinanzaContextType = {
    formatMonto: (amount: number) => string, 
    useTotalIngresos: number,
    setUseTotalIngresos: Dispatch<SetStateAction<number>>,
    formatFecha: (fecha: string) => string
}

export const FinanzaContext = createContext<FinanzaContextType | undefined>(undefined);

export const AppProvider: React.FC<Props> = ({ children }) =>{

    const formatMonto = (amount: number) => {
        if (typeof amount !== 'number' || isNaN(amount)) {
            return '0' // Valor predeterminado en caso de que amount no sea un número
        }
        return amount.toLocaleString('es-ES')
    }

    const [useTotalIngresos, setUseTotalIngresos] = useState<number>(0);

    const formatFecha = (fecha: string): string => {
        if (!fecha) {
            return 'Fecha inválida';
        }
        
        const date = new Date(fecha);
    
        // Verificar si la fecha es válida
        if (isNaN(date.getTime())) {
            return 'Formato de fecha inválido';
        }
    
        // Obtener componentes de la fecha
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
    
        // Formatear la fecha como 'DD/MM/YYYY HH:mm'
        return `${day}/${month}/${year} ${hours}:${minutes}`;
    };

    return(
        <FinanzaContext.Provider value={{
            formatMonto,
            useTotalIngresos,
            setUseTotalIngresos,
            formatFecha
        }}>
            {children}
        </FinanzaContext.Provider>
    );
}