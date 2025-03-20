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
  // Revisamos los tipos de las props
  updatedCommissionsData: CommissionsData;
  updatedProfitGoal: GoalData["profitGoal"];
  setGoalData: CommissionsContextType["setGoalData"];
  setProspectData: CommissionsContextType["setProspectData"];
  setCommissionsData: CommissionsContextType["setCommissionsData"];
  setUpdateFlag: CommissionsContextType["setUpdateFlag"];
}) => {
  const { productValue, usdValue, usdTicket, commission, conversionRate } =
    updatedCommissionsData;

  const IVA = Number("1.21");

  // Calculamos los valores en base a los inputs
  const netProfit = Math.round((productValue / IVA) * (commission / 100));
  const needToSell = Math.round((updatedProfitGoal / (commission / 100)) * IVA);
  const runVolume = Math.round(needToSell / usdValue);
  const monthSales = runVolume / usdTicket;
  const newDataToProspect = Math.round(monthSales * 6);
  const minPresentationsMonth = Math.ceil(Number((monthSales / Number(conversionRate))));
  const minPresentationsWeek = Math.ceil(Number((minPresentationsMonth / 4)));

  // Creamos los objetos con los datos nuevos
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

  // Seteamos los datos nuevos
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

  // Guardamos en LocalStorage
  saveInLocalStorage("commissionsData", updatedCommissionsData);
  saveInLocalStorage("goalData", updatedGoalData);
  saveInLocalStorage("prospectData", updatedProspectData);

  // Actualizamos el flag para que la aplicacón maneje los nuevos datos
  setUpdateFlag(true);
};
