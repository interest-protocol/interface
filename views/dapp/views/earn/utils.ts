import { ethers } from 'ethers';
import { isAddress } from 'ethers/lib/utils';
import {
  always,
  cond,
  equals,
  ifElse,
  isEmpty,
  not,
  o,
  pathOr,
  prop,
  T,
} from 'ramda';

import {
  CASA_DE_PAPEL_FARM_CALL_MAP,
  CASA_DE_PAPEL_FARM_RESPONSE_MAP,
  ERC_20_DATA,
  TOKEN_FARM_ID_MAP,
  UNKNOWN_ERC_20,
} from '@/constants';
import {
  BLOCKS_PER_YEAR,
  CHAIN_ID,
  IntMath,
  ONE_ETHER,
  quote,
  ZERO_BIG_NUMBER,
} from '@/sdk';
import {
  adjustDecimals,
  getIntAddress,
  isSameAddress,
  replaceWrappedNativeTokenWithNativeTokenSymbol,
} from '@/utils';

import { InterestViewEarn } from '../../../../types/ethers-contracts/InterestViewEarnAbi';
import {
  CalculateIntUSDPrice,
  FarmSortByFilter,
  FarmTypeFilter,
  GetSafeFarmSummaryData,
  SafeFarmData,
  TCalculateAllocation,
  TCalculateFarmBaseAPR,
  TCalculateFarmTokenPrice,
} from './earn.types';

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

export const calculateAllocation: TCalculateAllocation = (
  allocationPoints,
  totalAllocationPoints
) => {
  if (totalAllocationPoints.isZero() || allocationPoints.isZero())
    return IntMath.from(0);

  return IntMath.from(allocationPoints).div(totalAllocationPoints);
};

export const calculateFarmBaseAPR: TCalculateFarmBaseAPR = (
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

export const calculateFarmTokenPrice: TCalculateFarmTokenPrice = (
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

const calculateIntUSDPrice: CalculateIntUSDPrice = (
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

export const getSafeFarmSummaryData: GetSafeFarmSummaryData = (
  chainId,
  data
) => {
  if (!data || !chainId)
    return {
      intUSDPrice: ZERO_BIG_NUMBER,
      tokenPriceMap: CASA_DE_PAPEL_FARM_RESPONSE_MAP[
        CHAIN_ID.BNB_TEST_NET
      ].makeBaseTokensPriceMap(
        CASA_DE_PAPEL_FARM_CALL_MAP[CHAIN_ID.BNB_TEST_NET].baseTokens.map(
          always(ZERO_BIG_NUMBER)
        )
      ),
      totalAllocationPoints: ZERO_BIG_NUMBER,
      farms: [
        {
          allocationPoints: ZERO_BIG_NUMBER,
          chainId: CHAIN_ID.UNSUPPORTED,
          reserve0: ZERO_BIG_NUMBER,
          reserve1: ZERO_BIG_NUMBER,
          stakingTokenAddress: ethers.constants.AddressZero,
          id: 1,
          token1: ethers.constants.AddressZero,
          token0: ethers.constants.AddressZero,
          totalStakedAmount: ZERO_BIG_NUMBER,
          allocation: IntMath.from(0),
          tvl: 0,
          apr: IntMath.from(0),
          stakingTokenPrice: ZERO_BIG_NUMBER,
          stable: false,
          allowance: ZERO_BIG_NUMBER,
          balance: ZERO_BIG_NUMBER,
          stakingAmount: ZERO_BIG_NUMBER,
          pendingRewards: ZERO_BIG_NUMBER,
          isLive: true,
        },
      ],
      loading: true,
    };

  const farmResponseMapData = CASA_DE_PAPEL_FARM_RESPONSE_MAP[chainId];

  if (!farmResponseMapData)
    return {
      intUSDPrice: ZERO_BIG_NUMBER,
      tokenPriceMap: CASA_DE_PAPEL_FARM_RESPONSE_MAP[
        CHAIN_ID.BNB_TEST_NET
      ].makeBaseTokensPriceMap(
        CASA_DE_PAPEL_FARM_CALL_MAP[CHAIN_ID.BNB_TEST_NET].baseTokens.map(
          always(ZERO_BIG_NUMBER)
        )
      ),
      totalAllocationPoints: ZERO_BIG_NUMBER,
      farms: [
        {
          totalAllocationPoints: ZERO_BIG_NUMBER,
          allocationPoints: ZERO_BIG_NUMBER,
          chainId: CHAIN_ID.UNSUPPORTED,
          reserve0: ZERO_BIG_NUMBER,
          reserve1: ZERO_BIG_NUMBER,
          stakingTokenAddress: ethers.constants.AddressZero,
          stakingTokenPrice: ZERO_BIG_NUMBER,
          id: 1,
          token1: ethers.constants.AddressZero,
          token0: ethers.constants.AddressZero,
          totalStakedAmount: ZERO_BIG_NUMBER,
          allocation: IntMath.from(0),
          tvl: 0,
          apr: IntMath.from(0),
          stable: false,
          allowance: ZERO_BIG_NUMBER,
          balance: ZERO_BIG_NUMBER,
          stakingAmount: ZERO_BIG_NUMBER,
          pendingRewards: ZERO_BIG_NUMBER,
          isLive: true,
        },
      ],
      loading: true,
    };

  const tokenPriceMap = farmResponseMapData.makeBaseTokensPriceMap(data.prices);

  const intUSDPrice = calculateIntUSDPrice(
    chainId,
    farmResponseMapData.pools[1].token0,
    farmResponseMapData.pools[1].token1,
    data.pools[1].reserve0,
    data.pools[1].reserve1,
    tokenPriceMap
  );

  return {
    intUSDPrice,
    tokenPriceMap,
    totalAllocationPoints: data.mintData.totalAllocationPoints,
    farms: CASA_DE_PAPEL_FARM_RESPONSE_MAP[chainId].pools.map(
      ({ token0, token1, stakingTokenAddress, stable }, index) => {
        const {
          reserve0,
          reserve1,
          totalStakingAmount,
          allocationPoints,
          totalSupply,
        }: InterestViewEarn.PoolDataStructOutput = data.pools[index];

        const { allowance, balance, pendingRewards, stakingAmount } =
          data.farmDatas[index];

        const stakingTokenPrice =
          index === 0
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
          stable,
          stakingTokenAddress,
          stakingTokenPrice: stakingTokenPrice,
          allocationPoints,
          chainId,
          reserve0,
          reserve1,
          id: TOKEN_FARM_ID_MAP[chainId][stakingTokenAddress],
          token0,
          token1,
          totalStakedAmount: totalStakingAmount,
          apr: calculateFarmBaseAPR(
            chainId,
            data.mintData.totalAllocationPoints,
            allocationPoints,
            data.mintData.interestPerBlock,
            intUSDPrice,
            totalStakingAmount,
            stakingTokenPrice
          ),
          tvl: IntMath.from(stakingTokenPrice)
            .mul(totalStakingAmount)
            .toNumber(),
          allocation: calculateAllocation(
            allocationPoints,
            data.mintData.totalAllocationPoints
          ),
          allowance,
          balance,
          stakingAmount,
          pendingRewards,
          isLive: !allocationPoints.isZero(),
        };
      }
    ),
    loading: false,
  };
};

const sortByIdFn = (x: SafeFarmData, y: SafeFarmData) => (x.id < y.id ? -1 : 1);

const sortByAPRFn = (x: SafeFarmData, y: SafeFarmData) =>
  x.apr.lt(y.apr) ? 1 : -1;

const sortByAllocationFn = (x: SafeFarmData, y: SafeFarmData) =>
  x.allocation.lt(y.allocation) ? 1 : -1;

const sortByTVLFn = (x: SafeFarmData, y: SafeFarmData) =>
  x.tvl < y.tvl ? 1 : -1;

const sortByOperation = cond([
  [equals(FarmSortByFilter.Default), always(sortByIdFn)],
  [equals(FarmSortByFilter.APR), always(sortByAPRFn)],
  [equals(FarmSortByFilter.Allocation), always(sortByAllocationFn)],
  [equals(FarmSortByFilter.TVL), always(sortByTVLFn)],
  [T, always(sortByIdFn)],
]);

const searchOperation = cond([
  [isEmpty, always(T)],
  [
    T,
    (search: string) => {
      const parsedSearch = search.toLocaleLowerCase();
      return ({ chainId, token0, token1 }: SafeFarmData) => {
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

        if (isAddress(search))
          return isSameAddress(search, token0) || isSameAddress(search, token1);

        const farmName = `${replaceWrappedNativeTokenWithNativeTokenSymbol(
          erc0.symbol
        )}-${replaceWrappedNativeTokenWithNativeTokenSymbol(erc1.symbol)}`;

        return (
          token1.toLocaleLowerCase().includes(parsedSearch) ||
          token0.toLocaleLowerCase().includes(parsedSearch) ||
          erc0.name.toLocaleLowerCase().includes(parsedSearch) ||
          erc1.name.toLocaleLowerCase().includes(parsedSearch) ||
          erc0.symbol.toLocaleLowerCase().includes(parsedSearch) ||
          erc1.symbol.toLocaleLowerCase().includes(parsedSearch) ||
          farmName.toLocaleLowerCase().includes(parsedSearch) ||
          farmName
            .toLocaleLowerCase()
            .replace(/[^a-zA-Z]/g, '')
            .includes(parsedSearch.replace(/[^a-zA-Z]/g, ''))
        );
      };
    },
  ],
]);

const typeOperation = cond([
  [equals(FarmTypeFilter.Stable), always(prop<string, boolean>('stable'))],
  [
    equals(FarmTypeFilter.Volatile),
    always(o(not, prop<'stable', boolean>('stable'))),
  ],
  [T, always(T)],
]) as any;

const onlyStakedOperation = ifElse<
  any[],
  (x: SafeFarmData) => boolean,
  (x: SafeFarmData) => boolean
>(
  equals(true),
  always(({ stakingAmount }) => !stakingAmount.isZero()),
  always(T)
);

const onlyFinishedOperation = ifElse<
  any[],
  (x: SafeFarmData) => boolean,
  (x: SafeFarmData) => boolean
>(
  equals(true),
  always(({ isLive }) => !isLive),
  always(prop('isLive'))
);

export const handleFilterFarms = (
  farms: ReadonlyArray<SafeFarmData>,
  sortBy: FarmSortByFilter,
  search: string,
  farmTypeFilter: FarmTypeFilter,
  onlyStaked: boolean,
  onlyFinished: boolean
) =>
  sortBy === FarmSortByFilter.Default
    ? farms.filter((x) =>
        [
          typeOperation(farmTypeFilter),
          searchOperation(search.trim()),
          onlyStakedOperation(onlyStaked),
          onlyFinishedOperation(onlyFinished),
        ].every((pred) => pred(x))
      )
    : farms
        .slice()
        .sort(sortByOperation(sortBy))
        .filter((x) =>
          [
            typeOperation(farmTypeFilter),
            searchOperation(search.trim()),
            onlyStakedOperation(onlyStaked),
            onlyFinishedOperation(onlyFinished),
          ].every((pred) => pred(x))
        );
