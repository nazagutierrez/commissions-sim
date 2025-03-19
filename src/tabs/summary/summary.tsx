import { useEffect, useState } from "react";
import { CommissionsData, GoalData, ProspectData } from "../../types/types";
import { useCommissionsContext } from "../../context/commissionsContext";

export default function Summary() {
  const { updateFlag } = useCommissionsContext();
  const [localGoal, setLocalGoal] = useState<GoalData | null>(null);
  const [localCommission, setLocalCommission] = useState<CommissionsData | null>(null);
  const [localProspect, setLocalProspect] = useState<ProspectData | null>(null);
  
  useEffect(() => {
    const goalDataRaw = localStorage.getItem("goalData");
    const prospectDataRaw = localStorage.getItem("prospectData");
    const commissionDataRaw = localStorage.getItem("commissionsData");
  
    const goalArray: GoalData[] = goalDataRaw ? JSON.parse(goalDataRaw) : [];
    const prospectArray: ProspectData[] = prospectDataRaw ? JSON.parse(prospectDataRaw) : [];
    const commissionArray: CommissionsData[] = commissionDataRaw ? JSON.parse(commissionDataRaw) : [];
  
    if (goalArray.length > 0) setLocalGoal(goalArray[goalArray.length - 1]);
    if (prospectArray.length > 0) setLocalProspect(prospectArray[prospectArray.length - 1]);
    if (commissionArray.length > 0) setLocalCommission(commissionArray[commissionArray.length - 1]);
  }, [updateFlag]);
  

  return (
    <div className="h-[70vh] flex flex-col items-center justify-around">
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 w-full">
          <h2 className="text-xl font-bold text-white mb-4">
            Datos de entrada
          </h2>
          <div className="grid center grid-cols-7 grid-rows-1 gap-4 text-center">
            <div className="bg-gray-700 p-4 rounded-lg">
              <p className="text-gray-400 text-sm">Nombre</p>
              <p className="text-2xl font-bold text-indigo-400">
                {localCommission?.name}
              </p>
            </div>
            <div className="bg-gray-700 p-4 rounded-lg">
              <p className="text-gray-400 text-sm">Mes</p>
              <p className="text-2xl font-bold text-indigo-400 self-center">
                {localCommission?.month}
              </p>
            </div>
            <div className="bg-gray-700 p-4 rounded-lg">
              <p className="text-gray-400 text-sm">Producto</p>
              <p className="text-2xl font-bold text-indigo-400">
                {localCommission?.product}
              </p>
            </div>
            <div className="bg-gray-700 p-4 rounded-lg">
              <p className="text-gray-400 text-sm">Valor del producto</p>
              <p className="text-2xl font-bold text-indigo-400">
                ${localCommission?.productValue}
              </p>
            </div>
            <div className="bg-gray-700 p-4 rounded-lg">
              <p className="text-gray-400 text-sm">Comisión</p>
              <p className="text-2xl font-bold text-indigo-400">
                %{localCommission?.commission}
              </p>
            </div>
            <div className="bg-gray-700 p-4 rounded-lg">
              <p className="text-gray-400 text-sm">Valor USD</p>
              <p className="text-2xl font-bold text-indigo-400">
                ${localCommission?.usdValue}
              </p>
            </div>
            <div className="bg-gray-700 p-4 rounded-lg">
              <p className="text-gray-400 text-sm">Ticket USD</p>
              <p className="text-2xl font-bold text-indigo-400">
                ${localCommission?.usdTicket}
              </p>
            </div>
          </div>
        </div>

      <div className="flex items-center justify-around gap-10 w-full">
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 w-1/3">
          <h2 className="text-xl font-bold text-white mb-4">Objetivos</h2>
          <div className="grid grid-cols-1 grid-rows-3 gap-4">
            <div className="bg-gray-700 p-4 rounded-lg col-span-2">
              <p className="text-gray-400 text-sm">Ganancia neta</p>
              <p className="text-2xl font-bold text-indigo-400 underline decoration-green-400 decoration-1 underline-offset-4">
                ${localGoal?.netProfit}
              </p>
            </div>
            <div className="bg-gray-700 p-4 rounded-lg col-span-2 row-start-2">
              <p className="text-gray-400 text-sm">Tengo que vender (PESOS)</p>
              <p className="text-2xl font-bold text-indigo-400">
                {localGoal?.needToSell}
              </p>
            </div>
            <div className="bg-gray-700 p-4 rounded-lg row-start-3">
              <p className="text-gray-400 text-sm">Ventas mensuales</p>
              <p className="text-2xl font-bold text-indigo-400">
                ${localGoal?.monthSales}
              </p>
            </div>
            <div className="bg-gray-700 p-4 rounded-lg row-start-3">
              <p className="text-gray-400 text-sm">Volumen en carrera (USD)</p>
              <p className="text-2xl font-bold text-indigo-400">
                ${localGoal?.runVolume}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 w-1/3">
          <h2 className="text-xl font-bold text-white mb-4">
            Prospectar datos
          </h2>
          <div className="grid grid-cols-1 grid-rows-3 gap-4">
            <div className="bg-gray-700 p-4 rounded-lg">
              <p className="text-gray-400 text-sm">Nuevos datos a prospectar</p>
              <p className="text-2xl font-bold text-indigo-400">
                {localProspect?.newDataToProspect}
              </p>
            </div>
            <div className="bg-gray-700 p-4 rounded-lg">
              <p className="text-gray-400 text-sm">Min. Presentaciónes (Mes)</p>
              <p className="text-2xl font-bold text-indigo-400">
                {localProspect?.minPresentationsMonth?.toFixed(0)}
              </p>
            </div>
            <div className="bg-gray-700 p-4 rounded-lg">
              <p className="text-gray-400 text-sm">
                Min. Presentaciónes (Semana)
              </p>
              <p className="text-2xl font-bold text-indigo-400">
                {localProspect?.minPresentationsWeek}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-around gap-4 w-1/3">
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 w-full">
            <h2 className="text-xl font-bold text-white mb-4">
              Capacitación mínima entre campus virtual y oficina
            </h2>
            <div className="bg-gray-700 p-4 rounded-lg">
              <p className="text-2xl font-bold text-indigo-400">
                20Hs semanales
              </p>
            </div>
          </div>
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 w-full">
            <h2 className="text-xl font-bold text-white mb-4">
              Resumen de comisiones
            </h2>
            <div className="bg-gray-700 p-4 rounded-lg">
              <p className="text-gray-400 text-sm">Comision total</p>
              <p className="text-2xl font-bold text-indigo-400">
                ${localProspect?.newDataToProspect}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
