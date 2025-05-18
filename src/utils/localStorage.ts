
type StorageItem = {
  value: any;
  expiry?: number;
};

/**
 * Save data to localStorage with optional expiry time
 * @param key The localStorage key
 * @param value The value to store
 * @param expiryInMinutes Optional expiry time in minutes
 */
export const saveToLocalStorage = (key: string, value: any, expiryInMinutes?: number): void => {
  try {
    const item: StorageItem = {
      value: value
    };
    
    if (expiryInMinutes) {
      item.expiry = new Date().getTime() + expiryInMinutes * 60000;
    }
    
    localStorage.setItem(key, JSON.stringify(item));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
};

/**
 * Get data from localStorage
 * @param key The localStorage key
 * @returns The stored value or null if expired or not found
 */
export const getFromLocalStorage = <T>(key: string): T | null => {
  try {
    const itemStr = localStorage.getItem(key);
    
    if (!itemStr) {
      return null;
    }
    
    const item: StorageItem = JSON.parse(itemStr);
    
    // Check if the item has expired
    if (item.expiry && new Date().getTime() > item.expiry) {
      localStorage.removeItem(key);
      return null;
    }
    
    return item.value as T;
  } catch (error) {
    console.error('Error retrieving from localStorage:', error);
    return null;
  }
};

/**
 * Remove an item from localStorage
 * @param key The localStorage key to remove
 */
export const removeFromLocalStorage = (key: string): void => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error('Error removing from localStorage:', error);
  }
};

/**
 * Check if a key exists in localStorage and is not expired
 * @param key The localStorage key
 * @returns Boolean indicating if the key exists and is not expired
 */
export const existsInLocalStorage = (key: string): boolean => {
  return getFromLocalStorage(key) !== null;
};
