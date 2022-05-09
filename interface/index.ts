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
