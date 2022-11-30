import { DEFAULT_ACCOUNT } from '@/constants';
import { SYNTHETICS_CALL_MAP } from '@/constants/synthetics';
import { useSafeContractRead } from '@/hooks';
import InterestViewDineroV2ABI from '@/sdk/abi/interest-view-dinero-v2.abi.json';
import { getInterestViewDineroV2Address } from '@/utils';
import { logTransactionEvent, Pages, Status, Type } from '@/utils/analytics';

export const useGetSyntheticMarketsSummary = (
  account: string,
  chainId: number
) => {
  const callData = SYNTHETICS_CALL_MAP[chainId] || [];

  return useSafeContractRead({
    contractInterface: InterestViewDineroV2ABI,
    addressOrName: getInterestViewDineroV2Address(chainId),
    functionName: 'getSyntheticMarketsSummary',
    args: [account || DEFAULT_ACCOUNT, callData],
    enabled: !!callData.length,
    onError: () =>
      logTransactionEvent({
        status: Status.Error,
        type: Type.Read,
        pages: Pages.Hooks,
        functionName: 'getSyntheticMarketsSummary',
      }),
    onSuccess: () =>
      logTransactionEvent({
        status: Status.Success,
        type: Type.Read,
        pages: Pages.Hooks,
        functionName: 'getSyntheticMarketsSummary',
      }),
  });
};
