import { CommissionsData, GoalData, ProspectData } from "../types/types";

export function saveInLocalStorage(key: string, newObject: GoalData | CommissionsData | ProspectData) {
    // Obtiene los datos del LocalStorage y pushea el nuevo sin perder los anteriores
    const currentData = localStorage.getItem(key);
    const array = currentData ? JSON.parse(currentData) : [];
    array.push(newObject);
    localStorage.setItem(key, JSON.stringify(array));
  }