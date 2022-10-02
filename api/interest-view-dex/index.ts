import { getInterestViewDexContract, getStaticWeb3Provider } from '@/utils';

import {
  GetAmountsOut,
  GetInterestDEXViewERC20Metadata,
} from './interest-view-dex.types';

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

export const getInterestDEXViewERC20Metadata: GetInterestDEXViewERC20Metadata =
  (chainId, token) => {
    const contract = getInterestViewDexContract(
      chainId,
      getStaticWeb3Provider(chainId)
    );

    return contract.getERC20Metadata(token);
  };
