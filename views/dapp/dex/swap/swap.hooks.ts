import { useMemo } from 'react';
import useSWR from 'swr';

import { POOLS_OBJECT_ID } from '@/constants';
import { makeSWRKey, provider } from '@/utils';

import { parsePools } from './swap.utils';

export const useGetPools = () => {
  const { data, ...rest } = useSWR(
    makeSWRKey([POOLS_OBJECT_ID], provider.getObjectsOwnedByObject.name),
    async () => provider.getObjectsOwnedByObject(POOLS_OBJECT_ID)
  );
  const parsedData = useMemo(() => parsePools(data), [data]);

  return {
    ...rest,
    data: parsedData,
  };
};
