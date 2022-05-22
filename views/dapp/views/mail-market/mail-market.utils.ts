import { IMailMarketData, TMailMarketData } from './mail-market.types';

export const mapFetchMarketData = (
  data: ReadonlyArray<Omit<IMailMarketData, 'imgUrl'>>
): TMailMarketData =>
  data.map((item) => ({
    ...item,
    imgUrl: '/gold-dollar-coin.png',
  }));

export const addressMatch = (
  target: string,
  matchers: ReadonlyArray<
    ReadonlyArray<Omit<IMailMarketData, 'Icon' | 'currenciesCost'>>
  >
): boolean =>
  matchers.some((matcher) => matcher.some(({ address }) => target === address));

export const isOnLocalStorage = (
  symbol: string,
  localAssets: readonly Omit<IMailMarketData, 'Icon' | 'currenciesCost'>[]
): boolean =>
  (
    localAssets as ReadonlyArray<
      Omit<IMailMarketData, 'Icon' | 'currenciesCost'>
    >
  ).filter((item) => item.symbol === symbol).length
    ? true
    : false;

export const removeOnLocalStorage = (
  symbol: string,
  localAssets: readonly Omit<IMailMarketData, 'Icon' | 'currenciesCost'>[]
): readonly Omit<IMailMarketData, 'Icon' | 'currenciesCost'>[] =>
  (
    localAssets as ReadonlyArray<
      Omit<IMailMarketData, 'Icon' | 'currenciesCost'>
    >
  ).filter((item) => item.symbol !== symbol);
