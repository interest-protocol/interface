import { BigNumber } from 'ethers';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IEmptyObject {}

export interface IReserves {
  reserve0: BigNumber;
  reserve1: BigNumber;
  blockTimestampLast: number;
}

export interface IPoolData {
  stakingToken: string;
  allocationPoints: BigNumber;
  totalSupply: BigNumber;
}

export interface ICasaDePapelMinting {
  totalAllocationPoints: BigNumber;
  interestTokenPerBlock: BigNumber;
}

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

export interface ERC20Metadata {
  name: string;
  symbol: string;
  decimals: BigNumber;
}

export interface ERC20MetadataWithAddress extends ERC20Metadata {
  address: string;
}
