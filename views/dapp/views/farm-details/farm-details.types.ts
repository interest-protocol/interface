import { Result } from '@ethersproject/abi';
import { BigNumber } from 'ethers';
import { Dispatch, SetStateAction } from 'react';

import { StakeState } from '@/constants';
import { FixedPointMath } from '@/sdk';

import { InterestViewEarn } from '../../../../types/ethers-contracts/InterestViewEarnAbi';

export interface FarmDetailsProps {
  address: `0x${string}`;
  chainId: number;
  modalState: {
    modal: StakeState | undefined;
    setModal: Dispatch<SetStateAction<StakeState | undefined>>;
  };
}

export interface SafeUserFarmData {
  allocationPoints: BigNumber;
  chainId: number;
  reserve0: BigNumber;
  reserve1: BigNumber;
  stakingTokenAddress: `0x${string}`;
  stakingTokenPrice: BigNumber;
  id: number;
  token1: `0x${string}`;
  token0: `0x${string}`;
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

type TFarmPoolDataKeys =
  | 'stakingToken'
  | 'stable'
  | 'reserve0'
  | 'reserve1'
  | 'allocationPoints'
  | 'totalStakingAmount'
  | 'totalSupply'
  | 'stakingAmount';

type TFarmMintDataKeys = 'totalAllocationPoints' | 'interestPerBlock';

type TFarmUserDataKeys = 'allowance' | 'balance' | 'pendingRewards';

export type TFarmDataKeys = {
  ipxPoolData: ReadonlyArray<TFarmPoolDataKeys>;
  poolData: ReadonlyArray<TFarmPoolDataKeys>;
  mintData: ReadonlyArray<TFarmMintDataKeys>;
  farmData: ReadonlyArray<TFarmUserDataKeys>;
};

export type TFarmData =
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
  | Result;

export type GetSafeUserFarmData = (
  chainId: number,
  pairAddress: `0x${string}`,
  data: TFarmData
) => SafeUserFarmSummaryData;
