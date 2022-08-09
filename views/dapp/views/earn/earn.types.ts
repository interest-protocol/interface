import { BigNumber } from 'ethers';
import { Dispatch, SetStateAction } from 'react';
import { Control, UseFormRegister, UseFormSetValue } from 'react-hook-form';

import { IntMath } from '@/sdk';

import { InterestViewEarn } from '../../../../types/ethers-contracts/InterestViewEarnAbi';

export interface EarnFiltersProps extends EarnFilterManagerProps {
  register: UseFormRegister<IEarnForm>;
}

export interface EarnFilterManagerProps {
  control: Control<IEarnForm>;
  setValue: UseFormSetValue<IEarnForm>;
  isFilterSearch: boolean;
  setIsFilterSearch: Dispatch<SetStateAction<boolean>>;
}

export interface IEarnForm {
  search: string;
  sortBy: string;
  isStaked: boolean;
  isLive: boolean;
}

export type TCalculateFarmBaseAPR = (
  chainId: number,
  totalAllocationPoints: BigNumber,
  allocationPoints: BigNumber,
  intPerBlock: BigNumber,
  intUSDPrice: BigNumber,
  stakeAmount: BigNumber,
  stakeTokenUSDPrice: BigNumber
) => string;

export type TCalculateAllocation = (
  allocationPoints: BigNumber,
  totalAllocationPoints: BigNumber
) => string;

export type TCalculateFarmTokenPrice = (
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
  allocation: string;
  tvl: string;
  apr: string;
  stable: boolean;
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
        BigNumber[]
      ] & {
        pools: InterestViewEarn.PoolDataStructOutput[];
        mintData: InterestViewEarn.MintDataStructOutput;
        prices: BigNumber[];
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
