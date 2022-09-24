import { BigNumber } from 'ethers';

import InterestDexRouterABI from '@/sdk/abi/interest-dex-router.abi.json';
import { getInterestDexRouterAddress } from '@/utils';

import { useChainId } from '../use-chain-id';
import { useContractRead } from '../use-contract-read';

export const useQuoteRemoveLiquidity = (
  token0: string,
  token1: string,
  isStable: boolean,
  amount: BigNumber
) => {
  const chainId = useChainId();

  return useContractRead({
    addressOrName: getInterestDexRouterAddress(chainId),
    contractInterface: InterestDexRouterABI,
    functionName: 'quoteRemoveLiquidity',
    args: [token0, token1, isStable, amount],
  });
};
