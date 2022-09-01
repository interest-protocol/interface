import { BigNumber } from 'ethers';

export type MaybeArray<T> = T | Array<T>;

export interface LocalMAILMarketData {
  market: string;
  token: string;
  symbol: string;
  name: string;
}

export interface MailMarketsSummaryData {
  name: string;
  token: string;
  symbol: string;
  market: string;
  borrowRates: BigNumber[];
  supplyRates: BigNumber[];
}

export interface ERC20Metadata<T> {
  name: string;
  symbol: string;
  decimals: T;
}

export interface ERC20MetadataWithAddress<T = BigNumber>
  extends ERC20Metadata<T> {
  address: string;
}
