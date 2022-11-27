import { propOr } from 'ramda';

import { CASA_DE_PAPEL_FARM_CALL_MAP, DEFAULT_ACCOUNT } from '@/constants';
import { GAAction } from '@/constants/google-analytics';
import InterestViewEarnABI from '@/sdk/abi/interest-view-earn.abi.json';
import { getInterestViewEarnAddress } from '@/utils';
import { logException, logSuccess } from '@/utils/analytics';

import { useIdAccount } from '../use-id-account';
import { useSafeContractRead } from '../use-safe-contract-read';

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
    onError: () =>
      logException({
        action: GAAction.ReadBlockchainData,
        label: `Transaction error: getFarmsSummary`,
        trackerName: ['hooks/use-get-farms-summary/index.ts'],
      }),
    onSuccess: () =>
      logSuccess({
        action: GAAction.ReadBlockchainData,
        label: `Transaction success: getFarmsSummary`,
        trackerName: ['hooks/use-get-farms-summary/index.ts'],
      }),
  });
};
