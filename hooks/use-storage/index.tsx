import { useCallback, useEffect, useState } from 'react';

import { safeStringify } from '@/utils';

function useLocalStorage<T>(
  keyName: string,
  defaultValue: T
): [T, (value: T) => void] {
  const [storedValue, setStoredValue] = useState(defaultValue);

  useEffect(() => {
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
  }, [keyName]);

  const setValue = useCallback(
    (newValue: T) => {
      try {
        window.localStorage.setItem(keyName, safeStringify(newValue));
      } finally {
        setStoredValue(newValue);
      }
    },
    [storedValue, keyName]
  );

  return [storedValue, setValue];
}

export default useLocalStorage;
