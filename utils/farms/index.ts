import { BigNumber, ethers } from 'ethers';

import {
  CASA_DE_PAPEL_FARM_RESPONSE_MAP,
  ERC_20_DATA,
  UNKNOWN_ERC_20,
} from '@/constants';
import {
  BLOCKS_PER_YEAR,
  CHAIN_ID,
  CurrencyAmount,
  ERC20,
  IntMath,
  LPPairV2,
  ONE_ETHER,
  quote,
  TOKEN_SYMBOL,
  ZERO_BIG_NUMBER,
} from '@/sdk';
import { FarmV2 } from '@/sdk';

import { ReservesStructOutput } from '../../types/ethers-contracts/InterestViewDineroAbi';
import { formatDollars, getIntAddress, isSameAddress } from '..';
import {
  GetSafeFarmSummaryData,
  TCalculateAllocation,
  TCalculateFarmBaseAPR,
  TCalculateFarmTokenPrice,
  TCalculateFarmTVL,
} from './farms.types';

export const calculateFarmTVL: TCalculateFarmTVL = (
  basePrice,
  baseToken,
  farm
) => {
  if (basePrice.isZero() || !farm.stakingToken.hasToken(baseToken))
    return formatDollars(0);

  const reserve = farm.stakingToken.getReserve(baseToken);
  const tvl = IntMath.from(basePrice).mul(reserve).value().mul(2);
  return formatDollars(IntMath.toNumber(tvl));
};

export const findBaseToken = (
  chainId: number,
  price: ReadonlyArray<BigNumber>,
  farm: FarmV2<LPPairV2>
): CurrencyAmount<ERC20> => {
  const [token] = CASA_DE_PAPEL_FARM_RESPONSE_MAP[chainId].baseTokens
    .map((x, index) => CurrencyAmount.fromRawAmount(x, price[index]))
    .filter((x) => farm.stakingToken.hasToken(x.currency));

  return token;
};

export const calculateAllocation: TCalculateAllocation = (farm) => {
  if (farm.allocationPoints.isZero() || farm.totalAllocationPoints.isZero())
    return '0%';

  return `${farm.allocationPoints.mul(100).div(farm.totalAllocationPoints)}%`;
};

export const findBaseTokenPrice = (
  farm: FarmV2<LPPairV2>,
  baseTokens: ReadonlyArray<CurrencyAmount<ERC20>>
): CurrencyAmount<ERC20> => {
  const [result] = baseTokens.filter((x) =>
    farm.stakingToken.hasToken(x.currency)
  );

  return result;
};

export const calculateFarmBaseAPR: TCalculateFarmBaseAPR = (
  chainId,
  farm,
  intPerBlock,
  intUSDPrice,
  stakeAmount,
  stakeTokeUSDPrice
) => {
  if (
    farm.totalAllocationPoints.isZero() ||
    farm.allocationPoints.isZero() ||
    intUSDPrice.isZero() ||
    intPerBlock.isZero() ||
    stakeAmount.isZero() ||
    stakeTokeUSDPrice.isZero()
  )
    return '0%';

  const farmRewardsAllocationPerYear = intPerBlock
    .mul(BLOCKS_PER_YEAR[chainId])
    .mul(farm.allocationPoints)
    .div(farm.totalAllocationPoints);

  const underlyingValueInUSD = IntMath.from(stakeAmount).mul(stakeTokeUSDPrice);

  return IntMath.from(farmRewardsAllocationPerYear)
    .mul(intUSDPrice)
    .div(underlyingValueInUSD)
    .toPercentage();
};

export const calculateFarmTokenPrice: TCalculateFarmTokenPrice = (
  chainId,
  baseTokenAddress,
  basePrice,
  farm,
  totalSupply
) => {
  // Base token is token 0
  const isToken0 = isSameAddress(
    farm.stakingToken.token0.address,
    baseTokenAddress
  );

  // LP Token  logic
  const reserve = isToken0
    ? farm.stakingToken.reserves0
    : farm.stakingToken.reserves1;

  const reserveInUSD = IntMath.from(reserve.mul(2)).mul(basePrice);

  return reserveInUSD.div(totalSupply);
};

const calculateIntUSDPrice = (
  chainId: number,
  reserves: ReservesStructOutput,
  prices: ReadonlyArray<BigNumber>
) => {
  const { pair } = CASA_DE_PAPEL_FARM_RESPONSE_MAP[chainId].pools[0];
  const isIntToken0 = isSameAddress(getIntAddress(chainId), pair[0].address);
  const baseTokenPrice = CASA_DE_PAPEL_FARM_RESPONSE_MAP[
    chainId
  ].baseTokens.reduce((acc, x, i) => {
    if (
      isSameAddress(x.address, pair[0].address) ||
      isSameAddress(x.address, pair[1].address)
    )
      return prices[i];

    return acc;
  }, ZERO_BIG_NUMBER);

  const intPrice = isIntToken0
    ? quote(ONE_ETHER, reserves.reserve0, reserves.reserve1)
    : quote(ONE_ETHER, reserves.reserve1, reserves.reserve0);

  return IntMath.from(intPrice).mul(baseTokenPrice).value();
};

export const getSafeFarmSummaryData: GetSafeFarmSummaryData = (
  chainId,
  data
) => {
  if (!data || !chainId)
    return {
      intUSDPrice: ZERO_BIG_NUMBER,
      pools: [
        {
          farm: FarmV2.createIntPool({
            int: UNKNOWN_ERC_20,
            totalStakedAmount: ZERO_BIG_NUMBER,
            totalAllocationPoints: ZERO_BIG_NUMBER,
            allocationPoints: ZERO_BIG_NUMBER,
          }),
          allocation: '',
          tvl: '',
          apr: '',
          farmTokenPrice: CurrencyAmount.fromRawAmount(
            UNKNOWN_ERC_20,
            ZERO_BIG_NUMBER
          ),
        },
      ],
      farms: [
        {
          farm: FarmV2.createPCSPairFarmV2({
            totalAllocationPoints: ZERO_BIG_NUMBER,
            allocationPoints: ZERO_BIG_NUMBER,
            chainId: CHAIN_ID.UNSUPPORTED,
            reserves0: ZERO_BIG_NUMBER,
            reserves1: ZERO_BIG_NUMBER,
            address: ethers.constants.AddressZero,
            id: 1,
            token1: UNKNOWN_ERC_20,
            token0: UNKNOWN_ERC_20,
            totalStakedAmount: ZERO_BIG_NUMBER,
          }),
          allocation: '',
          tvl: '',
          apr: '',
          farmTokenPrice: CurrencyAmount.fromRawAmount(
            UNKNOWN_ERC_20,
            ZERO_BIG_NUMBER
          ),
        },
      ],
      loading: true,
    };

  const intUSDPrice = calculateIntUSDPrice(
    chainId,
    data.reserves[0],
    data.prices
  );

  const intPool = FarmV2.createIntPool({
    int: ERC_20_DATA[chainId][TOKEN_SYMBOL.INT],
    allocationPoints: data.poolsData[0].allocationPoints,
    totalAllocationPoints: data.mintData.totalAllocationPoints,
    totalStakedAmount: data.poolsData[0].totalStakingAmount,
  });

  return {
    intUSDPrice,
    pools: [
      {
        farmTokenPrice: CurrencyAmount.fromRawAmount(
          ERC_20_DATA[chainId][TOKEN_SYMBOL.INT],
          intUSDPrice
        ),
        farm: intPool,
        allocation: calculateAllocation(intPool),
        apr: calculateFarmBaseAPR(
          chainId,
          intPool,
          data.mintData.interestPerBlock,
          intUSDPrice,
          data.poolsData[0].totalStakingAmount,
          intUSDPrice
        ),
        tvl: formatDollars(
          IntMath.from(data.poolsData[0].totalStakingAmount)
            .mul(intUSDPrice)
            .toNumber()
        ),
      },
    ],
    farms: CASA_DE_PAPEL_FARM_RESPONSE_MAP[chainId].pools
      .slice(1)
      .map(({ address, pair: [token0, token1] }, index) => {
        const poolsData = data.poolsData[index + 1];
        const reserves = data.reserves[index + 1];
        const totalSupply = data.totalSupplies[index + 1];

        const farm = FarmV2.createPCSPairFarmV2({
          token0,
          token1,
          chainId,
          address,
          totalStakedAmount: poolsData.totalStakingAmount,
          totalAllocationPoints: data.mintData.totalAllocationPoints,
          allocationPoints: poolsData.allocationPoints,
          id: index + 1,
          reserves1: reserves.reserve1,
          reserves0: reserves.reserve0,
        });

        const baseToken = findBaseToken(chainId, data.prices, farm);

        const farmTokenPrice = calculateFarmTokenPrice(
          chainId,
          baseToken.currency.address,
          baseToken.numerator,
          farm,
          totalSupply
        );

        return {
          farmTokenPrice: CurrencyAmount.fromRawAmount(
            farm.stakingToken,
            farmTokenPrice.value()
          ),
          farm,
          allocation: calculateAllocation(farm),
          apr: calculateFarmBaseAPR(
            chainId,
            farm,
            data.mintData.interestPerBlock,
            intUSDPrice,
            poolsData.totalStakingAmount,
            farmTokenPrice.value()
          ),
          tvl: calculateFarmTVL(baseToken.numerator, baseToken.currency, farm),
        };
      }),
    loading: false,
  };
};
