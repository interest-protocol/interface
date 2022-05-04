import { useSelector } from 'react-redux';

import { getFarmsSummary } from '@/api';
import { CASA_DE_PAPEL_FARM_MAP } from '@/constants';
import { getChainId } from '@/state/core/core.selectors';

import { useCallContract } from '../use-call-contract';

export const useGetFarmsSummary = () => {
  const chainId = useSelector(getChainId) as number | null;

  const data = CASA_DE_PAPEL_FARM_MAP[chainId || 0];

  return useCallContract(chainId, getFarmsSummary, [
    chainId,
    data.pairs,
    data.poolIds,
    data.baseTokens,
    {},
  ]);
};
