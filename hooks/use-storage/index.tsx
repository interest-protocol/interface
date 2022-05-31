import { useCallback, useState } from 'react';

import { LocalStorageKeys } from './use-storage.types';

function useLocalStorage<T>(
  keyName: LocalStorageKeys,
  defaultValue: T
): [T, (value: T) => void] {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const value = window.localStorage.getItem(keyName);

      if (value) {
        return JSON.parse(value);
      } else {
        window.localStorage.setItem(keyName, JSON.stringify(defaultValue));
        return defaultValue;
      }
    } catch (err) {
      return defaultValue;
    }
  });

  const setValue = useCallback(
    (newValue: T) => {
      try {
        window.localStorage.setItem(keyName, JSON.stringify(newValue));
      } finally {
        setStoredValue(newValue);
      }
    },
    [storedValue]
  );

  return [storedValue, setValue];
}

export default useLocalStorage;