import { createContext } from "react";

type Props ={
    children: React.ReactNode
}

type FinanzaContextType = {
    formatMonto: (amount: number) => string
}

export const FinanzaContext = createContext<FinanzaContextType | undefined>(undefined);

export const AppProvider: React.FC<Props> = ({ children }) =>{

    const formatMonto = (amount: number) => {
        if (typeof amount !== 'number' || isNaN(amount)) {
            return '0' // Valor predeterminado en caso de que amount no sea un número
        }
        return amount.toLocaleString('es-ES')
    }

    return(
        <FinanzaContext.Provider value={{
            formatMonto
        }}>
            {children}
        </FinanzaContext.Provider>
    );
}