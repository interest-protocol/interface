import { Result } from '@ethersproject/abi';
import { BigNumber } from 'ethers';

import { FixedPointMath } from '@/sdk';

import { InterestViewEarn } from '../../../../types/ethers-contracts/InterestViewEarnAbi';

export interface EarnFarmProps {
  address: string;
}

export interface SafeUserFarmData {
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
  allowance: BigNumber;
  pendingRewards: BigNumber;
  balance: BigNumber;
}

export interface SafeUserFarmSummaryData {
  farm: SafeUserFarmData;
  loading: boolean;
  intUSDPrice: BigNumber;
}

export type GetSafeUserFarmData = (
  chainId: number,
  pairAddress: string,
  data:
    | undefined
    | ([
        InterestViewEarn.PoolDataStructOutput,
        InterestViewEarn.PoolDataStructOutput,
        InterestViewEarn.MintDataStructOutput,
        InterestViewEarn.UserFarmDataStructOutput,
        BigNumber[]
      ] & {
        ipxPoolData: InterestViewEarn.PoolDataStructOutput;
        poolData: InterestViewEarn.PoolDataStructOutput;
        mintData: InterestViewEarn.MintDataStructOutput;
        farmData: InterestViewEarn.UserFarmDataStructOutput;
        prices: BigNumber[];
      })
    | Result
) => SafeUserFarmSummaryData;
