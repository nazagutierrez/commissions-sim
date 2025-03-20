import { useEffect, useState } from "react";
import { CommissionsData, GoalData, ProspectData } from "../../types/types";
import { useCommissionsContext } from "../../context/commissionsContext";

export default function Summary() {
  const { updateFlag } = useCommissionsContext();
  const [localGoal, setLocalGoal] = useState<GoalData | null>(null);
  const [localCommission, setLocalCommission] = useState<CommissionsData | null>(null);
  const [localProspect, setLocalProspect] = useState<ProspectData | null>(null);
  
  useEffect(() => {
    // Recuperamos data del localstorage
    const goalDataRaw = localStorage.getItem("goalData");
    const prospectDataRaw = localStorage.getItem("prospectData");
    const commissionDataRaw = localStorage.getItem("commissionsData");
  
    // Revisamos si exsite y la parseamos
    const goalArray: GoalData[] = goalDataRaw ? JSON.parse(goalDataRaw) : [];
    const prospectArray: ProspectData[] = prospectDataRaw ? JSON.parse(prospectDataRaw) : [];
    const commissionArray: CommissionsData[] = commissionDataRaw ? JSON.parse(commissionDataRaw) : [];
  
    // Si hay datos en localstorage, seteamos los valores
    if (goalArray.length > 0) setLocalGoal(goalArray[goalArray.length - 1]);
    if (prospectArray.length > 0) setLocalProspect(prospectArray[prospectArray.length - 1]);
    if (commissionArray.length > 0) setLocalCommission(commissionArray[commissionArray.length - 1]);
  }, [updateFlag]);
  

  return (
    // Mostramos todos los datos
    <section className="h-full flex flex-col items-center justify-around gap-14 py-[44px]">
        <div className="bg-bg-secondary rounded-lg p-5 w-full ">
          <h2 className="text-lg xl:text-xxl font-medium mb-4 text-center xl:text-start">
            Datos de entrada
          </h2>
          <div className="grid center grid-cols-1 md:grid-cols-3 xl:grid-cols-7 grid-rows-3 xl:grid-rows-1 gap-4 text-center">
            <div className="bg-primary/20 py-6 xxl:px-4 rounded-lg ">
              <p className="text-main-color text-md">Nombre</p>
              <p className="text-sm xxl:text-base font-medium">
                {localCommission?.name || "Vacío"}
              </p>
            </div>
            <div className="bg-primary/20 py-6 px-4 rounded-lg">
              <p className="text-main-color text-md">Mes</p>
              <p className="text-md font-medium self-center">
                {localCommission?.month || "Vacío"}
              </p>
            </div>
            <div className="bg-primary/20 py-6 px-4 rounded-lg">
              <p className="text-main-color text-md">Producto</p>
              <p className="text-md font-medium">
                {localCommission?.product || "Vacío"}
              </p>
            </div>
            <div className="bg-primary/20 py-6 xxl:px-4 rounded-lg">
              <p className="text-main-color text-md">Valor del producto</p>
              <p className="text-md font-medium">
                ${localCommission?.productValue?.toLocaleString() || 0}
              </p>
            </div>
            <div className="bg-primary/20 py-6 px-4 rounded-lg">
              <p className="text-main-color text-md">Comisión</p>
              <p className="text-md font-medium">
                %{localCommission?.commission || 0}
              </p>
            </div>
            <div className="bg-primary/20 py-6 px-4 rounded-lg">
              <p className="text-main-color text-md">Valor USD</p>
              <p className="text-md font-medium">
                ${localCommission?.usdValue?.toLocaleString() || 0}
              </p>
            </div>
            <div className="bg-primary/20 py-6 px-4 rounded-lg">
              <p className="text-main-color text-md">Ticket USD</p>
              <p className="text-md font-medium">
                ${localCommission?.usdTicket?.toLocaleString() || 0}
              </p>
            </div>
          </div>
        </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 items-center justify-around gap-10 w-full">
        <div className="bg-bg-secondary rounded-lg p-6 h-fit">
          <h2 className="text-lg xl:text-xl font-medium mb-4 text-center xl:text-start">Objetivos</h2>
          <div className="grid grid-cols-1 grid-rows-4 xxl:grid-rows-3 gap-4">
            <div className="bg-primary/20 py-3 px-4 rounded-lg col-span-2 block text-center xl:flex items-center gap-2 ">
              <p className="text-main-color text-sm">Ganancia neta</p>
              <p className="text-md font-medium underline decoration-green-400 decoration-1 underline-offset-4">
                ${localGoal?.netProfit?.toLocaleString() || 0}
              </p>
            </div>
            <div className="bg-primary/20 py-3 px-4 rounded-lg col-span-2 row-start-2 block text-center xl:flex items-center gap-2">
              <p className="text-main-color text-sm">Tengo que vender (PESOS)</p>
              <p className="text-md font-medium">
                ${localGoal?.needToSell?.toLocaleString() || 0}
              </p>
            </div>
            <div className="bg-primary/20 py-3 px-4 rounded-lg col-span-2 block text-center xl:flex items-center gap-2">
              <p className="text-main-color text-sm">Ventas mensuales</p>
              <p className="text-md font-medium">
                {localGoal?.monthSales?.toFixed(0) || 0}
              </p>
            </div>
            <div className="bg-primary/20 py-3 px-4 rounded-lg col-span-2 block text-center xl:flex items-center gap-2">
              <p className="text-main-color text-sm">Volumen en carrera (USD)</p>
              <p className="text-md font-medium">
                ${localGoal?.runVolume?.toLocaleString() || 0}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-bg-secondary rounded-lg p-6 h-full items-start flex flex-col">
          <h2 className="text-lg xl:text-xxl font-medium mb-4 text-center xl:text-start">
            Prospectar datos
          </h2>
          <div className="grid grid-cols-1 grid-rows-3 gap-4 w-full">
            <div className="bg-primary/20 py-4.5 px-4 rounded-lg block text-center xl:flex gap-2 items-center">
              <p className="text-main-color text-sm">Nuevos datos a prospectar</p>
              <p className="text-md font-medium">
                {localProspect?.newDataToProspect || 0}
              </p>
            </div>
            <div className="bg-primary/20 py-4.5 px-4 rounded-lg block text-center xl:flex gap-2 items-center">
              <p className="text-main-color text-sm">Min. Presentaciónes (Mes)</p>
              <p className="text-md font-medium">
                {localProspect?.minPresentationsMonth?.toFixed(0) || 0}
              </p>
            </div>
            <div className="bg-primary/20 py-4.5 px-4 rounded-lg block text-center xl:flex gap-2 items-center">
              <p className="text-main-color text-sm">
                Min. Presentaciónes (Semana)
              </p>
              <p className="text-md font-medium">
                {localProspect?.minPresentationsWeek || 0}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-around gap-4 h-full bg-bg-secondary rounded-lg">
          <div className="p-6 w-full block text-center xl:flex items-center justify-center gap-3">
            <h2 className="text-lg xl:text-xxl font-medium xl:mb-0 mb-4 text-center xl:w-1/2">
              Objetivo principal
            </h2>
            <div className="bg-primary/20 p-2 rounded-lg xl:w-1/2 ">
              <p className="text-main-color text-sm">Objetivo a vender</p>
              <p className="text-md font-medium">
                ${localGoal?.profitGoal?.toLocaleString() || 0}
              </p>
            </div>
          </div>
          <div className="h-1 w-4/5 bg-primary/30"></div>
          <div className="bg-bg-secondary rounded-lg p-6 w-full block text-center xl:flex items-center gap-2">
            <h2 className="text-lg xl:text-xxl xl:w-1/2 font-medium xl:mb-0 mb-4 text-center">
              Capacitación mínima entre campus virtual y oficina
            </h2>
            <div className="bg-primary/20 p-2 rounded-lg xl:w-1/2">
              <p className="text-md font-medium">
                20Hs semanales
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
