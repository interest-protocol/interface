import { BigNumber } from 'ethers';

import { IntMath } from '@/sdk';

export interface TokenPriceMap {
  [key: string]: BigNumber;
}

export type CalculateAllocation = (
  allocationPoints: BigNumber,
  totalAllocationPoints: BigNumber
) => IntMath;

export type CalculateFarmTokenPrice = (
  chainId: number,
  token0: string,
  token1: string,
  reserve0: BigNumber,
  reserve1: BigNumber,
  tokenPriceMap: TokenPriceMap,
  totalSupply: BigNumber
) => IntMath;

export type CalculateIntUSDPrice = (
  chainId: number,
  token0: string,
  token1: string,
  reserve0: BigNumber,
  reserve1: BigNumber,
  tokenPriceMap: TokenPriceMap
) => BigNumber;

export type CalculateFarmBaseAPR = (
  chainId: number,
  totalAllocationPoints: BigNumber,
  allocationPoints: BigNumber,
  intPerBlock: BigNumber,
  intUSDPrice: BigNumber,
  stakeAmount: BigNumber,
  stakeTokenUSDPrice: BigNumber
) => IntMath;
