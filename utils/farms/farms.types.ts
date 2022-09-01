import { BigNumber } from 'ethers';

import { FixedPointMath } from '@/sdk';

export interface TokenPriceMap {
  [key: string]: BigNumber;
}

export type CalculateAllocation = (
  allocationPoints: BigNumber,
  totalAllocationPoints: BigNumber
) => FixedPointMath;

export type CalculateFarmTokenPrice = (
  chainId: number,
  token0: string,
  token1: string,
  reserve0: BigNumber,
  reserve1: BigNumber,
  tokenPriceMap: TokenPriceMap,
  totalSupply: BigNumber
) => FixedPointMath;

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
) => FixedPointMath;
