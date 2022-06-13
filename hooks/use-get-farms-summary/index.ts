import { propOr } from 'ramda';

import { getFarmsSummary } from '@/api';
import { CASA_DE_PAPEL_FARM_MAP } from '@/constants';

import { useCallContract } from '../use-call-contract';
import { useIdAccount } from '../use-id-account';

const prop = propOr([]);

export const useGetFarmsSummary = () => {
  const { chainId } = useIdAccount();

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
