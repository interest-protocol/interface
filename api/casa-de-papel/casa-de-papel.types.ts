import { BigNumber } from 'ethers';

import {
  MintDataStructOutput,
  PoolDataStructOutput,
  ReservesStructOutput,
} from '../../types/ethers-contracts/InterestViewAbi';

export type GetFarmSummaryReturn = [
  ReservesStructOutput[],
  PoolDataStructOutput[],
  BigNumber[],
  MintDataStructOutput,
  BigNumber[]
] & {
  reserves: ReservesStructOutput[];
  poolsData: PoolDataStructOutput[];
  prices: BigNumber[];
  mintData: MintDataStructOutput;
  totalSupplies: BigNumber[];
};
