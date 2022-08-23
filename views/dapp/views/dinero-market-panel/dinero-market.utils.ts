import { ethers } from 'ethers';
import { UseFormReturn } from 'react-hook-form';

import {
  DINERO_MARKET_DATA_CALL_MAP,
  DINERO_MARKET_METADATA,
  DineroMarketKind,
  FARM_METADATA_MAP,
  WBNB_INT_ADDRESS_MAP,
  WRAPPED_NATIVE_TOKEN,
} from '@/constants';
import { IntMath, ZERO_ADDRESS, ZERO_BIG_NUMBER } from '@/sdk';
import {
  calculateFarmBaseAPR,
  calculateFarmTokenPrice,
  calculateIntUSDPrice,
} from '@/utils';

import { GetSafeDineroMarketData, IBorrowForm } from './dinero-market.types';

export const isFormBorrowEmpty = (form: UseFormReturn<IBorrowForm>) =>
  form.formState.errors.borrow ||
  form.formState.errors.borrow?.['loan'] ||
  form.formState.errors.borrow?.['collateral'];

export const isFormRepayEmpty = (form: UseFormReturn<IBorrowForm>) =>
  form.formState.errors.repay ||
  form.formState.errors.repay?.['loan'] ||
  form.formState.errors.repay?.['collateral'];

const DEFAULT_MARKET_DATA = {
  kind: DineroMarketKind.ERC20,
  loanBase: ZERO_BIG_NUMBER,
  loanElastic: ZERO_BIG_NUMBER,
  interestRate: ZERO_BIG_NUMBER,
  lastAccrued: ZERO_BIG_NUMBER,
  collateralUSDPrice: ZERO_BIG_NUMBER,
  liquidationFee: ZERO_BIG_NUMBER,
  ltv: ZERO_BIG_NUMBER,
  userCollateral: ZERO_BIG_NUMBER,
  userPrincipal: ZERO_BIG_NUMBER,
  collateralAllowance: ZERO_BIG_NUMBER,
  collateralBalance: ZERO_BIG_NUMBER,
  dnrBalance: ZERO_BIG_NUMBER,
  pendingRewards: ZERO_BIG_NUMBER,
  apr: IntMath.from(0),
  symbol0: '',
  symbol1: '',
  name: '',
  stable: false,
  marketAddress: ZERO_ADDRESS,
  collateralDecimals: 18,
  collateralAddress: ZERO_ADDRESS,
};

export const getSafeDineroMarketData: GetSafeDineroMarketData = (
  chainId: number,
  market,
  data
) => {
  if (!chainId || !data) return DEFAULT_MARKET_DATA;

  const marketMetadata =
    DINERO_MARKET_METADATA[chainId][ethers.utils.getAddress(market)];

  const farmsMetadata = FARM_METADATA_MAP[chainId];

  const wrappedNativeToken = WRAPPED_NATIVE_TOKEN[chainId];

  const baseToken = DINERO_MARKET_DATA_CALL_MAP[chainId][market].baseToken;

  if (!marketMetadata || !farmsMetadata || !wrappedNativeToken)
    return DEFAULT_MARKET_DATA;

  if (marketMetadata.kind !== DineroMarketKind.LpFreeMarket)
    return {
      loanBase: data.marketData.loanBase,
      loanElastic: data.marketData.loanElastic,
      interestRate: data.marketData.interestRate,
      lastAccrued: data.marketData.lastAccrued,
      collateralUSDPrice: data.marketData.collateralUSDPrice,
      liquidationFee: data.marketData.liquidationFee,
      ltv: data.marketData.LTV,
      userCollateral: data.marketData.userCollateral,
      userPrincipal: data.marketData.userPrincipal,
      collateralAllowance: data.marketData.collateralAllowance,
      collateralBalance: data.marketData.collateraBalance,
      dnrBalance: data.marketData.dnrBalance,
      pendingRewards: ZERO_BIG_NUMBER,
      apr: IntMath.from(0),
      marketAddress: market,
      ...marketMetadata,
    };

  const nativeIntPoolMetadata = farmsMetadata[WBNB_INT_ADDRESS_MAP[chainId]];

  const tokenPriceMap = {
    [wrappedNativeToken.address]: data.nativeUSDPrice,
    [baseToken]: data.baseTokenUSDPrice,
  };

  const intUSDPrice = calculateIntUSDPrice(
    chainId,
    nativeIntPoolMetadata.token0,
    nativeIntPoolMetadata.token1,
    data.ipxPoolData.reserve0,
    data.ipxPoolData.reserve1,
    tokenPriceMap
  );

  const collateralPoolMetadata =
    farmsMetadata[
      ethers.utils.getAddress(data.collateralPoolData.stakingToken)
    ];

  const stakeTokenUSDPrice = calculateFarmTokenPrice(
    chainId,
    collateralPoolMetadata.token0,
    collateralPoolMetadata.token1,
    data.collateralPoolData.reserve0,
    data.collateralPoolData.reserve1,
    tokenPriceMap,
    data.collateralPoolData.totalStakingAmount
  );

  return {
    loanBase: data.marketData.loanBase,
    loanElastic: data.marketData.loanElastic,
    interestRate: data.marketData.interestRate,
    lastAccrued: data.marketData.lastAccrued,
    collateralUSDPrice: data.marketData.collateralUSDPrice,
    liquidationFee: data.marketData.liquidationFee,
    ltv: data.marketData.LTV,
    userCollateral: data.marketData.userCollateral,
    userPrincipal: data.marketData.userPrincipal,
    collateralAllowance: data.marketData.collateralAllowance,
    collateralBalance: data.marketData.collateraBalance,
    dnrBalance: data.marketData.dnrBalance,
    pendingRewards: data.marketData.pendingRewards,
    marketAddress: market,
    apr: calculateFarmBaseAPR(
      chainId,
      data.mintData.totalAllocationPoints,
      data.collateralPoolData.allocationPoints,
      data.mintData.interestPerBlock,
      intUSDPrice,
      data.collateralPoolData.totalStakingAmount,
      stakeTokenUSDPrice.value()
    ),
    ...marketMetadata,
  };
};
