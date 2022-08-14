import { propOr } from 'ramda';

import { getFarmsSummary } from '@/api';
import { CASA_DE_PAPEL_FARM_CALL_MAP, DEFAULT_ACCOUNT } from '@/constants';

import { useCallContract } from '../use-call-contract';
import { useIdAccount } from '../use-id-account';

const prop = propOr([]);

export const useGetFarmsSummary = () => {
  const { chainId, account } = useIdAccount();

  const data = propOr({}, chainId.toString(), CASA_DE_PAPEL_FARM_CALL_MAP);

  return useCallContract(
    chainId,
    getFarmsSummary,
    [
      chainId,
      prop('pairs', data),
      prop('poolIds', data),
      prop('baseTokens', data),
      account || DEFAULT_ACCOUNT,
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
