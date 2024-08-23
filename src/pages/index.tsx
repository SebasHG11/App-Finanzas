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
import { FormAggCatGasto } from "@/components/FormAggCatGasto";
import { FormAggIngreso } from "@/components/FormAggIngreso";
import { FormAggGasto } from "@/components/FormAggGasto";
import { Modal } from "@/components/Modal";
import { fetchData } from "@/helpers/fetchData";
import { Toaster } from "sonner";

function HomeContent() {
  const context = useContext(FinanzaContext);

  const [sumaTotalIngresos, setSumaTotalIngresos] = useState<number>(0);
  const [sumaTotalGastos, setSumaTotalGastos] = useState<number>(0);

  const [refetchCategorias, setRefetchCategorias] = useState(false);
  const [refetchIngresos, setRefetchIngresos] = useState(false);
  const [refetchGastos, setRefetchGastos] = useState(false);

  const [categorias, setCategorias] = useState<Category[]>([]);
  const [ingresos, setIngresos] = useState<Ingreso[]>([]);
  const [gastos, setGastos] = useState<Gasto[]>([]);

  const { data: categoriasFetch, loading: loadingCategorias } = fetchData<Category[]>("http://localhost:5216/v1/Categoria", refetchCategorias);
  const { data: ingresosFetch, loading: loadingIngresos } = fetchData<Ingreso[]>("http://localhost:5216/v1/Ingreso", refetchIngresos);
  const { data: gastosFetch, loading: loadingGastos } = fetchData<Gasto[]>("http://localhost:5216/v1/Gasto", refetchGastos);

  useEffect(() => {
    if(ingresos) {
      setSumaTotalIngresos(sumarTotal(ingresos));
    }
    if(gastos) {
      setSumaTotalGastos(sumarTotal(gastos));
    }
  }, [ingresos, gastos]);

  const closeModal = () => {
    setRefetchCategorias(true);
    setRefetchIngresos(true);
    setRefetchGastos(true);
  }

  useEffect(() => {
    closeModal();
  },[
      context?.openModalCatGastos,
      context?.openModalCatIngresos, 
      context?.openModalIngresos, 
      context?.openModalGastos
    ]
  );

  useEffect(() => {
    if(categoriasFetch) setCategorias(categoriasFetch);
    if(ingresosFetch) setIngresos(ingresosFetch);
    if(gastosFetch) setGastos(gastosFetch);
    setRefetchCategorias(false);
    setRefetchIngresos(false);
    setRefetchGastos(false);
  },[
      categoriasFetch, 
      ingresosFetch, 
      gastosFetch, 
      refetchCategorias, 
      refetchIngresos, 
      refetchGastos
    ]
  );

  return (
    <div className="m-10 grid place-items-center">
      <Toaster position="top-center" />
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
            categorias.map(categoria => (
              <CardCategoria key={categoria.id} categoria={categoria} />
            ))
            :
            <p>Cargando...</p>
        }
      </ContenedorOperaciones>
      <h1 className="m-3 text-2xl font-bold">Ingresos</h1>
      <ContenedorOperaciones>
        {ingresos ?
          ingresos.map(ingreso => (
            <CardIngreso key={ingreso.id} ingreso={ingreso} />
          ))
          :
          <p>Cargando...</p>
        }
      </ContenedorOperaciones>
      <h1 className="m-3 text-2xl font-bold">Gastos</h1>
      <ContenedorOperaciones>
        {gastos ?
          gastos.map(gasto => (
            <CardGasto key={gasto.id} gasto={gasto} />
          ))
          :
          <p>Cargando...</p>
        }
      </ContenedorOperaciones>

      {context?.openModalCatIngresos === true &&
        <Modal>
          <FormAggCatIngreso />
        </Modal>
      }

      {context?.openModalCatGastos === true &&
        <Modal>
          <FormAggCatGasto />
        </Modal>
      }

      {context?.openModalIngresos === true &&
        <Modal>
          <FormAggIngreso />
        </Modal>
      }

      {context?.openModalGastos === true &&
        <Modal>
          <FormAggGasto />
        </Modal>
      }
    </div>
  );
}

export default function Home() {
  return(
    <AppProvider>
      <HomeContent />
    </AppProvider>
  );
}