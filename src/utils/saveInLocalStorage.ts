import { CommissionsData, GoalData, ProspectData } from "../types/types";

export function saveInLocalStorage(key: string, newObject: GoalData | CommissionsData | ProspectData) {
    const currentData = localStorage.getItem(key);
    const array = currentData ? JSON.parse(currentData) : [];
    array.push(newObject);
    localStorage.setItem(key, JSON.stringify(array));
  }