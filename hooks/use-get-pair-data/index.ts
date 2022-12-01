import { DEFAULT_ACCOUNT } from '@/constants';
import { useIdAccount } from '@/hooks/use-id-account';
import InterestViewDexABI from '@/sdk/abi/interest-view-dex.abi.json';
import { getInterestViewDexAddress } from '@/utils';
import { logTransactionEvent, Pages, Status, Type } from '@/utils/analytics';

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
        status: Status.Error,
        type: Type.Read,
        pages: Pages.DexPoolDetails,
        functionName: 'getPairData',
      }),
    onSuccess: () =>
      logTransactionEvent({
        status: Status.Success,
        type: Type.Read,
        pages: Pages.DexPoolDetails,
        functionName: 'getPairData',
      }),
  });
};
