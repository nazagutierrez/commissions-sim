import { useState } from "react"
import CommissionSimulator from "./tabs/commissions/commission-simulator"
import { CommissionsContext } from "./context/commissionsContext"
import { CommissionsContextType, CommissionsData, GoalData, ProspectData } from "./types/types";
import Charts from "./tabs/charts/charts"
import Summary from "./tabs/summary/summary"

export default function Home() {
  const [activeTab, setActiveTab] = useState("commission")

  const defaultCommissionsData: CommissionsContextType = {
    updateFlag: false,
    goalData: {
      profitGoal: 0,

      netProfit: 0,
      needToSell: 0,
      runVolume: 0,
      monthSales: 0,
    },
    prospectData: {
      newDataToProspect: 0,
      minPresentationsMonth: 0,
      minPresentationsWeek: 0,
    },
    commissionsData: {
      conversionRate: "",
      name: "",
      month: "",
      product: "",
      productValue: 0,
      commission: 0,
      usdValue: 0,
      usdTicket: 0,
    },
    
    setGoalData: () => {},
    setProspectData: () => {},
    setCommissionsData: () => {},
    setUpdateFlag: () => {},
  };

  const [goalData, setGoalData] = useState<GoalData>(defaultCommissionsData.goalData);
  const [prospectData, setProspectData] = useState<ProspectData>(defaultCommissionsData.prospectData);
  const [commissionsData, setCommissionsData] = useState<CommissionsData>(defaultCommissionsData.commissionsData);
  const [updateFlag, setUpdateFlag] = useState(false);

  return (
    <CommissionsContext.Provider value={{ goalData, prospectData, commissionsData, updateFlag, setGoalData, setProspectData, setCommissionsData, setUpdateFlag }}>
      <div className="min-h-screen bg-gray-900 text-gray-100 w-screen">
        <div className="container mx-auto py-10 px-4 w-full">
          <div className="w-full">
            <div className="flex items-center justify-between mb-8 gap-8">
              <div className="w-[400px] flex rounded-lg overflow-hidden border border-gray-700">
                <button
                  onClick={() => setActiveTab("commission")}
                  className={`flex-1 cursor-pointer py-3 px-4 text-center transition-colors ${
                    activeTab === "commission" ? "bg-indigo-600 text-white" : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                  }`}
                >
                  Comisiones
                </button>
                <button
                  onClick={() => setActiveTab("charts")}
                  className={`flex-1 cursor-pointer py-3 px-4 text-center transition-colors ${
                    activeTab === "charts" ? "bg-indigo-600 text-white" : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                  }`}
                >
                  Gráficos
                </button>
                <button
                  onClick={() => setActiveTab("summary")}
                  className={`flex-1 cursor-pointer py-3 px-4 text-center transition-colors ${
                    activeTab === "summary" ? "bg-indigo-600 text-white" : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                  }`}
                >
                  Resumen
                </button>
              </div>
              <h1 className="text-xl bg-gray-800/40 px-5 py-1 rounded-lg border border-b-blue-500 border-gray-800">
                Asistente de comisiones
              </h1>
            </div>

            <div className="bg-gray-800 rounded-lg border border-gray-700 p-6 w-full">
              {activeTab === "commission" ? (
                <div className="animate-fade-in-y">
                  <div className="mb-4">
                    <h2 className="text-xl font-bold text-white">Comisiones</h2>
                    <p className="text-gray-400">Calcular los porcentajes de venta de tus productos.</p>
                  </div>
                  <CommissionSimulator />
                </div>
              ) : ""}
              {activeTab === "charts" ? (
                <div className="w-full animate-fade-in-y">
                  <div className="mb-4">
                    <h2 className="text-xl font-bold text-white">Gráficos</h2>
                    <p className="text-gray-400">Gráficos para tus ventas.</p>
                  </div>
                  <Charts />
                </div>              
              ) : ""}
              {activeTab === "summary" ? (
                <div className="w-full animate-fade-in-y">
                  <div className="mb-4">
                    <h2 className="text-xl font-bold text-white">Resumen</h2>
                    <p className="text-gray-400">Resumen completo de todos los datos</p>
                  </div>
                  <Summary />
                </div>              
              ) : ""}
            </div>
          </div>
        </div>
      </div>
    </CommissionsContext.Provider>
  )
}
