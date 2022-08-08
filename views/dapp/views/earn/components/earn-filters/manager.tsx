import { FC, useEffect } from 'react';
import { useWatch } from 'react-hook-form';

import { useDebounce } from '@/hooks';

import { EarnFilterManagerProps } from '../../earn.types';

const EarnFilterManager: FC<EarnFilterManagerProps> = ({
  control,
  isFilterSearch,
  setIsFilterSearch,
}) => {
  const search = useWatch({ name: 'search', control });
  const debouncedSearch = useDebounce(search, 1500);

  useEffect(() => {
    if (isFilterSearch) return;

    if (!debouncedSearch) return;

    setIsFilterSearch(true);
    setTimeout(() => {
      setIsFilterSearch(false);
    }, 3000);
  }, [debouncedSearch]);

  return null;
};

export default EarnFilterManager;
