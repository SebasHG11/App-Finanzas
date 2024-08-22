import { createContext, Dispatch, SetStateAction, useState } from "react";

type Props ={
    children: React.ReactNode
}

type FinanzaContextType = {
    formatMonto: (amount: number) => string,
    formatFecha: (fecha: string) => string,
    formatDateUTC: (fecha: string) => string
}

export const FinanzaContext = createContext<FinanzaContextType | undefined>(undefined);

export const AppProvider: React.FC<Props> = ({ children }) =>{

    const formatMonto = (amount: number) => {
        if (typeof amount !== 'number' || isNaN(amount)) {
            return '0' // Valor predeterminado en caso de que amount no sea un número
        }
        return amount.toLocaleString('es-ES')
    }

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

    const formatDateUTC = (dateString: string): string => {
        const date = new Date(dateString);
        
        // Obtén las partes de la fecha
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Meses empiezan en 0
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
        const milliseconds = String(date.getMilliseconds()).padStart(6, '0'); // Milisegundos
      
        // Construye la fecha en el formato deseado
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${milliseconds}`;
      };

    return(
        <FinanzaContext.Provider value={{
            formatMonto,
            formatFecha,
            formatDateUTC
        }}>
            {children}
        </FinanzaContext.Provider>
    );
}