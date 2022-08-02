import { useCallback, useEffect, useState } from 'react';

import { safeStringify } from '@/utils';

export function useLocalStorage<T>(
  keyName: string,
  defaultValue: T
): [T, (value: T) => void] {
  const [storedValue, setStoredValue] = useState(defaultValue);

  useEffect(() => {
    try {
      const value = window.localStorage.getItem(keyName);

      if (value) {
        setStoredValue(JSON.parse(value));
      } else {
        window.localStorage.setItem(keyName, JSON.stringify(defaultValue));
        setStoredValue(defaultValue);
      }
    } catch (err) {
      setStoredValue(defaultValue);
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
