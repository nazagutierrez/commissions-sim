"use client"

import { useState } from "react"
import CommissionSimulator from "./tabs/commissions/commission-simulator"
import { CommissionsContext } from "./context/commissionsContext"
import { CommissionsContextType, CommissionsData, GoalData, ProspectData } from "./types/types";
import Charts from "./tabs/charts/charts"
import Summary from "./tabs/summary/summary"

export default function Home() {
  const [activeTab, setActiveTab] = useState("commission")

  const defaultCommissionsData: CommissionsContextType = {
      goalData: {
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
    
  };

  const [goalData, setGoalData] = useState<GoalData>(defaultCommissionsData.goalData);
  const [prospectData, setProspectData] = useState<ProspectData>(defaultCommissionsData.prospectData);
  const [commissionsData, setCommissionsData] = useState<CommissionsData>(defaultCommissionsData.commissionsData);

  

  return (
    <CommissionsContext.Provider value={{ goalData, prospectData, commissionsData, setGoalData, setProspectData, setCommissionsData }}>
      <div className="min-h-screen bg-gray-900 text-gray-100 w-screen">
        <div className="container mx-auto py-10 px-4 w-full">
          <div className="mb-8 w-full">
            <div className="w-[400px] flex rounded-lg overflow-hidden border border-gray-700 mb-8">
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

            <div className="bg-gray-800 rounded-lg border border-gray-700 p-6 w-full">
              {activeTab === "commission" ? (
                <div>
                  <div className="mb-4">
                    <h2 className="text-xl font-bold text-white">Comisiones</h2>
                    <p className="text-gray-400">Calcular los porcentajes de venta de tus productos.</p>
                  </div>
                  <CommissionSimulator />
                </div>
              ) : ""}
              {activeTab === "charts" ? (
                <div className="w-full">
                  <div className="mb-4">
                    <h2 className="text-xl font-bold text-white">Gráficos</h2>
                    <p className="text-gray-400">Gráficos para tus ventas.</p>
                  </div>
                  <Charts />
                </div>              
              ) : ""}
              {activeTab === "summary" ? (
                <div className="w-full">
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
