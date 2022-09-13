import { BigNumber, ethers } from 'ethers';
import { UseFormReturn } from 'react-hook-form';

import {
  DINERO_MARKET_DATA_CALL_MAP,
  DINERO_MARKET_METADATA,
  DineroMarketKind,
  FARM_METADATA_MAP,
  getDineroMarketSVGBySymbol,
  TOKENS_SVG_MAP,
  WBNB_INT_ADDRESS_MAP,
  WRAPPED_NATIVE_TOKEN,
} from '@/constants';
import {
  CHAIN_ID,
  FixedPointMath,
  SECONDS_IN_A_YEAR,
  TOKEN_SYMBOL,
  ZERO_ADDRESS,
  ZERO_BIG_NUMBER,
} from '@/sdk';
import { Fraction } from '@/sdk/entities/fraction';
import { closeTo } from '@/sdk/utils';
import {
  adjustDecimals,
  calculateFarmBaseAPR,
  calculateFarmTokenPrice,
  calculateIntUSDPrice,
  formatMoney,
  numberToString,
} from '@/utils';

import {
  GetSafeDineroMarketData,
  IBorrowForm,
  IBorrowFormField,
  TCalculateBorrowAmount,
  TCalculateDineroLeftToBorrow,
  TCalculateExpectedLiquidationPrice,
  TCalculateInterestAccrued,
  TCalculatePositionHealth,
  TCalculateUserCurrentLTV,
  TGetBorrowFields,
  TGetBorrowPositionHealthData,
  TGetInfoLoanData,
  TGetMyPositionData,
  TGetPositionHealthDataInternal,
  TGetRepayFields,
  TGetRepayPositionHealthData,
  TLoanElasticToPrincipal,
  TLoanPrincipalToElastic,
  TSafeAmountToWithdraw,
  TSafeAmountToWithdrawRepay,
} from './dinero-market.types';

export const isFormBorrowEmpty = (form: UseFormReturn<IBorrowForm>) =>
  form.formState.errors.borrow ||
  form.formState.errors.borrow?.['loan'] ||
  form.formState.errors.borrow?.['collateral'];

export const isFormRepayEmpty = (form: UseFormReturn<IBorrowForm>) =>
  form.formState.errors.repay ||
  form.formState.errors.repay?.['loan'] ||
  form.formState.errors.repay?.['collateral'];

const makeSymbol = (
  symbol0: string,
  symbol1: string,
  kind: DineroMarketKind
) => {
  if (kind === DineroMarketKind.LpFreeMarket) return `${symbol0}-${symbol1}`;

  return `${symbol0}`;
};

const DEFAULT_MARKET_DATA = {
  kind: DineroMarketKind.ERC20,
  loanElastic: ZERO_BIG_NUMBER,
  loanBase: ZERO_BIG_NUMBER,
  userPrincipal: ZERO_BIG_NUMBER,
  userCollateral: ZERO_BIG_NUMBER,
  adjustedUserCollateral: ZERO_BIG_NUMBER,
  interestRate: ZERO_BIG_NUMBER,
  lastAccrued: ZERO_BIG_NUMBER,
  collateralUSDPrice: ZERO_BIG_NUMBER,
  liquidationFee: ZERO_BIG_NUMBER,
  ltv: ZERO_BIG_NUMBER,
  collateralAllowance: ZERO_BIG_NUMBER,
  collateralBalance: ZERO_BIG_NUMBER,
  adjustedCollateralBalance: ZERO_BIG_NUMBER,
  dnrBalance: ZERO_BIG_NUMBER,
  pendingRewards: ZERO_BIG_NUMBER,
  apr: FixedPointMath.from(0),
  symbol0: '',
  symbol1: '',
  name: '',
  stable: false,
  marketAddress: ZERO_ADDRESS,
  collateralDecimals: 18,
  collateralAddress: ZERO_ADDRESS,
  intUSDPrice: ZERO_BIG_NUMBER,
  chainId: CHAIN_ID.BNB_TEST_NET,
  maxBorrowAmount: ZERO_BIG_NUMBER,
  rewardsBalance: ZERO_BIG_NUMBER,
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
      collateralBalance: data.marketData.collateralBalance,
      dnrBalance: data.marketData.dnrBalance,
      pendingRewards: ZERO_BIG_NUMBER,
      apr: FixedPointMath.from(0),
      intUSDPrice: ZERO_BIG_NUMBER,
      marketAddress: market,
      chainId,
      maxBorrowAmount: data.marketData.maxBorrowAmount,
      adjustedCollateralBalance: adjustDecimals(
        data.marketData.collateralBalance,
        marketMetadata.collateralDecimals
      ),
      adjustedUserCollateral: adjustDecimals(
        data.marketData.userCollateral,
        marketMetadata.collateralDecimals
      ),
      rewardsBalance: ZERO_BIG_NUMBER,
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
    data.collateralPoolData.totalSupply
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
    collateralBalance: data.marketData.collateralBalance,
    dnrBalance: data.marketData.dnrBalance,
    pendingRewards: data.marketData.pendingRewards,
    marketAddress: market,
    intUSDPrice,
    chainId,
    maxBorrowAmount: data.marketData.maxBorrowAmount,
    apr: calculateFarmBaseAPR(
      chainId,
      data.mintData.totalAllocationPoints,
      data.collateralPoolData.allocationPoints,
      data.mintData.interestPerBlock,
      intUSDPrice,
      data.collateralPoolData.totalStakingAmount,
      stakeTokenUSDPrice.value()
    ),
    adjustedCollateralBalance: adjustDecimals(
      data.marketData.collateralBalance,
      marketMetadata.collateralDecimals
    ),
    adjustedUserCollateral: adjustDecimals(
      data.marketData.userCollateral,
      marketMetadata.collateralDecimals
    ),
    rewardsBalance: data.marketData.rewardsBalance,
    ...marketMetadata,
  };
};

export const calculateInterestAccrued: TCalculateInterestAccrued = ({
  loanElastic,
  lastAccrued,
  interestRate,
}) => {
  const lasAccrued = lastAccrued.toNumber() * 1000;

  const now = new Date().getTime();

  const timeDelta = now - lasAccrued;

  return FixedPointMath.from(loanElastic)
    .mul(interestRate.mul(timeDelta))
    .value()
    .div(1000);
};

export const loanPrincipalToElastic: TLoanPrincipalToElastic = ({
  loanBase,
  loanElastic,
  userPrincipal,
  lastAccrued,
  interestRate,
}): FixedPointMath => {
  if (loanBase.isZero()) return FixedPointMath.from(userPrincipal);

  const interestAccrued = calculateInterestAccrued({
    loanElastic,
    lastAccrued,
    interestRate,
  });

  return FixedPointMath.from(
    userPrincipal.mul(loanElastic.add(interestAccrued)).div(loanBase)
  );
};

export const loanElasticToPrincipal: TLoanElasticToPrincipal = ({
  loanBase,
  loanElastic,
  userElastic,
  lastAccrued,
  interestRate,
}): FixedPointMath => {
  if (loanElastic.isZero()) return FixedPointMath.from(userElastic);
  return FixedPointMath.from(
    userElastic
      .mul(loanBase)
      .div(
        loanElastic.add(
          calculateInterestAccrued({ loanElastic, lastAccrued, interestRate })
        )
      )
  );
};

export const calculateExpectedLiquidationPrice: TCalculateExpectedLiquidationPrice =
  ({
    ltv,
    collateralUSDPrice,
    userElasticLoan,
    adjustUserCollateral,
  }): FixedPointMath => {
    if (adjustUserCollateral.isZero())
      return FixedPointMath.from(collateralUSDPrice);

    const fixedPointUserElasticLoan = FixedPointMath.from(userElasticLoan);

    const userCollateralValue =
      FixedPointMath.from(adjustUserCollateral).mul(ltv);

    return fixedPointUserElasticLoan.div(userCollateralValue);
  };

export const calculatePositionHealth: TCalculatePositionHealth = (
  { ltv, userPrincipal, adjustedUserCollateral, collateralUSDPrice },
  userElasticLoan
): FixedPointMath => {
  if (userPrincipal.isZero())
    return FixedPointMath.from(ethers.utils.parseEther('1'));

  if (adjustedUserCollateral.isZero()) return FixedPointMath.from(0);

  const userCollateralValue = FixedPointMath.from(adjustedUserCollateral)
    .mul(collateralUSDPrice)
    .mul(ltv);

  const fixedMathUserElasticLoan = FixedPointMath.from(userElasticLoan);

  if (fixedMathUserElasticLoan.gte(userCollateralValue))
    return FixedPointMath.from(0);

  return FixedPointMath.from(ethers.utils.parseEther('1')).sub(
    fixedMathUserElasticLoan.div(userCollateralValue)
  );
};

export const calculateDineroLeftToBorrow: TCalculateDineroLeftToBorrow = ({
  ltv,
  adjustedUserCollateral,
  loanBase,
  userPrincipal,
  lastAccrued,
  loanElastic,
  interestRate,
  collateralUSDPrice,
  maxBorrowAmount,
}): FixedPointMath => {
  const userElasticLoan = loanPrincipalToElastic({
    loanBase,
    loanElastic,
    userPrincipal,
    lastAccrued,
    interestRate,
  });

  const collateralInUSD = FixedPointMath.from(ltv)
    .mul(adjustedUserCollateral)
    .mul(collateralUSDPrice);

  if (userElasticLoan.gte(collateralInUSD)) return FixedPointMath.from(0);

  const leftMarketBorrowAmount = maxBorrowAmount.sub(loanElastic);

  if (userElasticLoan.gte(leftMarketBorrowAmount))
    return FixedPointMath.from(0);

  return collateralInUSD.sub(userElasticLoan);
};

export const safeAmountToWithdrawRepay: TSafeAmountToWithdrawRepay = (
  {
    ltv,
    adjustedUserCollateral,
    collateralUSDPrice,
    loanBase,
    userPrincipal,
    lastAccrued,
    loanElastic,
    interestRate,
  },
  repayLoan
) => {
  if (loanElastic.isZero()) return FixedPointMath.from(adjustedUserCollateral);

  const userLoanElastic = loanPrincipalToElastic({
    loanBase,
    loanElastic,
    userPrincipal,
    lastAccrued,
    interestRate,
  });

  if (repayLoan.gte(userLoanElastic.value()))
    return FixedPointMath.from(adjustedUserCollateral);

  const userNeededCollateralInUSD = FixedPointMath.from(
    loanElastic.sub(repayLoan)
  ).div(ltv);

  const collateralInUSD = FixedPointMath.from(adjustedUserCollateral).mul(
    collateralUSDPrice
  );

  const amount = userNeededCollateralInUSD.gte(collateralInUSD.value())
    ? FixedPointMath.from(ZERO_BIG_NUMBER)
    : collateralInUSD.sub(userNeededCollateralInUSD).div(collateralUSDPrice);

  return amount.mul(ethers.utils.parseEther('0.95'));
};

export const safeAmountToWithdraw: TSafeAmountToWithdraw = ({
  ltv,
  loanBase,
  lastAccrued,
  loanElastic,
  interestRate,
  userPrincipal,
  adjustedUserCollateral,
  collateralUSDPrice,
}) => {
  if (loanElastic.isZero()) return FixedPointMath.from(adjustedUserCollateral);

  const userNeededCollateralInUSD = loanPrincipalToElastic({
    loanBase,
    loanElastic,
    userPrincipal,
    lastAccrued,
    interestRate,
  }).div(ltv);

  const collateralInUSD = FixedPointMath.from(adjustedUserCollateral).mul(
    collateralUSDPrice
  );

  const amount = userNeededCollateralInUSD.gte(collateralInUSD)
    ? FixedPointMath.from(ZERO_BIG_NUMBER)
    : collateralInUSD.sub(userNeededCollateralInUSD).div(collateralUSDPrice);

  return closeTo(
    amount.value(),
    collateralUSDPrice,
    ethers.utils.parseEther('0.001')
  )
    ? amount
    : amount.mul(ethers.utils.parseEther('0.95'));
};

export const calculateBorrowAmount: TCalculateBorrowAmount = ({
  ltv,
  loanBase,
  lastAccrued,
  loanElastic,
  interestRate,
  userPrincipal,
  userCollateral,
  collateralUSDPrice,
  collateralDecimals,
}) => {
  const adjustedCollateral = adjustDecimals(userCollateral, collateralDecimals);

  const userElasticLoan = loanPrincipalToElastic({
    loanBase,
    loanElastic,
    userPrincipal,
    lastAccrued,
    interestRate,
  });

  const collateralValue = FixedPointMath.from(adjustedCollateral)
    .mul(collateralUSDPrice)
    .mul(ltv);

  return userElasticLoan.gte(collateralValue)
    ? FixedPointMath.from(ZERO_BIG_NUMBER)
    : collateralValue.sub(userElasticLoan);
};

const getPositionHealthDataInternal: TGetPositionHealthDataInternal = (
  { userCollateralAmount, userElasticAmount, loanElastic },
  market
) => {
  const expectedLiquidationPrice = userElasticAmount.gte(
    FixedPointMath.from(userCollateralAmount)
      .mul(market.collateralUSDPrice)
      .mul(market.ltv)
      .value()
  )
    ? FixedPointMath.from(market.collateralUSDPrice)
    : calculateExpectedLiquidationPrice({
        ltv: market.ltv,
        adjustUserCollateral: userCollateralAmount,
        userElasticLoan: userElasticAmount,
        collateralUSDPrice: market.collateralUSDPrice,
      });

  const positionHealth = userElasticAmount.isZero()
    ? ethers.utils.parseEther('1')
    : calculatePositionHealth(
        {
          ...market,
          adjustedUserCollateral: userCollateralAmount,
        },
        userElasticAmount
      ).value();

  const roundPositionHealthNumber = Math.trunc(
    FixedPointMath.toNumber(positionHealth) * 100
  );

  return [
    `${formatMoney(FixedPointMath.toNumber(loanElastic))} / ${formatMoney(
      FixedPointMath.toNumber(market.maxBorrowAmount)
    )}`,
    userElasticAmount.isZero()
      ? '0'
      : numberToString(FixedPointMath.from(userElasticAmount).toNumber()),
    `$${formatMoney(
      Math.floor(
        +Fraction.from(
          expectedLiquidationPrice.value(),
          ethers.utils.parseEther('1')
        ).toSignificant(4)
      )
    )}`,
    `${roundPositionHealthNumber} %`,
  ];
};

export const getRepayPositionHealthData: TGetRepayPositionHealthData = (
  market,
  { collateral, loan }
) => {
  if (!market) return ['0', '0', '0', '0'];

  const repay = FixedPointMath.from(FixedPointMath.toBigNumber(loan));

  const elasticLoan = loanPrincipalToElastic({
    loanBase: market.loanBase,
    loanElastic: market.loanElastic,
    userPrincipal: market.userPrincipal,
    lastAccrued: market.lastAccrued,
    interestRate: market.interestRate,
  });

  const newElasticLoan = repay.gte(elasticLoan)
    ? FixedPointMath.from(ZERO_BIG_NUMBER)
    : elasticLoan.sub(repay);

  const newCollateral = market.adjustedUserCollateral.sub(
    FixedPointMath.toBigNumber(collateral)
  );

  return getPositionHealthDataInternal(
    {
      loanElastic: market.loanElastic.sub(repay.value()),
      userElasticAmount: newElasticLoan.value(),
      userCollateralAmount: newCollateral,
    },
    market
  );
};

export const getBorrowPositionHealthData: TGetBorrowPositionHealthData = (
  market,
  { collateral, loan }
) => {
  if (!market) return ['0', '0', '0', '0'];

  const newBorrowAmount = loanPrincipalToElastic({
    loanBase: market.loanBase,
    loanElastic: market.loanElastic,
    userPrincipal: market.userPrincipal,
    lastAccrued: market.lastAccrued,
    interestRate: market.interestRate,
  })
    .add(FixedPointMath.toBigNumber(loan))
    .value();

  const newCollateral = market.adjustedUserCollateral.add(
    FixedPointMath.toBigNumber(collateral)
  );

  return getPositionHealthDataInternal(
    {
      loanElastic: market.loanElastic.add(FixedPointMath.toBigNumber(loan)),
      userElasticAmount: newBorrowAmount,
      userCollateralAmount: newCollateral,
    },
    market
  );
};

export const getLoanInfoData: TGetInfoLoanData = (market, kind) => {
  if (!market && kind === DineroMarketKind.LpFreeMarket)
    return ['0%', '0%', '0%', '0%', '0', '0'];

  if (!market) return ['0%', '0%', '0%'];

  const ltv = FixedPointMath.from(market.ltv).toPercentage();

  const liquidationFee = FixedPointMath.from(
    market.liquidationFee
  ).toPercentage();

  if (market.kind === DineroMarketKind.LpFreeMarket)
    return [
      ltv,
      liquidationFee,
      'N/A',
      market.apr.toPercentage(),
      `${formatMoney(
        FixedPointMath.from(market.pendingRewards).toNumber()
      )} Int`, // IPX has 18 decimals.
      `$${formatMoney(
        // IPX has 18 decimals.
        FixedPointMath.from(market.pendingRewards)
          .mul(market.intUSDPrice)
          .toNumber()
      )}`,
    ];

  return [
    ltv,
    liquidationFee,
    FixedPointMath.from(
      market.interestRate.mul(SECONDS_IN_A_YEAR)
    ).toPercentage(),
  ];
};

export const getMyPositionData: TGetMyPositionData = (market) => {
  {
    if (!market) return ['0', '$0', '0', '$0', '0', '0'];

    const liquidationPrice = formatMoney(
      +Fraction.from(
        calculateExpectedLiquidationPrice({
          ltv: market.ltv,
          collateralUSDPrice: market.collateralUSDPrice,
          userElasticLoan: loanPrincipalToElastic({
            interestRate: market.interestRate,
            loanElastic: market.loanElastic,
            userPrincipal: market.userPrincipal,
            lastAccrued: market.lastAccrued,
            loanBase: market.loanBase,
          }).value(),
          adjustUserCollateral: market.adjustedUserCollateral,
        }).value(),
        ethers.utils.parseEther('1')
      ).toSignificant(4)
    );

    const symbol = makeSymbol(market.symbol0, market.symbol1, market.kind);

    return [
      `${formatMoney(
        FixedPointMath.from(market.userCollateral).toNumber(
          market.collateralDecimals
        )
      )} ${symbol}`,
      `$${formatMoney(
        +Fraction.from(
          FixedPointMath.from(market.userCollateral)
            .mul(market.collateralUSDPrice)
            .value(),
          BigNumber.from(10).pow(market.collateralDecimals)
        ).toSignificant(4)
      )}`,
      `${formatMoney(
        +Fraction.from(
          loanPrincipalToElastic({
            loanBase: market.loanBase,
            loanElastic: market.loanElastic,
            userPrincipal: market.userPrincipal,
            lastAccrued: market.lastAccrued,
            interestRate: market.interestRate,
          }).value(),
          ethers.utils.parseEther('1')
        ).toSignificant(8)
      )} DNR`,
      `$${liquidationPrice} (${symbol}) `,
      `${formatMoney(
        +Fraction.from(
          calculateDineroLeftToBorrow(market).value(),
          ethers.utils.parseEther('1')
        ).toSignificant(4)
      )}`,
      `${Fraction.from(
        safeAmountToWithdraw(market).value(),
        ethers.utils.parseEther('1')
      ).toSignificant(4)} ${symbol}`,
    ];
  }
};

export const convertCollateralToDinero = (
  collateralAmount: BigNumber,
  ltv: BigNumber,
  collateralUSDPrice: BigNumber,
  collateralDecimals: number
): BigNumber =>
  FixedPointMath.from(adjustDecimals(collateralAmount, collateralDecimals))
    .mul(ltv)
    .mul(collateralUSDPrice)
    .value();

export const calculateUserCurrentLTV: TCalculateUserCurrentLTV = (
  {
    loanElastic,
    loanBase,
    userPrincipal,
    lastAccrued,
    interestRate,
    collateralUSDPrice,
    adjustedUserCollateral,
  },
  borrowCollateral,
  borrowLoan
) => {
  const collateralInUSD = FixedPointMath.from(
    adjustedUserCollateral.add(borrowCollateral)
  ).mul(collateralUSDPrice);

  const elasticLoan = loanPrincipalToElastic({
    loanBase,
    loanElastic,
    userPrincipal,
    lastAccrued,
    interestRate,
  }).add(borrowLoan);

  return elasticLoan.div(collateralInUSD);
};

export const getBorrowFields: TGetBorrowFields = (market) => {
  if (!market) return [];

  return [
    {
      currency:
        market.kind === DineroMarketKind.LpFreeMarket ? 'LP' : market.symbol0,
      amount: '0',
      currencyIcons: getDineroMarketSVGBySymbol(market.symbol0, market.symbol1),
      max: FixedPointMath.toNumber(market.adjustedCollateralBalance),
      name: 'borrow.collateral',
      label: 'Deposit Collateral',
      amountUSD: market.collateralUSDPrice.isZero()
        ? 0
        : FixedPointMath.toNumber(market.collateralUSDPrice),
      disabled: market.collateralBalance.isZero(),
    },
    {
      max: calculateBorrowAmount(market).toNumber(),
      amount: '0',
      amountUSD: 1,
      currencyIcons: [
        {
          SVG: TOKENS_SVG_MAP[TOKEN_SYMBOL.DNR],
          highZIndex: false,
        },
      ],
      name: 'borrow.loan',
      label: 'Borrow Dinero',
      currency: TOKEN_SYMBOL.DNR,
      disabled:
        market.collateralBalance.isZero() && market.userCollateral.isZero(),
    },
  ];
};

export const getRepayFields: TGetRepayFields = (market) => {
  if (!market) return [];

  return [
    {
      amount: '0',
      amountUSD: 1,
      currencyIcons: [
        {
          SVG: TOKENS_SVG_MAP[TOKEN_SYMBOL.DNR],
          highZIndex: false,
        },
      ],
      name: 'repay.loan',
      label: 'Repay Dinero',
      max: FixedPointMath.from(market.dnrBalance).toNumber(),
      currency: TOKEN_SYMBOL.DNR,
      disabled: market.loanElastic.isZero() || market.dnrBalance.isZero(),
    },
    {
      currency:
        market.kind === DineroMarketKind.LpFreeMarket ? 'LP' : market.symbol0,
      amount: '0',
      currencyIcons: getDineroMarketSVGBySymbol(market.symbol0, market.symbol1),
      max: safeAmountToWithdraw(market).toNumber(),
      name: 'repay.collateral',
      label: 'Remove Collateral',
      amountUSD: market?.collateralUSDPrice.isZero()
        ? 0
        : FixedPointMath.toNumber(market.collateralUSDPrice),
      disabled: market.userCollateral.isZero(),
    },
  ] as ReadonlyArray<IBorrowFormField>;
};
