import { getInterestViewDexContract, getStaticWeb3Provider } from '@/utils';

import { GetAmountsOut } from './interest-view-dex.types';

export const getAmountsOut: GetAmountsOut = (
  chainId,
  tokenIn,
  tokenOut,
  amountIn,
  bases
) => {
  const contract = getInterestViewDexContract(
    chainId,
    getStaticWeb3Provider(chainId)
  );

  return contract.getAmountsOut(tokenIn, tokenOut, amountIn, bases);
};
