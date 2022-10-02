import { getInterestDexRouterContract, getStaticWeb3Provider } from '@/utils';

import {
  QuoteAddLiquidity,
  QuoteRemoveLiquidity,
} from './interest-dex-router.types';

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
