import { DEFAULT_ACCOUNT } from '@/constants';
import { useIdAccount } from '@/hooks/use-id-account';
import InterestViewDexABI from '@/sdk/abi/interest-view-dex.abi.json';
import { getInterestViewDexAddress } from '@/utils';
import {
  GAPage,
  GAStatus,
  GAType,
  logTransactionEvent,
} from '@/utils/analytics';

import { useSafeContractRead } from '../use-safe-contract-read';

export const useGetPairData = (pairAddress: string) => {
  const { chainId, account } = useIdAccount();

  return useSafeContractRead({
    addressOrName: getInterestViewDexAddress(chainId),
    contractInterface: InterestViewDexABI,
    functionName: 'getPairData',
    args: [pairAddress, account || DEFAULT_ACCOUNT],
    onError: () =>
      logTransactionEvent({
        status: GAStatus.Error,
        type: GAType.Read,
        page: GAPage.DexPoolDetails,
        functionName: 'getPairData',
      }),
    onSuccess: () =>
      logTransactionEvent({
        status: GAStatus.Success,
        type: GAType.Read,
        page: GAPage.DexPoolDetails,
        functionName: 'getPairData',
      }),
  });
};
