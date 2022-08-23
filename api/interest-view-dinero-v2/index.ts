import { getInterestViewDineroV2, getStaticWeb3Provider } from '@/utils';

export const getDineroMarketsSummaryV2 = (
  chainId: number,
  user: string,
  nativeMarket: string,
  erc20Markets: Array<string>,
  lpFreeMarkets: Array<string>
) =>
  getInterestViewDineroV2(
    chainId,
    getStaticWeb3Provider(chainId)
  ).getDineroMarketsSummary(user, nativeMarket, erc20Markets, lpFreeMarkets);

export const getDineroMarketDataV2 = (
  chainId: number,
  user: string,
  market: string,
  baseToken: string,
  kind: number
) =>
  getInterestViewDineroV2(
    chainId,
    getStaticWeb3Provider(chainId)
  ).getDineroMarketData(user, market, baseToken, kind);
