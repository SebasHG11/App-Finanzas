import axios from "axios";
import { useEffect, useState } from "react";
import { Saldo } from "@/components/Saldo";
import { TotalIngresos } from "@/components/TotalIngresos";
import { TotalGastos } from "@/components/TotalGastos";
import { BtnCrearCategoria } from "@/components/BtnCrearCategoria";
import { BtnCrearIngreso } from "@/components/BtnCrearIngreso";
import { BtnCrearGasto } from "@/components/BtnCrearGasto";
import { Mes } from "@/components/Mes";
import { ContenedorOperaciones } from "@/components/ContenedorOperaciones";
import { CardCategoria } from "@/components/CardCategoria";
import { CardIngreso } from "@/components/CardIngreso";
import { CardGasto } from "@/components/CardGasto";
import { AppProvider } from "@/context/FinanzaContext";

export default function Home() {
  const [categorias, setCategorias] = useState<Category[]>([]);

  const getCategorias = async() =>{
    try{
      const response = await axios.get<Category[]>("http://localhost:5216/v1/Categoria");
      setCategorias(response.data);
    }catch(error){
      console.log(error);
    }
  }

  useEffect(() =>{
    getCategorias();
  }, []);

  return (
    <AppProvider>
      <div className="m-10 grid place-items-center">
        <Saldo />
        <div className="flex items-center content-around gap-10 m-5">
          <BtnCrearCategoria />
          <BtnCrearIngreso />
          <BtnCrearGasto />
        </div>
        <Mes />
        <TotalIngresos />
        <TotalGastos />
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
        <ContenedorOperaciones>
          <CardIngreso />
        </ContenedorOperaciones>
        <ContenedorOperaciones>
          <CardGasto />
        </ContenedorOperaciones>
      </div>
    </AppProvider>
  );
}
