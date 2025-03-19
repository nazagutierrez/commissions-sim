import {
  CommissionsContextType,
  CommissionsData,
  GoalData,
} from "../types/types";
import { saveInLocalStorage } from "./saveInLocalStorage";

export const calculateCommission = ({
  updatedProfitGoal,
  updatedCommissionsData,
  setGoalData,
  setProspectData,
  setCommissionsData,
  setUpdateFlag,
}: {
  updatedCommissionsData: CommissionsData;
  updatedProfitGoal: GoalData["profitGoal"];
  goalData: GoalData;
  commissionsData: CommissionsData;
  setGoalData: CommissionsContextType["setGoalData"];
  setProspectData: CommissionsContextType["setProspectData"];
  setCommissionsData: CommissionsContextType["setCommissionsData"];
  setUpdateFlag: CommissionsContextType["setUpdateFlag"];
}) => {
  const { productValue, usdValue, usdTicket, commission, conversionRate } =
    updatedCommissionsData;

  // Cálculo de la ganancia neta + IVA
  const IVA = Number("1.21");

  const netProfit = Math.round((productValue / IVA) * (commission / 100));
  const needToSell = Math.round((updatedProfitGoal / (commission / 100)) * IVA);
  const runVolume = Math.round(needToSell / usdValue);
  const monthSales = Math.round(runVolume / usdTicket);
  const newDataToProspect = Math.round(monthSales * 6);
  const minPresentationsMonth = Number(
    (monthSales / Number(conversionRate)).toFixed(2)
  );
  const minPresentationsWeek = Number((minPresentationsMonth / 25).toFixed(1));

  const updatedGoalData = {
    profitGoal: updatedProfitGoal,
    netProfit,
    needToSell,
    runVolume,
    monthSales,
  };
  const updatedProspectData = {
    newDataToProspect,
    minPresentationsMonth,
    minPresentationsWeek,
  };

  setGoalData((prevState) => ({
    ...prevState,
    updatedGoalData,
  }));
  setProspectData((prevState) => ({
    ...prevState,
    updatedProspectData,
  }));
  setCommissionsData((prevState) => ({
    ...prevState,
    updatedCommissionsData,
  }));

  saveInLocalStorage("commissionsData", updatedCommissionsData);
  saveInLocalStorage("goalData", updatedGoalData);
  saveInLocalStorage("prospectData", updatedProspectData);

  setUpdateFlag(prev => !prev);
};
