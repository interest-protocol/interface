import { BigNumber } from 'ethers';

import { quoteRemoveLiquidity } from '@/api';
import { ZERO_BIG_NUMBER } from '@/sdk';

import { useCallContract } from '../use-call-contract';
import { useChainId } from '../use-chain-id';

export const useQuoteRemoveLiquidity = (
  token0: string,
  token1: string,
  isStable: boolean,
  amount: BigNumber
) => {
  const chainId = useChainId();

  const apiCall = amount.isZero()
    ? (Promise.resolve({
        amountA: ZERO_BIG_NUMBER,
        amountB: ZERO_BIG_NUMBER,
      }) as unknown as typeof quoteRemoveLiquidity)
    : quoteRemoveLiquidity;

  return useCallContract(chainId, apiCall, [
    chainId,
    token0,
    token1,
    isStable,
    amount,
  ]);
};
