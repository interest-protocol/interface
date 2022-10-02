import { propOr } from 'ramda';

import { CASA_DE_PAPEL_FARM_CALL_MAP, DEFAULT_ACCOUNT } from '@/constants';
import InterestViewEarnABI from '@/sdk/abi/interest-view-earn.abi.json';
import { getInterestViewEarnAddress } from '@/utils';

import { useSafeContractRead } from '../use-contract-read';
import { useIdAccount } from '../use-id-account';

const prop = propOr([]);

export const useGetFarmsSummary = () => {
  const { chainId, account } = useIdAccount();

  const data = propOr({}, chainId.toString(), CASA_DE_PAPEL_FARM_CALL_MAP);

  return useSafeContractRead({
    addressOrName: getInterestViewEarnAddress(chainId),
    contractInterface: InterestViewEarnABI,
    functionName: 'getFarmsSummary',
    args: [
      account || DEFAULT_ACCOUNT,
      prop('pairs', data),
      prop('poolIds', data),
      prop('baseTokens', data),
    ],
  });
};
