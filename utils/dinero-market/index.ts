import { BigNumber, ethers } from 'ethers';

import { TOKENS_SVG_MAP } from '@/constants/erc-20';
import { CurrencyAmount, SECONDS_IN_A_YEAR } from '@/sdk';
import { TOKEN_SYMBOL } from '@/sdk';
import { Fraction } from '@/sdk/entities/fraction';
import { IntMath } from '@/sdk/entities/int-math';
import { closeTo, ZERO_BIG_NUMBER } from '@/sdk/utils';
import { IBorrowFormField } from '@/views/dapp/views/dinero-market-panel/components/borrow-form/borrow-form.types';

import { formatMoney } from '../string';
import { TypeSVG } from './../../interface/index';
import {
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

const getExchangeRate = (collateralUSDPrice: BigNumber): BigNumber =>
  collateralUSDPrice.isZero() ? IntMath.toBigNumber(1) : collateralUSDPrice;

export const calculateInterestAccrued: TCalculateInterestAccrued = (
  elastic,
  lastAccrued,
  interestRate
) => {
  const lasAccrued = IntMath.toNumber(lastAccrued) * 1000;

  const now = new Date().getTime();

  const timeDelta = now - lasAccrued;

  return IntMath.from(elastic.mul(interestRate))
    .mul(timeDelta)
    .value()
    .div(1000);
};

export const loanPrincipalToElastic: TLoanPrincipalToElastic = (
  loanBase,
  userPrincipal,
  lastAccrued,
  loanElastic,
  interestRate
): IntMath => {
  if (loanBase.isZero()) return IntMath.from(ZERO_BIG_NUMBER);
  const interestAccrued = calculateInterestAccrued(
    loanElastic,
    lastAccrued,
    interestRate
  );
  return IntMath.from(userPrincipal)
    .mul(loanElastic.add(interestAccrued))
    .div(loanBase);
};

export const loanElasticToPrincipal: TLoanElasticToPrincipal = (
  loanBase,
  lastAccrued,
  loanElastic,
  interestRate
): IntMath => {
  if (loanBase.isZero()) return IntMath.from(ZERO_BIG_NUMBER);
  return IntMath.from(loanElastic)
    .mul(interestRate)
    .div(
      loanElastic.add(
        calculateInterestAccrued(loanElastic, lastAccrued, interestRate)
      )
    );
};

export const calculateExpectedLiquidationPrice: TCalculateExpectedLiquidationPrice =
  (
    {
      ltv,
      userCollateral,
      loanBase,
      userPrincipal,
      lastAccrued,
      loanElastic,
      interestRate,
    },
    additionalCollateral,
    additionalPrincipal
  ): IntMath => {
    const collateral = userCollateral.add(additionalCollateral);

    if (collateral.isZero()) return IntMath.from(0);
    const userElasticLoan = loanPrincipalToElastic(
      loanBase,
      userPrincipal,
      lastAccrued,
      loanElastic.add(additionalPrincipal),
      interestRate
    );

    return userElasticLoan.div(IntMath.from(ltv).mul(collateral));
  };

export const calculatePositionHealth: TCalculatePositionHealth = ({
  ltv,
  loanBase,
  userPrincipal,
  userCollateral,
  loanElastic,
  collateralUSDPrice,
  lastAccrued,
  interestRate,
}): IntMath => {
  const exchangeRate = getExchangeRate(collateralUSDPrice);

  if (loanElastic.isZero() || userCollateral.isZero()) return IntMath.from(0);

  const userElasticLoan = loanPrincipalToElastic(
    loanBase,
    userPrincipal,
    lastAccrued,
    loanElastic,
    interestRate
  );

  return userElasticLoan.div(
    IntMath.from(userCollateral).mul(exchangeRate).mul(ltv)
  );
};

export const calculateDineroLeftToBorrow: TCalculateDineroLeftToBorrow = ({
  ltv,
  userCollateral,
  loanBase,
  userPrincipal,
  lastAccrued,
  loanElastic,
  interestRate,
  collateralUSDPrice,
}): IntMath => {
  const exchangeRate = getExchangeRate(collateralUSDPrice);

  const userElasticLoan = loanPrincipalToElastic(
    loanBase,
    userPrincipal,
    lastAccrued,
    loanElastic,
    interestRate
  );

  const collateral = IntMath.from(ltv).mul(userCollateral).mul(exchangeRate);
  return collateral.sub(userElasticLoan);
};

export const safeAmountToWithdrawRepay: TSafeAmountToWithdrawRepay = (
  {
    ltv,
    userCollateral,
    collateralUSDPrice,
    loanBase,
    userPrincipal,
    lastAccrued,
    loanElastic: elastic,
    interestRate,
  },
  repayLoan
) => {
  const exchangeRate = getExchangeRate(collateralUSDPrice);

  if (elastic.isZero()) return IntMath.from(userCollateral);

  const loanElastic = loanPrincipalToElastic(
    loanBase,
    userPrincipal,
    lastAccrued,
    elastic,
    interestRate
  );

  if (repayLoan.gte(loanElastic.value())) return IntMath.from(userCollateral);

  const userNeededCollateralInUSD = loanElastic.div(ltv);

  const collateralInUSD = IntMath.from(userCollateral).mul(exchangeRate);

  const amount = userNeededCollateralInUSD.gte(collateralInUSD)
    ? IntMath.from(ZERO_BIG_NUMBER)
    : collateralInUSD.sub(userNeededCollateralInUSD).div(exchangeRate);

  return amount.mul(ethers.utils.parseEther('0.95'));
};

export const safeAmountToWithdraw: TSafeAmountToWithdraw = ({
  ltv,
  loanBase,
  lastAccrued,
  loanElastic,
  interestRate,
  userPrincipal,
  userCollateral,
  collateralUSDPrice,
}) => {
  const exchangeRate = getExchangeRate(collateralUSDPrice);

  if (loanElastic.isZero()) return IntMath.from(userCollateral);

  const userNeededCollateralInUSD = loanPrincipalToElastic(
    loanBase,
    userPrincipal,
    lastAccrued,
    loanElastic,
    interestRate
  ).div(ltv);

  const collateralInUSD = IntMath.from(userCollateral).mul(exchangeRate);

  const amount = userNeededCollateralInUSD.gte(collateralInUSD)
    ? IntMath.from(ZERO_BIG_NUMBER)
    : collateralInUSD.sub(userNeededCollateralInUSD).div(exchangeRate);

  return closeTo(
    amount.value(),
    userCollateral,
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
}) => {
  const exchangeRate = getExchangeRate(collateralUSDPrice);

  const userElasticLoan = loanPrincipalToElastic(
    loanBase,
    userPrincipal,
    lastAccrued,
    loanElastic,
    interestRate
  );

  const collateralValue = IntMath.from(userCollateral)
    .mul(exchangeRate)
    .mul(ltv);

  console.log('>> userElasticLoan :: ', userElasticLoan.toNumber());
  console.log('>> collateralValue :: ', collateralValue.toNumber());

  return userElasticLoan.gte(collateralValue)
    ? IntMath.from(ZERO_BIG_NUMBER)
    : collateralValue.sub(userElasticLoan);
};

export const getBorrowFields: TGetBorrowFields = (market, symbols) => {
  if (!market) return [];

  const exchangeRate = getExchangeRate(market.collateralUSDPrice);

  return [
    {
      currency: `${market.symbol0}${
        !!market.symbol1 && market.symbol1 != TOKEN_SYMBOL.Unknown
          ? `-${market.symbol1}`
          : ''
      }`,
      amount: '0',
      currencyIcons: symbols.map((symbol) =>
        symbol && symbol !== TOKEN_SYMBOL.Unknown
          ? TOKENS_SVG_MAP[symbol] ?? TOKENS_SVG_MAP[TOKEN_SYMBOL.Unknown]
          : null
      ) as [TypeSVG, TypeSVG | null],
      max: Math.floor(
        IntMath.toNumber(market.collateralBalance, market.collateralDecimals)
      ),
      name: 'borrow.collateral',
      label: 'Deposit Collateral',
      amountUSD: market.collateralUSDPrice.isZero()
        ? 0
        : IntMath.toNumber(exchangeRate),
      disabled: market.collateralBalance.isZero(),
    },
    {
      max: calculateBorrowAmount(market).toNumber(),
      amount: '0',
      amountUSD: 1,
      currencyIcons: [TOKENS_SVG_MAP[TOKEN_SYMBOL.DNR], null] as [
        TypeSVG,
        TypeSVG | null
      ],
      name: 'borrow.loan',
      label: 'Borrow Dinero',
      currency: TOKEN_SYMBOL.DNR,
      disabled:
        market.collateralBalance.isZero() && market.userCollateral.isZero(),
    },
  ];
};

const getPositionHealthDataInternal: TGetPositionHealthDataInternal = (
  newBorrowAmount,
  newCollateral,
  market
) => {
  const exchangeRate = getExchangeRate(market.collateralUSDPrice);

  const expectedLiquidationPrice = newBorrowAmount.gte(
    IntMath.from(newCollateral).mul(exchangeRate).mul(market.ltv).value()
  )
    ? IntMath.from(exchangeRate)
    : calculateExpectedLiquidationPrice(market, newCollateral, newBorrowAmount);

  const positionHealth = newBorrowAmount.isZero()
    ? ZERO_BIG_NUMBER
    : calculatePositionHealth({
        ...market,
        userCollateral: newCollateral,
        loanElastic: loanPrincipalToElastic(
          market.loanBase,
          market.userPrincipal,
          market.lastAccrued,
          market.loanElastic,
          market.interestRate
        ).value(),
      }).value();

  const roundPositionHealthNumber = Math.trunc(
    Math.ceil((1 - IntMath.toNumber(positionHealth)) * 100)
  );

  return [
    // TODO: replace this magic number with Real Max Value
    formatMoney(734956),
    roundPositionHealthNumber === 100
      ? '0'
      : Fraction.from(
          newBorrowAmount,
          ethers.utils.parseEther('1')
        ).toSignificant(4),
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

  const repay = IntMath.from(IntMath.toBigNumber(loan));

  const elasticLoan = loanPrincipalToElastic(
    market.loanBase,
    market.userPrincipal,
    market.lastAccrued,
    market.loanElastic,
    market.interestRate
  );

  const newElasticLoan = repay.gte(elasticLoan)
    ? IntMath.from(ZERO_BIG_NUMBER)
    : elasticLoan.sub(repay);

  const newCollateral = market.userCollateral.sub(
    IntMath.toBigNumber(collateral)
  );

  return getPositionHealthDataInternal(
    newElasticLoan.value(),
    newCollateral,
    market
  );
};

export const getBorrowPositionHealthData: TGetBorrowPositionHealthData = (
  market,
  { collateral, loan }
) => {
  if (!market) return ['0', '0', '0', '0'];

  const newBorrowAmount = loanPrincipalToElastic(
    market.loanBase,
    market.userPrincipal,
    market.lastAccrued,
    market.loanElastic,
    market.interestRate
  )
    .add(IntMath.toBigNumber(loan))
    .value();

  const newCollateral = market.userCollateral.add(
    IntMath.toBigNumber(collateral)
  );

  return getPositionHealthDataInternal(newBorrowAmount, newCollateral, market);
};

export const getLoanInfoData: TGetInfoLoanData = (market, isPair) => {
  if (!market) return ['0%', '0%', '0%', ...(isPair ? ['0', '0', '0'] : [])];

  const { ltv, interestRate, liquidationFee } = market;

  return [
    `${IntMath.from(ltv).toPercentage()}`,
    `${IntMath.from(liquidationFee).toPercentage()}`,
    ...(isPair
      ? ['N/A', '0', '0', '0']
      : [
          `${IntMath.from(interestRate.mul(SECONDS_IN_A_YEAR)).toPercentage()}`,
        ]),
  ];
};

export const getMyPositionData: TGetMyPositionData = (market) => {
  {
    if (!market || !market) return ['0', '$0', '0', '$0', '0', '0'];

    const exchangeRate = getExchangeRate(market.collateralUSDPrice);

    const collateralERC20 = {
      isERC20: true,
      isNative: false,
      name: market.symbol0 ?? '',
      symbol: market.symbol0 ?? '',
      decimals: +market.collateralDecimals,
    };
    const symbol = market.symbol0;
    const collateral = CurrencyAmount.fromRawAmount(
      collateralERC20,
      market.userCollateral
    );

    const liquidationPrice = formatMoney(
      +Fraction.from(
        calculateExpectedLiquidationPrice(
          market,
          ZERO_BIG_NUMBER,
          ZERO_BIG_NUMBER
        ).value(),
        ethers.utils.parseEther('1')
      ).toSignificant(4)
    );

    return [
      `${formatMoney(+collateral.toSignificant(8))} ${symbol}`,
      `$${formatMoney(
        +Fraction.from(
          IntMath.from(market.userCollateral).mul(exchangeRate).value(),
          BigNumber.from(10).pow(collateralERC20.decimals)
        ).toSignificant(4)
      )}`,
      `${formatMoney(
        +Fraction.from(
          loanPrincipalToElastic(
            market.loanBase,
            market.userPrincipal,
            market.lastAccrued,
            market.loanElastic,
            market.interestRate
          ).value(),
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
  collateralUSDPrice: BigNumber
): BigNumber =>
  IntMath.from(collateralAmount)
    .mul(ltv)
    .mul(getExchangeRate(collateralUSDPrice))
    .value();

export const getRepayFields: TGetRepayFields = (market, symbols) => {
  if (!market) return [];

  const exchangeRate = getExchangeRate(market.collateralUSDPrice);

  return [
    {
      amount: '0',
      amountUSD: 1,
      currencyIcons: [TOKENS_SVG_MAP[market.symbol0], null] as [
        TypeSVG,
        TypeSVG | null
      ],
      name: 'repay.loan',
      label: 'Repay Dinero',
      max: IntMath.toNumber(market.dnrBalance),
      currency: TOKEN_SYMBOL.DNR,
      disabled: market.loanElastic.isZero() || market.dnrBalance.isZero(),
    },
    {
      currency: `${market.symbol0}${
        market.symbol1 && market.symbol1 != TOKEN_SYMBOL.Unknown
          ? `-${market.symbol1}`
          : ''
      }`,
      amount: '0',
      currencyIcons: symbols.map((symbol) =>
        symbol && symbol !== TOKEN_SYMBOL.Unknown
          ? TOKENS_SVG_MAP[symbol] ?? TOKENS_SVG_MAP[TOKEN_SYMBOL.Unknown]
          : null
      ) as [TypeSVG, TypeSVG | null],
      max: safeAmountToWithdraw(market).toNumber(),
      name: 'repay.collateral',
      label: 'Remove Collateral',
      amountUSD: market?.collateralUSDPrice.isZero()
        ? 0
        : IntMath.toNumber(exchangeRate) || 0,
      disabled: market.userCollateral.isZero(),
    },
  ] as ReadonlyArray<IBorrowFormField>;
};

export const calculateUserCurrentLTV: TCalculateUserCurrentLTV = (
  {
    loanElastic,
    userCollateral,
    loanBase,
    userPrincipal,
    lastAccrued,
    interestRate,
    collateralUSDPrice,
  },
  borrowCollateral,
  borrowLoan
) => {
  const exchangeRate = getExchangeRate(collateralUSDPrice);

  const collateralInUSD = IntMath.from(
    userCollateral.add(borrowCollateral)
  ).mul(exchangeRate);

  const elasticLoan = loanPrincipalToElastic(
    loanBase,
    userPrincipal,
    lastAccrued,
    loanElastic,
    interestRate
  ).add(borrowLoan);

  return elasticLoan.div(collateralInUSD);
};
