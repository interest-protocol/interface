import { BigNumber } from 'ethers';

import InterestDexRouterABI from '@/sdk/abi/interest-dex-router.abi.json';
import { getInterestDexRouterAddress } from '@/utils';
import { logTransactionEvent, Pages, Status, Type } from '@/utils/analytics';

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
      logTransactionEvent({
        status: Status.Error,
        type: Type.Read,
        pages: Pages.DexPoolDetailsRemoveLiquidity,
        functionName: 'quoteRemoveLiquidity',
      }),
    onSuccess: () =>
      logTransactionEvent({
        status: Status.Success,
        type: Type.Read,
        pages: Pages.DexPoolDetailsRemoveLiquidity,
        functionName: 'quoteRemoveLiquidity',
      }),
  });
};
