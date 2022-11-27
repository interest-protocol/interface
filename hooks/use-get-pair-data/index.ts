import { DEFAULT_ACCOUNT } from '@/constants';
import { GAAction } from '@/constants/google-analytics';
import { useIdAccount } from '@/hooks/use-id-account';
import InterestViewDexABI from '@/sdk/abi/interest-view-dex.abi.json';
import { getInterestViewDexAddress } from '@/utils';
import { logException, logSuccess } from '@/utils/analytics';

import { useSafeContractRead } from '../use-safe-contract-read';

export const useGetPairData = (pairAddress: string) => {
  const { chainId, account } = useIdAccount();

  return useSafeContractRead({
    addressOrName: getInterestViewDexAddress(chainId),
    contractInterface: InterestViewDexABI,
    functionName: 'getPairData',
    args: [pairAddress, account || DEFAULT_ACCOUNT],
    onError: () =>
      logException({
        action: GAAction.ReadBlockchainData,
        label: `Transaction error: getPairData`,
        trackerName: ['hooks/use-get-pair-data/index.ts'],
      }),
    onSuccess: () =>
      logSuccess({
        action: GAAction.ReadBlockchainData,
        label: `Transaction success: getPairData`,
        trackerName: ['hooks/use-get-pair-data/index.ts'],
      }),
  });
};
