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
  setDeleteElement: Dispatch<SetStateAction<boolean>>,
  openModalEditCat: boolean,
  setOpenModalEditCat: Dispatch<SetStateAction<boolean>>,
  openModalEditIngreso: boolean,
  setOpenModalEditIngreso: Dispatch<SetStateAction<boolean>>,
  openModalEditGasto: boolean,
  setOpenModalEditGasto: Dispatch<SetStateAction<boolean>>,
  categoriaEdit: Category | undefined,
  setCategoriaEdit: Dispatch<SetStateAction<Category | undefined>>,
  ingresoEdit: Ingreso | undefined,
  setIngresoEdit: Dispatch<SetStateAction<Ingreso | undefined>>,
  gastoEdit: Gasto | undefined,
  setGastoEdit: Dispatch<SetStateAction<Gasto | undefined>>,
  editElement: boolean,
  setEditElement: Dispatch<SetStateAction<boolean>>,
  mes: number,
  setMes: Dispatch<SetStateAction<number>>,
  año: number,
  setAño: Dispatch<SetStateAction<number>>
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
  
    const date = new Date(fecha);
    
    // Validar si la fecha es válida
    if (isNaN(date.getTime())) {
      return 'Fecha inválida';
    }
  
    // Formatear la fecha directamente en la zona horaria de Bogotá
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
    const timeOffsetInMinutes = date.getTimezoneOffset();
    date.setMinutes(date.getMinutes() - timeOffsetInMinutes);
    return date.toISOString();
  };
  
  
  const [openModalCatIngresos, setOpenModalCatIngresos] = useState<boolean>(false);
  const [openModalCatGastos, setOpenModalCatGastos] = useState<boolean>(false);
  const [openModalIngresos, setOpenModalIngresos] = useState<boolean>(false);
  const [openModalGastos, setOpenModalGastos] = useState<boolean>(false);

  const [deleteElement, setDeleteElement] = useState<boolean>(false);

  const [openModalEditCat, setOpenModalEditCat] = useState<boolean>(false);
  const [openModalEditIngreso, setOpenModalEditIngreso] = useState<boolean>(false);
  const [openModalEditGasto, setOpenModalEditGasto] = useState<boolean>(false);

  const [categoriaEdit, setCategoriaEdit] = useState<Category>();
  const [ingresoEdit, setIngresoEdit] = useState<Ingreso>();
  const [gastoEdit, setGastoEdit] = useState<Gasto>();

  const [editElement, setEditElement] = useState<boolean>(false);

  const [mes, setMes] = useState<number>(0);
  const [año, setAño] = useState<number>(0);

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
      setDeleteElement,
      openModalEditCat,
      setOpenModalEditCat,
      openModalEditIngreso,
      setOpenModalEditIngreso,
      openModalEditGasto,
      setOpenModalEditGasto,
      categoriaEdit,
      setCategoriaEdit,
      ingresoEdit,
      setIngresoEdit,
      gastoEdit,
      setGastoEdit,
      editElement,
      setEditElement,
      mes,
      setMes,
      año,
      setAño
    }}>
      {children}
    </FinanzaContext.Provider>
  );
}