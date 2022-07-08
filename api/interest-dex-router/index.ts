import { getInterestDexRouterContract } from '@/utils';

import { Swap } from './interest-dex-router.types';

export const swapExactTokensForTokens: Swap = (
  chainId: number,
  signer,
  ...args
) => {
  const contract = getInterestDexRouterContract(chainId, signer);

  return contract.swapExactTokensForTokens(...args);
};

export const swapExactNativeTokenForTokens: Swap = (
  chainId: number,
  signer,
  amountIn,
  ...args
) => {
  const contract = getInterestDexRouterContract(chainId, signer);

  return contract.swapExactNativeTokenForTokens(...args, { value: amountIn });
};

export const swapExactTokensForNativeToken: Swap = (
  chainId: number,
  signer,
  ...args
) => {
  const contract = getInterestDexRouterContract(chainId, signer);

  return contract.swapExactTokensForNativeToken(...args);
};
