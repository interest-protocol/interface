import { propOr } from 'ramda';
import { useSelector } from 'react-redux';

import { getFarmsSummary } from '@/api';
import { CASA_DE_PAPEL_FARM_MAP } from '@/constants';
import { getChainId } from '@/state/core/core.selectors';

import { useCallContract } from '../use-call-contract';

const prop = propOr([]);

export const useGetFarmsSummary = () => {
  const chainId = useSelector(getChainId) as number | null;

  const data = propOr(
    {},
    chainId ? chainId.toString() : '0',
    CASA_DE_PAPEL_FARM_MAP
  );

  return useCallContract(
    chainId,
    getFarmsSummary,
    [
      chainId,
      prop('pairs', data),
      prop('poolIds', data),
      prop('baseTokens', data),
      {},
    ],
    {
      refreshWhenHidden: true,
      revalidateIfStale: true,
      revalidateOnMount: true,
      revalidateOnFocus: false,
    }
  );
};
