import { Dispatch, SetStateAction } from "react";

export type CommissionsData = {
  name: string;
  month: string;
  product: string;
  productValue: number;
  commission: number;
  usdValue: number;
  usdTicket: number;
};

export type GoalData = {
  netProfit: number;
  needToSell: number;
  runVolume: number;
  monthSales: number;
};

export type ProspectData = {
  newDataToProspect: number;
  minPresentationsMonth: number;
  minPresentationsWeek: number;
};

export type HistoricalData = {
  month: string,
  sales: FormDataEntryValue;
  commission: FormDataEntryValue;
};

export type CommissionsContextType = {
  goalData: GoalData;
  prospectData: ProspectData;
  commissionsData: CommissionsData;

  setGoalData: Dispatch<SetStateAction<GoalData>>;
  setProspectData: Dispatch<SetStateAction<ProspectData>>;
  setCommissionsData: Dispatch<SetStateAction<CommissionsData>>;
};
