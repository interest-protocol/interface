import { DependencyList, useEffect, useState } from 'react';

import { LocalStorageKeys } from './use-local-storage.types';

const useLocalStorage = (
  key: LocalStorageKeys,
  dependencies: DependencyList
) => {
  const [data, setData] = useState<unknown>();

  const updateLocalStorage = () => {
    console.log('>> storage update');
    setData(JSON.parse(window.localStorage.getItem(key) ?? '') || null);
  };

  useEffect(() => {
    updateLocalStorage();
    window.addEventListener('storage', updateLocalStorage);
    return () => window.removeEventListener('storage', updateLocalStorage);
  }, dependencies);

  return data;
};

export default useLocalStorage;
