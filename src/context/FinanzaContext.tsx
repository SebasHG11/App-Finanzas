import { createContext, Dispatch, SetStateAction, useState } from "react";

type Props = {
  children: React.ReactNode
}

type FinanzaContextType = {
  formatMonto: (amount: number) => string,
  formatFecha: (fecha: string) => string,
  formatDateUTC: (fecha: string) => string,
  openModalCatIngresos: boolean,
  setOpenModalCatIngresos: Dispatch<SetStateAction<boolean>>,
  openModalCatGastos: boolean,
  setOpenModalCatGastos: Dispatch<SetStateAction<boolean>>,
  openModalIngresos: boolean,
  setOpenModalIngresos: Dispatch<SetStateAction<boolean>>,
  openModalGastos: boolean,
  setOpenModalGastos: Dispatch<SetStateAction<boolean>>,
  deleteElement: boolean,
  setDeleteElement: Dispatch<SetStateAction<boolean>>
}

export const FinanzaContext = createContext<FinanzaContextType | undefined>(undefined);

export const AppProvider: React.FC<Props> = ({ children }) => {

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
  
    let date = new Date(fecha);
  
    // Restar 5 horas a la fecha
    date = new Date(date.getTime() - 5 * 60 * 60 * 1000);
  
    // Formatear la fecha como 'DD/MM/YYYY HH:mm' en la zona horaria de Bogotá
    const options: Intl.DateTimeFormatOptions = {
      timeZone: 'America/Bogota',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    };
  
    const formattedDate = date.toLocaleString('es-CO', options);
  
    return formattedDate.replace(',', '');
  };
  
  const formatDateUTC = (fecha: string): string => {
    const date = new Date(fecha);
  
    // Obtener componentes de la fecha en UTC
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const day = String(date.getUTCDate()).padStart(2, '0');
    const hours = String(date.getUTCHours()).padStart(2, '0');
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');
    const seconds = String(date.getUTCSeconds()).padStart(2, '0');
    const milliseconds = String(date.getUTCMilliseconds()).padStart(3, '0');
  
    // Formato ISO 8601 en UTC
    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}Z`;
  };
  
  const [openModalCatIngresos, setOpenModalCatIngresos] = useState<boolean>(false);
  const [openModalCatGastos, setOpenModalCatGastos] = useState<boolean>(false);
  const [openModalIngresos, setOpenModalIngresos] = useState<boolean>(false);
  const [openModalGastos, setOpenModalGastos] = useState<boolean>(false);

  const [deleteElement, setDeleteElement] = useState<boolean>(false);

  return (
    <FinanzaContext.Provider value={{
      formatMonto,
      formatFecha,
      formatDateUTC,
      openModalCatIngresos,
      setOpenModalCatIngresos,
      openModalCatGastos,
      setOpenModalCatGastos,
      openModalIngresos,
      setOpenModalIngresos,
      openModalGastos,
      setOpenModalGastos,
      deleteElement,
      setDeleteElement
    }}>
      {children}
    </FinanzaContext.Provider>
  );
}