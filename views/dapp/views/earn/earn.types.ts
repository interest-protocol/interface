import { BigNumber } from 'ethers';
import { Control, UseFormRegister, UseFormSetValue } from 'react-hook-form';

import { IntMath } from '@/sdk';

import { InterestViewEarn } from '../../../../types/ethers-contracts/InterestViewEarnAbi';

export enum FarmSortByFilter {
  Default,
  TVL,
  APR,
  Allocation,
}

export enum FarmTypeFilter {
  All,
  Volatile,
  Stable,
}

export interface EarnFiltersProps extends EarnFilterManagerProps {
  register: UseFormRegister<IEarnForm>;
}

export interface EarnFilterManagerProps {
  control: Control<IEarnForm>;
  setValue: UseFormSetValue<IEarnForm>;
}

export interface IEarnForm {
  search: string;
  sortBy: FarmSortByFilter;
  onlyStaked: boolean;
  typeFilter: FarmTypeFilter;
  onlyFinished: boolean;
}

export type TCalculateFarmBaseAPR = (
  chainId: number,
  totalAllocationPoints: BigNumber,
  allocationPoints: BigNumber,
  intPerBlock: BigNumber,
  intUSDPrice: BigNumber,
  stakeAmount: BigNumber,
  stakeTokenUSDPrice: BigNumber
) => IntMath;

export type TCalculateAllocation = (
  allocationPoints: BigNumber,
  totalAllocationPoints: BigNumber
) => IntMath;

export type TCalculateFarmTokenPrice = (
  chainId: number,
  token0: string,
  token1: string,
  reserve0: BigNumber,
  reserve1: BigNumber,
  tokenPriceMap: TokenPriceMap,
  totalSupply: BigNumber
) => IntMath;

export interface SafeFarmData {
  allocationPoints: BigNumber;
  chainId: number;
  reserve0: BigNumber;
  reserve1: BigNumber;
  stakingTokenAddress: string;
  stakingTokenPrice: BigNumber;
  id: number;
  token1: string;
  token0: string;
  totalStakedAmount: BigNumber;
  allocation: IntMath;
  tvl: number;
  apr: IntMath;
  stable: boolean;
  allowance: BigNumber;
  balance: BigNumber;
  stakingAmount: BigNumber;
  pendingRewards: BigNumber;
  isLive: boolean;
}

export interface SafeFarmSummaryData {
  farms: ReadonlyArray<SafeFarmData>;
  loading: boolean;
  intUSDPrice: BigNumber;
  tokenPriceMap: TokenPriceMap;
}

export type GetSafeFarmSummaryData = (
  chainId: number | null,
  data:
    | ([
        InterestViewEarn.PoolDataStructOutput[],
        InterestViewEarn.MintDataStructOutput,
        BigNumber[],
        InterestViewEarn.UserFarmDataStructOutput[]
      ] & {
        pools: InterestViewEarn.PoolDataStructOutput[];
        mintData: InterestViewEarn.MintDataStructOutput;
        prices: BigNumber[];
        farmDatas: InterestViewEarn.UserFarmDataStructOutput[];
      })
    | undefined
) => SafeFarmSummaryData;

export interface TokenPriceMap {
  [key: string]: BigNumber;
}

export type CalculateIntUSDPrice = (
  chainId: number,
  token0: string,
  token1: string,
  reserve0: BigNumber,
  reserve1: BigNumber,
  tokenPriceMap: TokenPriceMap
) => BigNumber;
