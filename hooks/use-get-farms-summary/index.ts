import { propOr } from 'ramda';
import { useContractRead } from 'wagmi';

import { CASA_DE_PAPEL_FARM_CALL_MAP, DEFAULT_ACCOUNT } from '@/constants';
import InterestViewEarnABI from '@/sdk/abi/interest-view-earn.abi.json';
import { getInterestViewEarnAddress } from '@/utils';

import { useIdAccount } from '../use-id-account';

const prop = propOr([]);

export const useGetFarmsSummary = () => {
  const { chainId, account } = useIdAccount();

  const data = propOr({}, chainId.toString(), CASA_DE_PAPEL_FARM_CALL_MAP);

  return useContractRead({
    addressOrName: getInterestViewEarnAddress(chainId),
    contractInterface: InterestViewEarnABI,
    functionName: 'getFarmsSummary',
    args: [
      account || DEFAULT_ACCOUNT,
      prop('pairs', data),
      prop('poolIds', data),
      prop('baseTokens', data),
    ],
    chainId,
  });
};
