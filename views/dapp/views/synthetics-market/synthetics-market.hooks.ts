import { DEFAULT_ACCOUNT } from '@/constants';
import { SYNTHETICS_CALL_MAP } from '@/constants/synthetics';
import { useSafeContractRead } from '@/hooks';
import InterestViewDineroV2ABI from '@/sdk/abi/interest-view-dinero-v2.abi.json';
import { getInterestViewDineroV2Address } from '@/utils';

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
  });
};
