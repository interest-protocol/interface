import { BigNumber, ethers } from 'ethers';
import { UseFormReturn } from 'react-hook-form';

import {
  DineroMarketKind,
  getDineroMarketSVGByAddress,
  SYNTHETIC_PANEL_RESPONSE_MAP,
  TOKENS_SVG_MAP,
} from '@/constants';
import {
  CHAIN_ID,
  CONTRACTS,
  FixedPointMath,
  SECONDS_IN_A_YEAR,
  TOKEN_SYMBOL,
  ZERO_ADDRESS,
  ZERO_BIG_NUMBER,
} from '@/sdk';
import { Fraction } from '@/sdk/entities/fraction';
import { closeTo } from '@/sdk/utils';
import { adjustDecimals, formatMoney, numberToString } from '@/utils';

import {
  IBorrowForm,
  IBorrowFormField,
  ProcessSyntheticData,
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
} from './synthetics-market.types';

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
  kind: DineroMarketKind,
  short = false
) => {
  if (kind === DineroMarketKind.LpFreeMarket)
    return short ? 'LP' : `${symbol0}-${symbol1}`;

  return `${symbol0}`;
};

const DEFAULT_MARKET_DATA = {
  userSyntMinted: ZERO_BIG_NUMBER,
  userCollateral: ZERO_BIG_NUMBER,
  adjustedUserCollateral: ZERO_BIG_NUMBER,
  transferFee: ZERO_BIG_NUMBER,
  liquidationFee: ZERO_BIG_NUMBER,
  tvl: ZERO_BIG_NUMBER,
  tvlInUSD: ZERO_BIG_NUMBER,
  ltv: ZERO_BIG_NUMBER,
  collateralAllowance: ZERO_BIG_NUMBER,
  collateralBalance: ZERO_BIG_NUMBER,
  adjustedCollateralBalance: ZERO_BIG_NUMBER,
  syntBalance: ZERO_BIG_NUMBER,
  syntUSDPrice: ZERO_BIG_NUMBER,
  syntAddress: ZERO_ADDRESS,
  pendingRewards: ZERO_BIG_NUMBER,
  symbol: '',
  name: '',
  marketAddress: ZERO_ADDRESS,
  collateralDecimals: 18,
  collateralAddress: ZERO_ADDRESS,
  chainId: CHAIN_ID.BNB_TEST_NET,
};

export const processSyntheticData: ProcessSyntheticData = (
  chainId,
  market,
  data
) => {
  if (!ethers.utils.isAddress(market) || !chainId || !data)
    return DEFAULT_MARKET_DATA;

  const responseMap =
    SYNTHETIC_PANEL_RESPONSE_MAP[chainId][ethers.utils.getAddress(market)];

  if (!responseMap) return DEFAULT_MARKET_DATA;

  return {
    userSyntMinted: data.userSyntMinted,
    userCollateral: data.userCollateral,
    adjustedUserCollateral: adjustDecimals(
      data.userCollateral,
      responseMap.collateralDecimals
    ),
    transferFee: data.transferFee,
    liquidationFee: data.liquidationFee,
    tvl: data.TVL,
    tvlInUSD: FixedPointMath.from(data.TVL).mul(data.syntheticUSDPrice).value(),
    ltv: data.LTV,
    collateralAllowance: data.collateralAllowance,
    collateralBalance: data.collateralBalance,
    adjustedCollateralBalance: adjustDecimals(
      data.collateralBalance,
      responseMap.collateralDecimals
    ),
    syntBalance: data.syntBalance,
    syntUSDPrice: data.syntheticUSDPrice,
    syntAddress: responseMap.syntAddress,
    pendingRewards: data.pendingRewards,
    symbol: responseMap.symbol,
    name: responseMap.name,
    marketAddress: responseMap.marketAddress,
    collateralDecimals: responseMap.collateralDecimals,
    collateralAddress: responseMap.collateralAddress,
    chainId,
  };
};

export const calculateInterestAccrued: TCalculateInterestAccrued = ({
  loanElastic,
  lastAccrued,
  interestRate,
  now,
}) => {
  const lasAccrued = lastAccrued.toNumber() * 1000;

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
  now,
}): FixedPointMath => {
  if (loanBase.isZero()) return FixedPointMath.from(userPrincipal);

  const interestAccrued = calculateInterestAccrued({
    loanElastic,
    lastAccrued,
    interestRate,
    now,
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
  now,
}): FixedPointMath => {
  if (loanElastic.isZero()) return FixedPointMath.from(userElastic);
  return FixedPointMath.from(
    userElastic.mul(loanBase).div(
      loanElastic.add(
        calculateInterestAccrued({
          loanElastic,
          lastAccrued,
          interestRate,
          now,
        })
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
  now,
}): FixedPointMath => {
  const userElasticLoan = loanPrincipalToElastic({
    loanBase,
    loanElastic,
    userPrincipal,
    lastAccrued,
    interestRate,
    now,
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
    now,
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
    now,
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
  now,
}) => {
  if (loanElastic.isZero()) return FixedPointMath.from(adjustedUserCollateral);

  const userNeededCollateralInUSD = loanPrincipalToElastic({
    loanBase,
    loanElastic,
    userPrincipal,
    lastAccrued,
    interestRate,
    now,
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
  now,
}) => {
  const adjustedCollateral = adjustDecimals(userCollateral, collateralDecimals);

  const userElasticLoan = loanPrincipalToElastic({
    loanBase,
    loanElastic,
    userPrincipal,
    lastAccrued,
    interestRate,
    now,
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
    now: market.now,
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
    now: market.now,
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
            now: market.now,
          }).value(),
          adjustUserCollateral: market.adjustedUserCollateral,
        }).value(),
        ethers.utils.parseEther('1')
      ).toSignificant(4)
    );

    const symbol = makeSymbol(
      market.symbol0,
      market.symbol1,
      market.kind,
      true
    );

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
            now: market.now,
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
    now,
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
    now,
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
      currencyIcons: getDineroMarketSVGByAddress(
        market.chainId,
        market.marketAddress
      ),
      max: FixedPointMath.toNumber(market.adjustedCollateralBalance),
      name: 'borrow.collateral',
      label: 'syntheticsMarketAddress.borrowCollateralLabel',
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
          SVG: TOKENS_SVG_MAP[market.chainId][CONTRACTS.DNR[market.chainId]],
          highZIndex: false,
        },
      ],
      name: 'borrow.loan',
      label: 'syntheticsMarketAddress.borrowDineroLabel',
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
          SVG: TOKENS_SVG_MAP[market.chainId][CONTRACTS.DNR[market.chainId]],
          highZIndex: false,
        },
      ],
      name: 'repay.loan',
      label: 'syntheticsMarketAddress.repayDineroLabel',
      max: FixedPointMath.from(market.dnrBalance).toNumber(),
      currency: TOKEN_SYMBOL.DNR,
      disabled: market.loanElastic.isZero() || market.dnrBalance.isZero(),
    },
    {
      currency:
        market.kind === DineroMarketKind.LpFreeMarket ? 'LP' : market.symbol0,
      amount: '0',
      currencyIcons: getDineroMarketSVGByAddress(
        market.chainId,
        market.marketAddress
      ),
      max: safeAmountToWithdraw(market).toNumber(),
      name: 'repay.collateral',
      label: 'syntheticsMarketAddress.repayCollateralLabel',
      amountUSD: market?.collateralUSDPrice.isZero()
        ? 0
        : FixedPointMath.toNumber(market.collateralUSDPrice),
      disabled: market.userCollateral.isZero(),
    },
  ] as ReadonlyArray<IBorrowFormField>;
};
