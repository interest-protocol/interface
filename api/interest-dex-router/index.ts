import { JsonRpcSigner } from '@ethersproject/providers';

import { getInterestDexRouterContract, getStaticWeb3Provider } from '@/utils';

import {
  AddERC20Liquidity,
  AddNativeTokenLiquidity,
  QuoteAddLiquidity,
  QuoteRemoveLiquidity,
  RemoveLiquidity,
  Swap,
} from './interest-dex-router.types';

export const swapExactTokensForTokens: Swap = (
  chainId: number,
  signer,
  ...args
) =>
  getInterestDexRouterContract(chainId, signer).swapExactTokensForTokens(
    ...args
  );

export const swapExactNativeTokenForTokens: Swap = (
  chainId: number,
  signer,
  amountIn,
  ...args
) =>
  getInterestDexRouterContract(chainId, signer).swapExactNativeTokenForTokens(
    ...args,
    { value: amountIn }
  );

export const swapExactTokensForNativeToken: Swap = (
  chainId: number,
  signer,
  ...args
) =>
  getInterestDexRouterContract(chainId, signer).swapExactTokensForNativeToken(
    ...args
  );

export const quoteRemoveLiquidity: QuoteRemoveLiquidity = (
  chainId: number,
  ...args
) =>
  getInterestDexRouterContract(
    chainId,
    getStaticWeb3Provider(chainId)
  ).quoteRemoveLiquidity(...args);

export const quoteAddLiquidity: QuoteAddLiquidity = (
  chainId: number,
  ...args
) =>
  getInterestDexRouterContract(
    chainId,
    getStaticWeb3Provider(chainId)
  ).quoteAddLiquidity(...args);

export const removeLiquidity: RemoveLiquidity = (
  chainId: number,
  signer: JsonRpcSigner,
  ...args
) => getInterestDexRouterContract(chainId, signer).removeLiquidity(...args);

export const addERC20Liquidity: AddERC20Liquidity = (
  chainId: number,
  signer: JsonRpcSigner,
  ...args
) => getInterestDexRouterContract(chainId, signer).addLiquidity(...args);

export const addNativeTokenLiquidity: AddNativeTokenLiquidity = (
  chainId: number,
  signer: JsonRpcSigner,
  nativeAmount,
  ...args
) =>
  getInterestDexRouterContract(chainId, signer).addLiquidityNativeToken(
    ...args,
    { value: nativeAmount }
  );
