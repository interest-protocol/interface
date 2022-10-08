import { Result } from '@ethersproject/abi';
import { BigNumber } from 'ethers';
import { Control, UseFormRegister, UseFormSetValue } from 'react-hook-form';

import { FixedPointMath } from '@/sdk';

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
  allocation: FixedPointMath;
  tvl: number;
  apr: FixedPointMath;
  stable: boolean;
  isLive: boolean;
  stakingAmount: BigNumber;
}

export interface SafeFarmSummaryData {
  farms: ReadonlyArray<SafeFarmData>;
  loading: boolean;
  intUSDPrice: BigNumber;
}

export type GetSafeFarmSummaryData = (
  chainId: number | null,
  data:
    | ([
        InterestViewEarn.PoolDataStructOutput[],
        InterestViewEarn.MintDataStructOutput,
        BigNumber[]
      ] & {
        pools: InterestViewEarn.PoolDataStructOutput[];
        mintData: InterestViewEarn.MintDataStructOutput;
        prices: BigNumber[];
      })
    | undefined
    | Result
) => SafeFarmSummaryData;
