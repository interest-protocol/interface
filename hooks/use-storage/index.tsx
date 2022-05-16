import { DependencyList, useEffect, useState } from 'react';

import { LocalStorageKeys } from './use-local-storage.types';

const useLocalStorage = (
  key: LocalStorageKeys,
  dependencies: DependencyList
): unknown => {
  const [data, setData] = useState<unknown>();

  const updateLocalStorage = () => {
    setData(
      window.localStorage.getItem(key)
        ? JSON.parse(window.localStorage.getItem(key) ?? '')
        : null
    );
  };

  useEffect(() => {
    updateLocalStorage();
    window.addEventListener('storage', updateLocalStorage);
    return () => window.removeEventListener('storage', updateLocalStorage);
  }, dependencies);

  return data;
};

export default useLocalStorage;
