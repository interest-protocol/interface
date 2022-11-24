import { DEFAULT_ACCOUNT } from '@/constants';
import { GAAction } from '@/constants/google-analytics';
import { SYNTHETICS_CALL_MAP } from '@/constants/synthetics';
import { useSafeContractRead } from '@/hooks';
import InterestViewDineroV2ABI from '@/sdk/abi/interest-view-dinero-v2.abi.json';
import { getInterestViewDineroV2Address } from '@/utils';
import { logException } from '@/utils/analytics';

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
      logException({
        action: GAAction.ReadBlockchainData,
        label: `Transaction: getSyntheticMarketsSummary`,
        trackerName: [
          'views/dapp/views/synthetics-market/synthetics-market.hooks.ts',
        ],
      }),
  });
};
