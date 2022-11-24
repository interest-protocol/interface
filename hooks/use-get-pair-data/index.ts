import { DEFAULT_ACCOUNT } from '@/constants';
import { GAAction } from '@/constants/google-analytics';
import { useIdAccount } from '@/hooks/use-id-account';
import InterestViewDexABI from '@/sdk/abi/interest-view-dex.abi.json';
import { getInterestViewDexAddress } from '@/utils';
import { logException } from '@/utils/analytics';

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
        label: `Transaction: getPairData`,
        trackerName: ['hooks/use-get-pair-data/index.ts'],
      }),
  });
};
