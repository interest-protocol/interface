import { Web3Provider } from '@ethersproject/providers';
import { BigNumber, ContractTransaction } from 'ethers';

import { FarmV2 } from '@/sdk/entities/farm-v2';
import { IntMath } from '@/sdk/entities/int-math';

export type TGetCasaDePapelMintData = (provider: Web3Provider) => Promise<{
  totalAllocationPoints: BigNumber;
  interestTokenPerBlock: BigNumber;
}>;

export type TGetUserPoolData = (
  provider: Web3Provider,
  account: string,
  id: number
) => Promise<{
  stakingAmount: BigNumber;
  pendingRewards: BigNumber;
}>;

export type TGetPoolData = (
  provider: Web3Provider,
  id: number
) => Promise<{
  stakingToken: string;
  allocationPoints: BigNumber;
  totalSupply: BigNumber;
}>;

export type TCalculateTVL = (
  basePrice: BigNumber,
  baseTokenAddress: string,
  farm: FarmV2
) => string;

export type TCalculateFarmBaseAPR = (
  intPerBlock: BigNumber,
  basePrice: BigNumber,
  baseTokenAddress: string,
  farm: FarmV2
) => string;

export type TCalculateAllocation = (farm: FarmV2) => string;

export type TCalculateFarmTokenPrice = (
  basePrice: BigNumber,
  farm: FarmV2,
  totalSupply: BigNumber
) => IntMath;

export type TGetRewards = (
  provider: Web3Provider,
  account: string,
  id: number
) => Promise<ContractTransaction>;

export type TManageLP = (
  provider: Web3Provider,
  account: string,
  id: number,
  amount: BigNumber
) => Promise<ContractTransaction>;
