import { createContext } from "vm";

type Props ={
    children: React.ReactNode
}

export const FinanzaContext = createContext();

export const AppProvider = ({ children }: Props) =>{

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