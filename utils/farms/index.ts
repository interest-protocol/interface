import { ethers } from 'ethers';
import { pathOr } from 'ramda';

import { ERC_20_DATA, UNKNOWN_ERC_20 } from '@/constants';
import { BLOCKS_PER_YEAR, IntMath, ONE_ETHER, quote } from '@/sdk';
import { replaceWrappedNativeTokenWithNativeTokenSymbol } from '@/utils/erc-20';

import { isSameAddress } from '../address';
import { adjustDecimals } from '../big-number';
import { getIntAddress } from '../contracts';
import {
  CalculateAllocation,
  CalculateFarmBaseAPR,
  CalculateFarmTokenPrice,
  CalculateIntUSDPrice,
} from './farms.types';

export const calculateAllocation: CalculateAllocation = (
  allocationPoints,
  totalAllocationPoints
) => {
  if (totalAllocationPoints.isZero() || allocationPoints.isZero())
    return IntMath.from(0);

  return IntMath.from(allocationPoints).div(totalAllocationPoints);
};

export const calculateFarmTokenPrice: CalculateFarmTokenPrice = (
  chainId,
  token0,
  token1,
  reserve0,
  reserve1,
  tokenPriceMap,
  totalSupply
) => {
  const baseToken = tokenPriceMap[token0] ? token0 : token1;

  // Base token is token 0
  const isToken0 = isSameAddress(baseToken, token0);

  // Reserve of the base token
  const reserve = isToken0 ? reserve0 : reserve1;

  const baseTokenDecimals =
    ERC_20_DATA[chainId][ethers.utils.getAddress(baseToken)].decimals;

  const reserveInUSD = IntMath.from(
    adjustDecimals(reserve.mul(2), baseTokenDecimals)
  ).mul(tokenPriceMap[baseToken]);

  return reserveInUSD.div(totalSupply);
};

export const calculateIntUSDPrice: CalculateIntUSDPrice = (
  chainId,
  token0,
  token1,
  reserve0,
  reserve1,
  tokenPriceMap
) => {
  const isIntToken0 = isSameAddress(getIntAddress(chainId), token0);

  const intPrice = isIntToken0
    ? quote(ONE_ETHER, reserve0, reserve1)
    : quote(ONE_ETHER, reserve1, reserve0);

  return IntMath.from(intPrice)
    .mul(tokenPriceMap[isIntToken0 ? token1 : token0])
    .value();
};

export const makeFarmSymbol = (
  chainId: number,
  token0: string,
  token1: string
): string => {
  const erc0 = pathOr(
    UNKNOWN_ERC_20,
    [chainId.toString(), token0],
    ERC_20_DATA
  );
  const erc1 = pathOr(
    UNKNOWN_ERC_20,
    [chainId.toString(), token1],
    ERC_20_DATA
  );

  return `${replaceWrappedNativeTokenWithNativeTokenSymbol(
    erc0.symbol
  )}-${replaceWrappedNativeTokenWithNativeTokenSymbol(erc1.symbol)}`;
};

export const calculateFarmBaseAPR: CalculateFarmBaseAPR = (
  chainId,
  totalAllocationPoints,
  allocationPoints,
  intPerBlock,
  intUSDPrice,
  stakeAmount,
  stakeTokenUSDPrice
) => {
  if (
    totalAllocationPoints.isZero() ||
    allocationPoints.isZero() ||
    intUSDPrice.isZero() ||
    intPerBlock.isZero() ||
    stakeAmount.isZero() ||
    stakeTokenUSDPrice.isZero()
  )
    return IntMath.from(0);

  const farmRewardsAllocationPerYear = intPerBlock
    .mul(BLOCKS_PER_YEAR[chainId])
    .mul(allocationPoints)
    .div(totalAllocationPoints);

  const underlyingValueInUSD =
    IntMath.from(stakeAmount).mul(stakeTokenUSDPrice);

  return IntMath.from(farmRewardsAllocationPerYear)
    .mul(intUSDPrice)
    .div(underlyingValueInUSD);
};
