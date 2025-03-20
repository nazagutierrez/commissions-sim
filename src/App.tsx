import { useEffect, useState } from "react"
import CommissionSimulator from "./tabs/commissions/commission-simulator"
import { CommissionsContext } from "./context/commissionsContext"
import { CommissionsContextType, CommissionsData, GoalData, ProspectData } from "./types/types";
import Charts from "./tabs/charts/charts"
import Summary from "./tabs/summary/summary"
import chartWhite from "./assets/chartWhite.png"
import homeWhite from "./assets/homeWhite.png"
import summaryWhite from "./assets/summaryWhite.png"

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

  useEffect(() => {
    if (!updateFlag) return
    setActiveTab("summary")
    setUpdateFlag(false)
  }, [updateFlag])
  

  return (
    <CommissionsContext.Provider value={{ goalData, prospectData, commissionsData, updateFlag, setGoalData, setProspectData, setCommissionsData, setUpdateFlag }}>
      <div className="min-h-screen bg-bg text-main-white w-full">
        <div className="container mx-auto pb-28 md:pb-10 pt-9 px-4 w-full">
          <div className="w-full">
            <div className="flex-col xl:flex-row flex items-center justify-around xl:justify-between mb-8 gap-8">
              <div className="flex-wrap w-[400px] hidden sm:flex rounded-lg overflow-hidden border border-primary-border/70">
                <button
                  onClick={() => setActiveTab("commission")}
                  className={`flex-1 cursor-pointer py-3 px-4 text-center transition-colors ${
                    activeTab === "commission" ? "bg-primary" : "bg-bg-primary text-main-gray hover:bg-primary"
                  }`}
                >
                  Comisiones
                </button>
                <button
                  onClick={() => setActiveTab("charts")}
                  className={`flex-1 cursor-pointer py-3 px-4 text-center transition-colors ${
                    activeTab === "charts" ? "bg-primary" : "bg-bg-primary text-main-gray hover:bg-primary"
                  }`}
                >
                  Gráficos
                </button>
                <button
                  onClick={() => setActiveTab("summary")}
                  className={`flex-1 cursor-pointer py-3 px-4 text-center transition-colors ${
                    activeTab === "summary" ? "bg-primary" : "bg-bg-primary text-main-gray hover:bg-primary"
                  }`}
                >
                  Resumen
                </button>
              </div>
              <div className="z-50 w-full bottom-0 fixed sm:hidden flex rounded-tr-lg rounded-tl-lg overflow-hidden">
                <button
                  onClick={() => setActiveTab("commission")}
                  className={`flex flex-1 cursor-pointer py-6 px-4 items-center justify-center transition-colors ${
                    activeTab === "commission" ? "bg-primary" : "bg-bg-primary text-main-gray hover:bg-primary"
                  }`}
                >
                  <img className="w-5 h-5" src={homeWhite} alt="Icono de grafico" />
                </button>
                <button
                  onClick={() => setActiveTab("charts")}
                  className={`flex flex-1 border-x-1 border-primary cursor-pointer py-6 px-4 items-center justify-center transition-colors ${
                    activeTab === "charts" ? "bg-primary" : "bg-bg-primary text-main-gray hover:bg-primary"
                  }`}
                >
                  <img className="w-5 h-5" src={chartWhite} alt="Icono de grafico" />
                </button>
                <button
                  onClick={() => setActiveTab("summary")}
                  className={`flex flex-1 cursor-pointer py-6 px-4 items-center justify-center transition-colors ${
                    activeTab === "summary" ? "bg-primary" : "bg-bg-primary text-main-gray hover:bg-primary"
                  }`}
                >
                  <img className="w-5 h-5" src={summaryWhite} alt="Icono de grafico" />
                </button>
              </div>
              <h1 className="text-xl text-center bg-bg-primary px-5 py-1 rounded-lg border border-b-primary-border border-bg-primary">
                Asistente de comisiones | Sinergia Creativa
              </h1>
            </div>

            <div className="bg-bg-primary rounded-lg border border-primary-border/60 p-6 w-full">
              {activeTab === "commission" ? (
                <div className="animate-fade-in-y">
                  <div className="mb-4">
                    <h2 className="text-xl font-bold">Comisiones</h2>
                    <p className="text-main-gray">Calcular los porcentajes de venta de tus productos.</p>
                  </div>
                  <CommissionSimulator />
                </div>
              ) : ""}
              {activeTab === "charts" ? (
                <div className="w-full animate-fade-in-y">
                  <div className="mb-4">
                    <h2 className="text-xl font-bold">Gráficos</h2>
                    <p className="text-main-gray">Gráficos para tus ventas.</p>
                  </div>
                  <Charts />
                </div>              
              ) : ""}
              {activeTab === "summary" ? (
                <div className="w-full animate-fade-in-y">
                  <div className="mb-4">
                    <h2 className="text-xl font-bold">Resumen</h2>
                    <p className="text-main-gray">Resumen completo de todos los datos</p>
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
