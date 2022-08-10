import { ethers } from 'ethers';
import { always, pathOr } from 'ramda';

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
  TOKEN_SYMBOL,
  ZERO_BIG_NUMBER,
} from '@/sdk';
import { formatDollars, getIntAddress, isSameAddress } from '@/utils';

import { InterestViewEarn } from '../../../../types/ethers-contracts/InterestViewEarnAbi';
import {
  CalculateIntUSDPrice,
  GetSafeFarmSummaryData,
  TCalculateAllocation,
  TCalculateFarmBaseAPR,
  TCalculateFarmTokenPrice,
} from './earn.types';

export const makeFarmSymbol = (
  chainId: number,
  token0: string,
  token1: string,
  stable: boolean
) => {
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

  return `${changeSymbol(erc0.symbol)}-${changeSymbol(erc1.symbol)}`;
};

const changeSymbol = (symbol: TOKEN_SYMBOL) =>
  symbol == TOKEN_SYMBOL.WBNB ? TOKEN_SYMBOL.BNB : symbol;

export const calculateAllocation: TCalculateAllocation = (
  allocationPoints,
  totalAllocationPoints
) => {
  if (totalAllocationPoints.isZero() || allocationPoints.isZero()) return '0%';

  return `${IntMath.from(allocationPoints)
    .div(totalAllocationPoints)
    .toPercentage(2)}`;
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
    return '0%';

  const farmRewardsAllocationPerYear = intPerBlock
    .mul(BLOCKS_PER_YEAR[chainId])
    .mul(allocationPoints)
    .div(totalAllocationPoints);

  const underlyingValueInUSD =
    IntMath.from(stakeAmount).mul(stakeTokenUSDPrice);

  return IntMath.from(farmRewardsAllocationPerYear)
    .mul(intUSDPrice)
    .div(underlyingValueInUSD)
    .toPercentage();
};

export const calculateFarmTokenPrice: TCalculateFarmTokenPrice = (
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

  const reserveInUSD = IntMath.from(reserve.mul(2)).mul(
    tokenPriceMap[baseToken]
  );

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
  console.log('renderizou');

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
          allocation: '',
          tvl: '',
          apr: '',
          stakingTokenPrice: ZERO_BIG_NUMBER,
          stable: false,
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
          allocation: '',
          tvl: '',
          apr: '',
          stable: false,
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

  console.log(
    data.mintData.totalAllocationPoints.toString(),
    'total allocation points'
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

        console.log(index, allocationPoints.toString());

        const stakingTokenPrice =
          index === 0
            ? intUSDPrice
            : calculateFarmTokenPrice(
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
          tvl: formatDollars(
            IntMath.from(stakingTokenPrice).mul(totalStakingAmount).toNumber()
          ),
          allocation: calculateAllocation(
            allocationPoints,
            data.mintData.totalAllocationPoints
          ),
        };
      }
    ),
    loading: false,
  };
};
