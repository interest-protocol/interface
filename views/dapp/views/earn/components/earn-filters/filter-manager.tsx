import { not, o, pathOr, prop } from 'ramda';
import { FC, useEffect } from 'react';
import { useWatch } from 'react-hook-form';

import { ERC_20_DATA, UNKNOWN_ERC_20 } from '@/constants';
import { useDebounce } from '@/hooks';
import { isSameAddress } from '@/utils';

import {
  FarmSortByFilter,
  FilterManagerProps,
  TypeFilter,
} from '../../earn.types';

const FilterManager: FC<FilterManagerProps> = ({
  control,
  setFilteredFarms,
  farms,
}) => {
  const sortBy = useWatch({ control, name: 'sortBy' });
  const search = useWatch({ control, name: 'search' });
  const onlyStaked = useWatch({ control, name: 'onlyStaked' });
  const onlyFinished = useWatch({ control, name: 'onlyFinished' });
  const typeFilter = useWatch({ control, name: 'typeFilter' });

  const debouncedSearch = useDebounce(search, 2000);

  useEffect(() => {
    const trimmedDebouncedSearch = debouncedSearch.trim();
    if (trimmedDebouncedSearch) {
      const parsedDebouncedSearch = debouncedSearch.toLocaleLowerCase().trim();
      setFilteredFarms((farms) =>
        farms.filter(({ token1, token0, chainId }) => {
          const erc0 = pathOr(
            UNKNOWN_ERC_20,
            [chainId.toString(), token0],
            ERC_20_DATA
          );
          const erc1 = pathOr(
            UNKNOWN_ERC_20,
            [chainId.toString(), token1],
            ERC_20_DATA
          );

          return (
            token1.toLocaleLowerCase().includes(parsedDebouncedSearch) ||
            token0.toLocaleLowerCase().includes(parsedDebouncedSearch) ||
            erc0.name.toLocaleLowerCase().includes(parsedDebouncedSearch) ||
            erc1.name.toLocaleLowerCase().includes(parsedDebouncedSearch) ||
            erc0.symbol.toLocaleLowerCase().includes(parsedDebouncedSearch) ||
            erc1.symbol.toLocaleLowerCase().includes(parsedDebouncedSearch) ||
            isSameAddress(debouncedSearch, token0) ||
            isSameAddress(debouncedSearch, token1) ||
            isSameAddress(debouncedSearch, token1)
          );
        })
      );
    } else {
      setFilteredFarms(farms);
    }
  }, [debouncedSearch]);

  useEffect(() => {
    if (sortBy === FarmSortByFilter.Default) setFilteredFarms(farms);

    if (sortBy === FarmSortByFilter.Allocation)
      setFilteredFarms((farm) =>
        farm.slice().sort((x, y) => (x.allocation.lt(y.allocation) ? -1 : 1))
      );

    if (sortBy === FarmSortByFilter.TVL)
      setFilteredFarms((farm) =>
        farm.slice().sort((x, y) => (x.tvl < y.tvl ? -1 : 1))
      );

    if (sortBy === FarmSortByFilter.APR)
      setFilteredFarms((farm) =>
        farm.slice().sort((x, y) => (x.apr.lt(y.apr) ? -1 : 1))
      );
  }, [sortBy]);

  useEffect(() => {
    if (onlyStaked) {
      setFilteredFarms((farms) =>
        farms.filter(({ balance }) => !balance.isZero())
      );
    } else {
      setFilteredFarms(farms);
    }
  }, [onlyStaked]);

  useEffect(() => {
    if (onlyFinished) {
      setFilteredFarms((farms) => farms.filter(({ isLive }) => !isLive));
    } else {
      setFilteredFarms(farms);
    }
  }, [onlyFinished]);

  useEffect(() => {
    if (typeFilter === TypeFilter.All) setFilteredFarms(farms);

    if (typeFilter === TypeFilter.Stable)
      setFilteredFarms((farms) => farms.filter(prop('stable')));

    if (typeFilter === TypeFilter.Volatile)
      setFilteredFarms((farms) => farms.filter(o(not, prop('stable'))));
  }, [typeFilter]);

  return null;
};

export default FilterManager;
