import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AppProvider, FinanzaContext } from "@/context/FinanzaContext";
import { Saldo } from "@/components/Saldo";
import { TotalIngresos } from "@/components/TotalIngresos";
import { TotalGastos } from "@/components/TotalGastos";
import { BtnCrearCategoriaIngresos } from "@/components/BtnCrearCategoriaIngresos";
import { BtnCrearCategoriaGastos } from "@/components/BtnCrearCategoriaGastos";
import { BtnCrearIngreso } from "@/components/BtnCrearIngreso";
import { BtnCrearGasto } from "@/components/BtnCrearGasto";
import { Mes } from "@/components/Mes";
import { ContenedorOperaciones } from "@/components/ContenedorOperaciones";
import { CardCategoria } from "@/components/CardCategoria";
import { CardIngreso } from "@/components/CardIngreso";
import { CardGasto } from "@/components/CardGasto";
import { sumarTotal } from "@/helpers/sumarTotal";
import { FormAggCatIngreso } from "@/components/FormAggCatIngreso";

export default function Home() {
  const context = useContext(FinanzaContext);

  const [categorias, setCategorias] = useState<Category[]>([]);
  const [ingresos, setIngresos] = useState<Ingreso[]>([]);
  const [gastos, setGastos] = useState<Gasto[]>([]);

  const [sumaTotalIngresos, setSumaTotalIngresos] = useState<number>(0);
  const [sumaTotalGastos, setSumaTotalGastos] = useState<number>(0);

  const getCategorias = async() =>{
    try{
      const response = await axios.get<Category[]>("http://localhost:5216/v1/Categoria");
      setCategorias(response.data);
    }catch(error){
      console.log(error);
    }
  }

  const getIngresos = async() =>{
    try{
      const response = await axios.get<Ingreso[]>("http://localhost:5216/v1/Ingreso");
      setIngresos(response.data);
    } catch(error) {
      console.log(error);
    }
  }

  const getGastos = async() =>{
    try{
      const response = await axios.get<Gasto[]>("http://localhost:5216/v1/Gasto");
      setGastos(response.data);
    }catch(error) {
      console.log(error);
    }
  }

  useEffect(() =>{
    getCategorias();
    getIngresos();
    getGastos();
  }, []);

  useEffect(() =>{
    setSumaTotalIngresos(sumarTotal(ingresos));
    setSumaTotalGastos(sumarTotal(gastos));
  },[ingresos, gastos]);

  return (
    <AppProvider>
      <div className="m-10 grid place-items-center">
        <Saldo />
        <div className="flex items-center content-around gap-10 m-5">
          <BtnCrearCategoriaIngresos />
          <BtnCrearCategoriaGastos />
          <BtnCrearIngreso />
          <BtnCrearGasto />
        </div>
        <Mes />
        <div className="flex items-center content-around gap-10">
          <TotalIngresos sumaTotalIngresos={sumaTotalIngresos} />
          <TotalGastos sumaTotalGastos={sumaTotalGastos} />
        </div>
        <h1 className="m-3 text-2xl font-bold">Categorias</h1>
        <ContenedorOperaciones>
          {
            categorias ?
            categorias.map(categoria =>(
              <CardCategoria key={categoria.id} categoria={categoria} />
            ))
            :
            <p>Cargando...</p>
          }
        </ContenedorOperaciones>
        <h1 className="m-3 text-2xl font-bold">Ingresos</h1>
        <ContenedorOperaciones>
          {ingresos ?
            ingresos.map(ingreso =>(
              <CardIngreso key={ingreso.id} ingreso={ingreso} />
            ))
            :
            <p>Cargando...</p>
          }
        </ContenedorOperaciones>
        <h1 className="m-3 text-2xl font-bold">Gastos</h1>
        <ContenedorOperaciones>
          {gastos ?
            gastos.map(gasto =>(
              <CardGasto key={gasto.id} gasto={gasto} />
            ))
            :
            <p>Cargando...</p>
          }
        </ContenedorOperaciones>
        <FormAggCatIngreso />
      </div>
    </AppProvider>
  );
}
