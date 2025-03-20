"use client"
import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { useCommissionsContext } from "../../context/commissionsContext";
import { CommissionsData, GoalData, ProspectData } from "../../types/types";


export default function ChartsView() {
  const { updateFlag } = useCommissionsContext();
  const [localGoal, setLocalGoal] = useState<GoalData[]>([]);
  const [localCommission, setLocalCommission] = useState<CommissionsData | null>(null);
  const [localProspect, setLocalProspect] = useState<ProspectData | null>(null);
  const [localStorageCommission, setLocalCommissionStorage] = useState<CommissionsData[]>([]);
  
  useEffect(() => {
    const goalDataRaw = localStorage.getItem("goalData");
    const prospectDataRaw = localStorage.getItem("prospectData");
    const commissionDataRaw = localStorage.getItem("commissionsData");
  
    const goalArray: GoalData[] = goalDataRaw ? JSON.parse(goalDataRaw) : [];
    const prospectArray: ProspectData[] = prospectDataRaw ? JSON.parse(prospectDataRaw) : [];
    const commissionArray: CommissionsData[] = commissionDataRaw ? JSON.parse(commissionDataRaw) : [];
    const commissionStorageArray: CommissionsData[] = commissionDataRaw ? JSON.parse(commissionDataRaw) : [];
  
    if (goalArray.length > 0) setLocalGoal(goalArray);
    if (prospectArray.length > 0) setLocalProspect(prospectArray[prospectArray.length - 1]);
    if (commissionArray.length > 0) setLocalCommission(commissionArray[commissionArray.length - 1]);
    if (commissionStorageArray.length > 0) setLocalCommissionStorage(commissionStorageArray);
  }, [updateFlag]);

  return (
    <div className="relative space-y-4 h-full">
      <div className={`${localGoal.length > 0 ? "hidden" : "" } flex backdrop-blur-xs items-center justify-center z-50 mb-0 absolute inset-0 self-center justify-self-center w-full h-full bg-bg-secondary/40 rounded-lg overflow-hidden`}>
        <h1 className="text-3xl">¡Carga tus datos primero!</h1>
      </div>

      {/* Valor del producto por mes */}
      <div className="bg-bg-secondary rounded-lg p-5 border border-primary-border/60">
        <h3 className="text-lg font-medium text-white mb-4">Valor del producto por mes</h3>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={localStorageCommission} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#4b5563" />
              <XAxis 
                tickFormatter={val => val.slice(0, 3)}
                dataKey="month" 
                stroke="#ccc" 
              />
              <YAxis stroke="#ccc" />
              <Tooltip
                formatter={(value) => [`$${Number(value).toLocaleString()}`, ""]}
                contentStyle={{ backgroundColor: "#1f2937", borderColor: "#4b5563" }}
                labelStyle={{ color: "#e5e7eb" }}
              />
              <Legend />
              <Bar dataKey="productValue" name="Valor del producto" fill="var(--color-primary)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Ganancia neta */}
      <div className="grid grid-cols-1  md:grid-cols-2 gap-6">
        <div className="relative xl:py-0 py-10 bg-bg-secondary rounded-lg p-4 content-center border border-primary-border/60">
          <h1 className="absolute text-lg top-4 left-8">Ganancia neta</h1>
          <div className="h-52 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={[
                    { name: "Producto", value: localCommission?.productValue },
                    { name: "Ganancia neta", value: localGoal[localGoal.length - 1]?.netProfit },
                  ]}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  labelLine={false}
                >
                  <Cell fill="var(--color-primary)"/>
                  <Cell fill="var(--color-chart-secondary)" />
                </Pie>
                <Tooltip
                  itemStyle={{ color: "#ccc" }} // Cambia el color de los items (los valores numéricos)
                  formatter={(value) => [`$${Number(value).toLocaleString()}`, ""]}
                  contentStyle={{ backgroundColor: "#1f2937", borderColor: "#4b5563", color: "#ccc" }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Datos a prospectar */}
        <div className="relative bg-bg-secondary rounded-lg p-4 border border-primary-border/60">
          <h1 className="absolute text-lg top-4 left-8">Datos a prospectar</h1>
          <div className="h-56 mt-10 w-full flex items-center justify-center">
            <ResponsiveContainer width="90%" height="100%">
              <BarChart
                data={[
                  { name: "Nuevos prospectos", value: localProspect?.newDataToProspect },
                  { name: "Presentaciones mensuales", value: localProspect?.minPresentationsMonth.toFixed(0) },
                  { name: "Presentaciones semanales", value: localProspect?.minPresentationsWeek }, 
                ]}
                layout="vertical"
                margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#4b5563" /> 
                <XAxis domain={[0, 90]} type="number" stroke="#9ca3af" />
                <YAxis width={120} tickMargin={10} dataKey="name" type="category" stroke="#9ca3af" />
                <Tooltip
                  contentStyle={{ backgroundColor: "#1f2937", borderColor: "#4b5563" }}
                  labelStyle={{ color: "#e5e7eb" }}
                />
                <Bar dataKey="value" fill="var(--color-chart-secondary)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  )
}

