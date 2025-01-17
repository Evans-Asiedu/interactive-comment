export const saveToLocalStorage = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const getFromLocalStorage = (key) => {
  const storedData = localStorage.getItem(key);
  return storedData ? JSON.parse(storedData) : null;
};

export const addItemToLocalStorageArray = (key, newItem) => {
  const existingItems = getFromLocalStorage(key) || [];
  existingItems.push(newItem);
  saveToLocalStorage(key, existingItems);
};

export const removeItemFromLocalStorageArray = (key, itemIndex) => {
  const existingItems = getFromLocalStorage(key) || [];
  existingItems.splice(itemIndex, 1);
  saveToLocalStorage(key, existingItems);
};

export const clearLocalStorageItem = (key) => {
  localStorage.removeItem(key);
};
