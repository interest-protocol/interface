import { BigNumber, ethers } from 'ethers';

import {
  ERC_20_DATA,
  TOKENS_SVG_MAP,
  UNKNOWN_ERC_20,
} from '@/constants/erc-20';
import { CurrencyAmount, DineroMarketPair, SECONDS_IN_A_YEAR } from '@/sdk';
import { TOKEN_SYMBOL } from '@/sdk';
import { Fraction } from '@/sdk/entities/fraction';
import { IntMath } from '@/sdk/entities/int-math';
import { closeTo, ZERO_BIG_NUMBER } from '@/sdk/utils';
import { IBorrowFormField } from '@/views/dapp/views/dinero-market/components/borrow-form/borrow-form.types';

import { formatMoney } from '../string';
import {
  DineroMarketUserData,
  MakeDineroMarketPair,
  SafeDineroMarketUserData,
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

const makeDineroMarketPair: MakeDineroMarketPair = (
  collateralBalance,
  collateralAllowance,
  collateral,
  dineroBalance,
  dineroAllowance,
  dinero
) =>
  new DineroMarketPair(
    {
      erc20: collateral,
      balance: collateralBalance,
      allowance: collateralAllowance,
    },
    {
      erc20: dinero,
      allowance: dineroAllowance,
      balance: dineroBalance,
    }
  );

export const processDineroMarketUserData = (
  chainId: number | null,
  tokens: ReadonlyArray<string>,
  x: DineroMarketUserData | undefined
): SafeDineroMarketUserData => {
  if (x && chainId)
    return {
      dineroPair: makeDineroMarketPair(
        x.balances[0],
        x.allowances[0],
        ERC_20_DATA[chainId][tokens[0]],
        x.balances[1],
        x.allowances[1],
        ERC_20_DATA[chainId][TOKEN_SYMBOL.DNR]
      ),
      market: {
        totalLoan: {
          base: x.returnData.loanBase,
          elastic: x.returnData.loanElastic,
        },
        loan: {
          lastAccrued: x.returnData.lastAccrued,
          interestRate: x.returnData.interestRate,
          feesEarned: x.returnData.feesEarned,
        },
        exchangeRate: x.returnData.exchangeRate,
        liquidationFee: x.returnData.liquidationFee,
        maxLTVRatio: x.returnData.maxLTVRatio,
        userCollateral: x.returnData.userCollateral,
        userLoan: x.returnData.userLoan,
      },
    };

  return {
    dineroPair: makeDineroMarketPair(
      ZERO_BIG_NUMBER,
      ZERO_BIG_NUMBER,
      UNKNOWN_ERC_20,
      ZERO_BIG_NUMBER,
      ZERO_BIG_NUMBER,
      UNKNOWN_ERC_20
    ),
    market: {
      totalLoan: {
        base: ZERO_BIG_NUMBER,
        elastic: ZERO_BIG_NUMBER,
      },
      loan: {
        lastAccrued: ZERO_BIG_NUMBER,
        interestRate: ZERO_BIG_NUMBER,
        feesEarned: ZERO_BIG_NUMBER,
      },
      exchangeRate: ZERO_BIG_NUMBER,
      liquidationFee: ZERO_BIG_NUMBER,
      maxLTVRatio: ZERO_BIG_NUMBER,
      userCollateral: ZERO_BIG_NUMBER,
      userLoan: ZERO_BIG_NUMBER,
    },
  };
};

export const calculateInterestAccrued: TCalculateInterestAccrued = (
  totalLoan,
  loan
) => {
  const lasAccrued = loan.lastAccrued.toNumber() * 1000;

  const now = new Date().getTime();

  const timeDelta = now - lasAccrued;

  return IntMath.from(totalLoan.elastic.mul(loan.interestRate))
    .mul(timeDelta)
    .value()
    .div(1000);
};

export const loanPrincipalToElastic: TLoanPrincipalToElastic = (
  totalLoan,
  userPrincipal,
  loan
): IntMath => {
  if (totalLoan.base.isZero()) return IntMath.from(ZERO_BIG_NUMBER);
  const interestAccrued = calculateInterestAccrued(totalLoan, loan);
  return IntMath.from(userPrincipal)
    .mul(totalLoan.elastic.add(interestAccrued))
    .div(totalLoan.base);
};

export const loanElasticToPrincipal: TLoanElasticToPrincipal = (
  totalLoan,
  userElasticLoan,
  loan
): IntMath => {
  if (totalLoan.base.isZero()) return IntMath.from(ZERO_BIG_NUMBER);
  return IntMath.from(userElasticLoan)
    .mul(totalLoan.base)
    .div(totalLoan.elastic.add(calculateInterestAccrued(totalLoan, loan)));
};

export const calculateExpectedLiquidationPrice: TCalculateExpectedLiquidationPrice =
  ({ maxLTVRatio, userCollateral, totalLoan, userLoan, loan }): IntMath => {
    if (userCollateral.isZero()) return IntMath.from(0);
    const userElasticLoan = loanPrincipalToElastic(totalLoan, userLoan, loan);
    return userElasticLoan.div(IntMath.from(maxLTVRatio).mul(userCollateral));
  };

export const calculatePositionHealth: TCalculatePositionHealth = ({
  maxLTVRatio,
  userCollateral,
  userLoan,
  totalLoan,
  loan,
  exchangeRate,
}): IntMath => {
  if (userLoan.isZero() || userCollateral.isZero()) return IntMath.from(0);

  const userElasticLoan = loanPrincipalToElastic(totalLoan, userLoan, loan);

  return userElasticLoan.div(
    IntMath.from(userCollateral).mul(exchangeRate).mul(maxLTVRatio)
  );
};

export const calculateDineroLeftToBorrow: TCalculateDineroLeftToBorrow = ({
  maxLTVRatio,
  totalLoan,
  userLoan,
  userCollateral,
  exchangeRate,
  loan,
}): IntMath => {
  const userElasticLoan = loanPrincipalToElastic(totalLoan, userLoan, loan);

  const collateral = IntMath.from(maxLTVRatio)
    .mul(userCollateral)
    .mul(exchangeRate);
  return collateral.sub(userElasticLoan);
};

export const safeAmountToWithdrawRepay: TSafeAmountToWithdrawRepay = (
  { userCollateral, userLoan, loan, totalLoan, maxLTVRatio, exchangeRate },
  repayLoan
) => {
  if (userLoan.isZero()) return IntMath.from(userCollateral);

  const loanElastic = loanPrincipalToElastic(totalLoan, userLoan, loan);

  if (repayLoan.gte(loanElastic.value())) return IntMath.from(userCollateral);

  const userNeededCollateralInUSD = loanElastic.div(maxLTVRatio);

  const collateralInUSD = IntMath.from(userCollateral).mul(exchangeRate);

  const amount = userNeededCollateralInUSD.gte(collateralInUSD)
    ? IntMath.from(ZERO_BIG_NUMBER)
    : collateralInUSD.sub(userNeededCollateralInUSD).div(exchangeRate);

  return amount.mul(ethers.utils.parseEther('0.95'));
};

export const safeAmountToWithdraw: TSafeAmountToWithdraw = ({
  userCollateral,
  userLoan,
  loan,
  totalLoan,
  maxLTVRatio,
  exchangeRate,
}) => {
  if (userLoan.isZero()) return IntMath.from(userCollateral);
  const userNeededCollateralInUSD = loanPrincipalToElastic(
    totalLoan,
    userLoan,
    loan
  ).div(maxLTVRatio);
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
  userCollateral,
  userLoan,
  totalLoan,
  loan,
  exchangeRate,
  maxLTVRatio,
}) => {
  const userElasticLoan = loanPrincipalToElastic(totalLoan, userLoan, loan);
  const collateralValue = IntMath.from(userCollateral)
    .mul(exchangeRate)
    .mul(maxLTVRatio);

  return userElasticLoan.gte(collateralValue)
    ? IntMath.from(ZERO_BIG_NUMBER)
    : collateralValue.sub(userElasticLoan);
};

export const getBorrowFields: TGetBorrowFields = (data) => {
  if (!data) return [];

  return [
    {
      currency: data.dineroPair.getCollateral().symbol,
      amount: '0',
      CurrencySVG: TOKENS_SVG_MAP[data.dineroPair.getCollateral().symbol],
      max: Math.floor(
        IntMath.toNumber(
          data.dineroPair.getCollateralBalance(),
          data.dineroPair.getCollateral().decimals
        )
      ),
      name: 'borrow.collateral',
      label: 'Deposit Collateral',
      amountUSD: data?.market.exchangeRate.isZero()
        ? 0
        : IntMath.toNumber(data?.market.exchangeRate),
      disabled: data.dineroPair.getCollateralBalance().isZero(),
    },
    {
      max: calculateBorrowAmount(data.market).toNumber(),
      amount: '0',
      amountUSD: 1,
      CurrencySVG: TOKENS_SVG_MAP[data.dineroPair.getDinero().symbol],
      name: 'borrow.loan',
      label: 'Borrow Dinero',
      currency: TOKEN_SYMBOL.DNR,
      disabled:
        data.dineroPair.getCollateralBalance().isZero() &&
        data.market.userCollateral.isZero(),
    },
  ];
};

const getPositionHealthDataInternal: TGetPositionHealthDataInternal = (
  newBorrowAmount,
  newCollateral,
  data
) => {
  const expectedLiquidationPrice = newBorrowAmount.gte(
    IntMath.from(newCollateral)
      .mul(data.exchangeRate)
      .mul(data.maxLTVRatio)
      .value()
  )
    ? IntMath.from(data.exchangeRate)
    : calculateExpectedLiquidationPrice(data);

  const positionHealth = newBorrowAmount.isZero()
    ? ZERO_BIG_NUMBER
    : calculatePositionHealth({
        ...data,
        userCollateral: newCollateral,
        userLoan: loanElasticToPrincipal(
          data.totalLoan,
          newBorrowAmount,
          data.loan
        ).value(),
      }).value();

  const roundPositionHealthNumber = Math.trunc(
    Math.ceil((1 - IntMath.toNumber(positionHealth)) * 100)
  );

  return [
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
  data,
  { collateral, loan }
) => {
  if (!data) return ['0', '0', '0'];

  const repay = IntMath.from(IntMath.toBigNumber(loan));

  const elasticLoan = loanPrincipalToElastic(
    data.market.totalLoan,
    data.market.userLoan,
    data.market.loan
  );

  const newElasticLoan = repay.gte(elasticLoan)
    ? IntMath.from(ZERO_BIG_NUMBER)
    : elasticLoan.sub(repay);

  const newCollateral = data.market.userCollateral.sub(
    IntMath.toBigNumber(collateral)
  );

  return getPositionHealthDataInternal(
    newElasticLoan.value(),
    newCollateral,
    data.market
  );
};

export const getBorrowPositionHealthData: TGetBorrowPositionHealthData = (
  data,
  { collateral, loan }
) => {
  if (!data) return ['0', '0', '0'];

  const newBorrowAmount = loanPrincipalToElastic(
    data.market.totalLoan,
    data.market.userLoan,
    data.market.loan
  )
    .add(IntMath.toBigNumber(loan))
    .value();
  const newCollateral = data.market.userCollateral.add(
    IntMath.toBigNumber(collateral)
  );

  return getPositionHealthDataInternal(
    newBorrowAmount,
    newCollateral,
    data.market
  );
};

export const getLoanInfoData: TGetInfoLoanData = (data) => {
  if (!data || !data?.market) return ['0%', '0%', '0%'];
  const { maxLTVRatio, loan, liquidationFee } = data.market;
  return [
    `${IntMath.from(maxLTVRatio).toPercentage()}`,
    `${IntMath.from(liquidationFee).toPercentage()}`,
    `${IntMath.from(loan.interestRate.mul(SECONDS_IN_A_YEAR)).toPercentage()}`,
  ];
};

export const getMyPositionData: TGetMyPositionData = (data) => {
  {
    if (!data || !data.market) return ['0', '$0', '0', '$0', '0', '0'];

    const collateralERC20 = data.dineroPair.getCollateral();
    const symbol = data.dineroPair.getCollateral().symbol;
    const collateral = CurrencyAmount.fromRawAmount(
      collateralERC20,
      data.market.userCollateral
    );

    const liquidationPrice = formatMoney(
      +Fraction.from(
        calculateExpectedLiquidationPrice(data.market).value(),
        ethers.utils.parseEther('1')
      ).toSignificant(4)
    );

    return [
      `${formatMoney(+collateral.toSignificant(8))} ${symbol}`,
      `$${formatMoney(
        +Fraction.from(
          IntMath.from(data.market.userCollateral)
            .mul(data.market.exchangeRate)
            .value(),
          BigNumber.from(10).pow(collateralERC20.decimals)
        ).toSignificant(4)
      )}`,
      `${formatMoney(
        +Fraction.from(
          loanPrincipalToElastic(
            data.market.totalLoan,
            data.market.userLoan,
            data.market.loan
          ).value(),
          ethers.utils.parseEther('1')
        ).toSignificant(8)
      )} DNR`,
      `$${liquidationPrice} (${symbol}) `,
      `${formatMoney(
        +Fraction.from(
          calculateDineroLeftToBorrow(data.market).value(),
          ethers.utils.parseEther('1')
        ).toSignificant(4)
      )}`,
      `${Fraction.from(
        safeAmountToWithdraw(data.market).value(),
        ethers.utils.parseEther('1')
      ).toSignificant(4)} ${symbol}`,
    ];
  }
};

export const convertCollateralToDinero = (
  collateralAmount: BigNumber,
  ltv: BigNumber,
  exchangeRate: BigNumber
): BigNumber =>
  IntMath.from(collateralAmount).mul(ltv).mul(exchangeRate).value();

export const getRepayFields: TGetRepayFields = (data) => {
  if (!data) return [];

  return [
    {
      amount: '0',
      amountUSD: 1,
      CurrencySVG: TOKENS_SVG_MAP[data.dineroPair.getDinero().symbol],
      name: 'repay.loan',
      label: 'Repay Dinero',
      max: IntMath.toNumber(data.dineroPair.getDineroBalance()),
      currency: TOKEN_SYMBOL.DNR,
      disabled:
        data.market.userLoan.isZero() ||
        data.dineroPair.getDineroBalance().isZero(),
    },
    {
      currency: data.dineroPair.getCollateral().symbol,
      amount: '0',
      CurrencySVG: TOKENS_SVG_MAP[data.dineroPair.getCollateral().symbol],
      max: safeAmountToWithdraw(data.market).toNumber(),
      name: 'repay.collateral',
      label: 'Remove Collateral',
      amountUSD: data?.market.exchangeRate.isZero()
        ? 0
        : IntMath.toNumber(data?.market.exchangeRate) || 0,
      disabled: data.market.userCollateral.isZero(),
    },
  ] as ReadonlyArray<IBorrowFormField>;
};

export const calculateUserCurrentLTV: TCalculateUserCurrentLTV = (
  { userLoan, userCollateral, exchangeRate, loan, totalLoan },
  borrowCollateral,
  borrowLoan
) => {
  const collateralInUSD = IntMath.from(
    userCollateral.add(borrowCollateral)
  ).mul(exchangeRate);

  const elasticLoan = loanPrincipalToElastic(totalLoan, userLoan, loan).add(
    borrowLoan
  );

  return elasticLoan.div(collateralInUSD);
};
