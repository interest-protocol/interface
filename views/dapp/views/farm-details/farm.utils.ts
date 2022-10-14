import { ethers } from 'ethers';

import {
  FARM_METADATA_MAP,
  TOKEN_FARM_ID_MAP,
  USER_FARM_DATA_PRICES,
  WBNB_INT_ADDRESS_MAP,
} from '@/constants';
import { FixedPointMath, ZERO_ADDRESS, ZERO_BIG_NUMBER } from '@/sdk';
import {
  calculateAllocation,
  calculateFarmBaseAPR,
  calculateFarmTokenPrice,
  calculateIntUSDPrice,
} from '@/utils';

import { GetSafeUserFarmData } from './farm-details.types';

export const getSafeUserFarmData: GetSafeUserFarmData = (
  chainId: number,
  pairAddress,
  data
) => {
  if (!data)
    return {
      intUSDPrice: ZERO_BIG_NUMBER,
      loading: true,
      farm: {
        allocationPoints: ZERO_BIG_NUMBER,
        chainId,
        reserve0: ZERO_BIG_NUMBER,
        reserve1: ZERO_BIG_NUMBER,
        stakingTokenAddress: ZERO_ADDRESS,
        stakingTokenPrice: ZERO_BIG_NUMBER,
        id: 0,
        token1: ZERO_ADDRESS,
        token0: ZERO_ADDRESS,
        totalStakedAmount: ZERO_BIG_NUMBER,
        allocation: FixedPointMath.from(0),
        tvl: 0,
        apr: FixedPointMath.from(0),
        stable: true,
        isLive: true,
        stakingAmount: ZERO_BIG_NUMBER,
        allowance: ZERO_BIG_NUMBER,
        pendingRewards: ZERO_BIG_NUMBER,
        balance: ZERO_BIG_NUMBER,
      },
    };

  const { token0, token1 } =
    FARM_METADATA_MAP[chainId][ethers.utils.getAddress(pairAddress)];

  const tokenPriceMap = USER_FARM_DATA_PRICES[chainId].makeBaseTokensPriceMap(
    pairAddress,
    data.prices
  );

  const farmId =
    TOKEN_FARM_ID_MAP[chainId][ethers.utils.getAddress(pairAddress)];

  const {
    allocationPoints,
    stable,
    reserve1,
    reserve0,
    stakingAmount,
    totalStakingAmount,
    totalSupply,
  } = data.poolData;

  const { balance, pendingRewards, allowance } = data.farmData;

  const ipxWBNBPoolMetadata =
    FARM_METADATA_MAP[chainId][WBNB_INT_ADDRESS_MAP[chainId]];

  const intUSDPrice = calculateIntUSDPrice(
    chainId,
    ipxWBNBPoolMetadata.token0,
    ipxWBNBPoolMetadata.token1,
    data.ipxPoolData.reserve0,
    data.ipxPoolData.reserve1,
    tokenPriceMap
  );

  const stakingTokenPrice =
    farmId === 0
      ? intUSDPrice
      : calculateFarmTokenPrice(
          chainId,
          token0,
          token1,
          reserve0,
          reserve1,
          tokenPriceMap,
          totalSupply
        ).value();

  return {
    intUSDPrice,
    loading: false,
    farm: {
      allocationPoints,
      chainId,
      reserve0,
      reserve1,
      stakingTokenAddress: pairAddress,
      stakingTokenPrice,
      id: farmId,
      token1,
      token0,
      totalStakedAmount: totalStakingAmount,
      allocation: calculateAllocation(
        allocationPoints,
        data.mintData.totalAllocationPoints
      ),
      tvl: FixedPointMath.from(stakingTokenPrice)
        .mul(totalStakingAmount)
        .toNumber(),
      apr: calculateFarmBaseAPR(
        chainId,
        data.mintData.totalAllocationPoints,
        allocationPoints,
        data.mintData.interestPerBlock,
        intUSDPrice,
        totalStakingAmount,
        stakingTokenPrice
      ),
      stable,
      isLive: !allocationPoints.isZero(),
      stakingAmount,
      allowance,
      pendingRewards,
      balance,
    },
  };
};
