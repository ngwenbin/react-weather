import { useEffect, useState } from "react";

const parse = (value: string) => {
  try {
    return JSON.parse(value);
  } catch {
    return value;
  }
};

const useLocalStorage = <T>(key: string, defaultValue?: T) => {
  const [value, setValue] = useState<T | undefined>(defaultValue);
  const [isCalled, setIsCalled] = useState<boolean>(false);

  useEffect(() => {
    const stored = localStorage.getItem(key);
    setValue(stored ? parse(stored) : defaultValue);
    setIsCalled(true);
  }, [key]);

  useEffect(() => {
    if (value !== undefined && value !== null) {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }, [value]);

  const removeKey = () => {
    localStorage.removeItem(key);
    setValue(undefined);
  };

  return { value, setValue, removeKey, isCalled };
};

export default useLocalStorage;
