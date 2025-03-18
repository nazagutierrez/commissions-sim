import { createContext, useContext } from "react";
import { CommissionsContextType } from "../types/types";

export const CommissionsContext = createContext<CommissionsContextType | undefined>(undefined);

export const useCommissionsContext = () => {
  const context = useContext(CommissionsContext);

  if (context === undefined) {
    throw new Error("context not found");
  }

  return context;
};
