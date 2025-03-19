export function saveInLocalStorage(key: string, newObject: any) {
    const currentData = localStorage.getItem(key);
    const array = currentData ? JSON.parse(currentData) : [];
    array.push(newObject);
    localStorage.setItem(key, JSON.stringify(array));
  }