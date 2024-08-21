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

export default function Home() {
  return (
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
        <CardCategoria />
      </ContenedorOperaciones>
      <ContenedorOperaciones>
        <CardIngreso />
      </ContenedorOperaciones>
      <ContenedorOperaciones>
        <CardGasto />
      </ContenedorOperaciones>
    </div>
  );
}
