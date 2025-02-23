import { useEffect, useState } from "react";

const useLocalStorage = (key: string, initialValue: string | boolean) => {
  // Helper to parse stored value based on initial value type
  const parseStoredValue = (stored: string | null) => {
    if (stored === null) return initialValue;
    if (typeof initialValue === "boolean") {
      return stored === "true";
    }
    return stored;
  };

  const [value, setValue] = useState(() => {
    if (typeof window === "undefined") return initialValue;
    const storedValue = localStorage.getItem(key);
    return parseStoredValue(storedValue);
  });

  const setLocalStorageValue = (
    newValue:
      | typeof initialValue
      | ((prev: typeof initialValue) => typeof initialValue),
  ) => {
    // Handle function updates
    const valueToStore =
      newValue instanceof Function ? newValue(value) : newValue;
    setValue(valueToStore);
    localStorage.setItem(key, valueToStore.toString());
  };

  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === key && e.newValue !== null) {
        setValue(parseStoredValue(e.newValue));
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [key]);

  return [value, setLocalStorageValue] as const;
};

export default useLocalStorage;
