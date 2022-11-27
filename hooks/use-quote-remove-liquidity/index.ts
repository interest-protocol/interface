import { BigNumber } from 'ethers';

import { GAAction } from '@/constants/google-analytics';
import InterestDexRouterABI from '@/sdk/abi/interest-dex-router.abi.json';
import { getInterestDexRouterAddress } from '@/utils';
import { logException, logSuccess } from '@/utils/analytics';

import { useChainId } from '../use-chain-id';
import { useSafeContractRead } from '../use-safe-contract-read';

export const useQuoteRemoveLiquidity = (
  token0: string,
  token1: string,
  isStable: boolean,
  amount: BigNumber
) => {
  const chainId = useChainId();

  return useSafeContractRead({
    addressOrName: getInterestDexRouterAddress(chainId),
    contractInterface: InterestDexRouterABI,
    functionName: 'quoteRemoveLiquidity',
    args: [token0, token1, isStable, amount],
    onError: () =>
      logException({
        action: GAAction.ReadBlockchainData,
        label: `Transaction error: quoteRemoveLiquidity`,
        trackerName: ['hooks/use-quote-remove-liquidity/index.ts'],
      }),
    onSuccess: () =>
      logSuccess({
        action: GAAction.ReadBlockchainData,
        label: `Transaction success: quoteRemoveLiquidity`,
        trackerName: ['hooks/use-quote-remove-liquidity/index.ts'],
      }),
  });
};
