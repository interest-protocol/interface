import { BigNumber } from 'ethers';
import { FC, SVGAttributes } from 'react';

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
  address: string;
  symbol: string;
  name: string;
}

export interface MailMarketsSummaryData {
  Icon: FC<SVGAttributes<SVGSVGElement>>;
  symbol: string;
  market: string;
  name: string;
  borrowRates: BigNumber[];
  supplyRates: BigNumber[];
}
