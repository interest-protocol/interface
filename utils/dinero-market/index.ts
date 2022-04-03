import { Web3Provider } from '@ethersproject/providers';
import { BigNumber, ContractTransaction, ethers } from 'ethers';

import BTCDineroMarketABI from '@/constants/abi/btc-dinero-market.abi.json';
import ERC20ABI from '@/constants/abi/erc-20.abi.json';
import {
  BSC_TEST_ERC_20_DATA,
  TOKEN_SYMBOL,
  TOKENS_SVG_MAP,
  UNKNOWN_ERC_20,
} from '@/constants/erc-20.data';
import { SECONDS_IN_A_YEAR, ZERO } from '@/constants/index';
import { CurrencyAmount } from '@/sdk/entities/currency-amount';
import { Fraction } from '@/sdk/entities/fraction';
import { IntMath } from '@/sdk/entities/int-math';
import { closeTo } from '@/utils/big-number';
import { IBorrowFormField } from '@/views/dapp/views/dinero-market/components/borrow-form/borrow-form.types';

import { BtcDineroMarketAbi, Erc20Abi } from '../../types/ethers-contracts';
import { formatMoney } from '../string';
import {
  GetDineroMarketUserDataReturn,
  MarketAndBalancesData,
  TCalculateBorrowAmount,
  TCalculateDineroLeftToBorrow,
  TCalculateDineroToRepay,
  TCalculateExpectedLiquidationPrice,
  TCalculateInterestAccrued,
  TCalculatePositionHealth,
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

export const processData = (
  x: MarketAndBalancesData | undefined
): MarketAndBalancesData => {
  if (x) return x;

  return {
    balances: [
      CurrencyAmount.fromRawAmount(UNKNOWN_ERC_20, 0),
      CurrencyAmount.fromRawAmount(BSC_TEST_ERC_20_DATA[TOKEN_SYMBOL.DNR], 0),
    ],
    market: {
      exchangeRate: ZERO,
      ltvRatio: ZERO,
      loan: {
        lastAccrued: ZERO,
        INTEREST_RATE: ZERO,
        feesEarned: ZERO,
        '0': ZERO,
        '1': ZERO,
        '2': ZERO,
        length: 3,
      } as any,
      userLoan: ZERO,
      userCollateral: ZERO,
      totalLoan: {
        elastic: ZERO,
        base: ZERO,
        '1': ZERO,
        '0': ZERO,
        length: 2,
      } as any,
      allowance: ZERO,
      liquidationFee: ZERO,
    },
  };
};

export const repayAndWithdrawCollateral = async (
  dineroMarket: string,
  provider: Web3Provider,
  userAccount: string,
  collateral: BigNumber,
  principal: BigNumber
): Promise<ContractTransaction> => {
  const market = new ethers.Contract(
    dineroMarket,
    BTCDineroMarketABI,
    provider.getSigner(userAccount)
  ) as BtcDineroMarketAbi;

  return market.repayAndWithdrawCollateral(
    userAccount,
    principal,
    userAccount,
    collateral
  );
};

export const addCollateralAndLoan = async (
  dineroMarket: string,
  provider: Web3Provider,
  userAccount: string,
  collateral: BigNumber,
  loan: BigNumber
): Promise<ContractTransaction> => {
  const market = new ethers.Contract(
    dineroMarket,
    BTCDineroMarketABI,
    provider.getSigner(userAccount)
  ) as BtcDineroMarketAbi;

  return market.addCollateralAndBorrow(
    userAccount,
    collateral,
    userAccount,
    loan
  );
};

export const repayDineroLoan = async (
  dineroMarket: string,
  provider: Web3Provider,
  userAccount: string,
  principal: BigNumber
): Promise<ContractTransaction> => {
  const market = new ethers.Contract(
    dineroMarket,
    BTCDineroMarketABI,
    provider.getSigner(userAccount)
  ) as BtcDineroMarketAbi;

  return market.repay(userAccount, principal);
};

export const getDineroMarketLoan = async (
  dineroMarket: string,
  provider: Web3Provider,
  userAccount: string,
  amount: BigNumber
): Promise<ContractTransaction> => {
  const market = new ethers.Contract(
    dineroMarket,
    BTCDineroMarketABI,
    provider.getSigner(userAccount)
  ) as BtcDineroMarketAbi;

  return market.borrow(userAccount, amount);
};

export const withdrawDineroCollateral = async (
  dineroMarket: string,
  provider: Web3Provider,
  userAccount: string,
  amount: BigNumber
): Promise<ContractTransaction> => {
  const market = new ethers.Contract(
    dineroMarket,
    BTCDineroMarketABI,
    provider.getSigner(userAccount)
  ) as BtcDineroMarketAbi;

  return market.withdrawCollateral(userAccount, amount);
};

export const addDineroMarketCollateral = async (
  dineroMarket: string,
  provider: Web3Provider,
  userAccount: string,
  amount: BigNumber
): Promise<ContractTransaction> => {
  const market = new ethers.Contract(
    dineroMarket,
    BTCDineroMarketABI,
    provider.getSigner(userAccount)
  ) as BtcDineroMarketAbi;

  return market.addCollateral(userAccount, amount);
};

export const calculateInterestAccrued: TCalculateInterestAccrued = (
  totalLoan,
  loan
) => {
  const lasAccrued = loan.lastAccrued.toNumber() * 1000;
  const now = new Date().getTime();

  const timeDelta = now - lasAccrued;

  return IntMath.from(totalLoan.elastic.mul(loan.INTEREST_RATE))
    .mul(timeDelta)
    .value();
};

export const getDineroMarketUserData = async (
  dineroMarket: string,
  userAccount: string,
  provider: Web3Provider,
  collateral: string
): Promise<GetDineroMarketUserDataReturn> => {
  const market = new ethers.Contract(
    dineroMarket,
    BTCDineroMarketABI,
    provider
  ) as BtcDineroMarketAbi;

  const erc20 = new ethers.Contract(collateral, ERC20ABI, provider) as Erc20Abi;

  const [
    exchangeRate,
    loan,
    liquidationFee,
    ltvRatio,
    userCollateral,
    userLoan,
    totalLoan,
    allowance,
  ] = await Promise.all([
    market.exchangeRate(),
    market.loan(),
    market.liquidationFee(),
    market.maxLTVRatio(),
    market.userCollateral(userAccount),
    market.userLoan(userAccount),
    market.totalLoan(),
    erc20.allowance(userAccount, dineroMarket),
  ]);

  return {
    exchangeRate,
    loan,
    liquidationFee,
    ltvRatio,
    userCollateral,
    userLoan,
    totalLoan,
    allowance,
  };
};

export const loanPrincipalToElastic: TLoanPrincipalToElastic = (
  totalLoan: [BigNumber, BigNumber] & { elastic: BigNumber; base: BigNumber },
  userPrincipal: BigNumber,
  loan
): IntMath => {
  if (totalLoan.base.isZero()) return IntMath.from(ZERO);
  const interestAccrued = calculateInterestAccrued(totalLoan, loan);
  return IntMath.from(userPrincipal)
    .mul(totalLoan.elastic.add(interestAccrued))
    .div(totalLoan.base);
};

export const loanElasticToPrincipal: TLoanElasticToPrincipal = (
  totalLoan: [BigNumber, BigNumber] & { elastic: BigNumber; base: BigNumber },
  userElasticLoan: BigNumber,
  loan
): IntMath => {
  if (totalLoan.base.isZero()) return IntMath.from(ZERO);
  return IntMath.from(userElasticLoan)
    .mul(totalLoan.base)
    .div(totalLoan.elastic.add(calculateInterestAccrued(totalLoan, loan)));
};

export const calculateExpectedLiquidationPrice: TCalculateExpectedLiquidationPrice =
  ({ ltvRatio, userCollateral, totalLoan, userLoan, loan }): IntMath => {
    if (userCollateral.isZero()) return IntMath.from(0);
    const userElasticLoan = loanPrincipalToElastic(totalLoan, userLoan, loan);
    return userElasticLoan.div(IntMath.from(ltvRatio).mul(userCollateral));
  };

export const calculatePositionHealth: TCalculatePositionHealth = ({
  ltvRatio,
  userCollateral,
  userLoan,
  totalLoan,
  loan,
  exchangeRate,
}): IntMath => {
  if (userLoan.isZero() || userCollateral.isZero()) return IntMath.from(0);

  const userElasticLoan = loanPrincipalToElastic(totalLoan, userLoan, loan);

  return userElasticLoan.div(
    IntMath.from(userCollateral).mul(exchangeRate).mul(ltvRatio)
  );
};

export const calculateDineroLeftToBorrow: TCalculateDineroLeftToBorrow = ({
  ltvRatio,
  totalLoan,
  userLoan,
  userCollateral,
  exchangeRate,
  loan,
}): IntMath => {
  const userElasticLoan = loanPrincipalToElastic(totalLoan, userLoan, loan);
  const collateral = IntMath.from(ltvRatio)
    .mul(userCollateral)
    .mul(exchangeRate);
  return collateral.sub(userElasticLoan);
};

export const safeAmountToWithdrawRepay: TSafeAmountToWithdrawRepay = (
  { userCollateral, userLoan, loan, totalLoan, ltvRatio, exchangeRate },
  repayLoan
) => {
  if (userLoan.isZero()) return IntMath.from(userCollateral);
  const userNeededCollateralInUSD = loanPrincipalToElastic(
    totalLoan,
    userLoan,
    loan
  )
    .sub(repayLoan)
    .div(ltvRatio);

  const collateralInUSD = IntMath.from(userCollateral).mul(exchangeRate);

  const amount = userNeededCollateralInUSD.gte(collateralInUSD)
    ? IntMath.from(ZERO)
    : collateralInUSD.sub(userNeededCollateralInUSD).div(exchangeRate);

  return closeTo(
    amount.value(),
    userCollateral,
    ethers.utils.parseEther('0.001')
  )
    ? amount
    : amount.mul(ethers.utils.parseEther('0.95'));
};

export const safeAmountToWithdraw: TSafeAmountToWithdraw = ({
  userCollateral,
  userLoan,
  loan,
  totalLoan,
  ltvRatio,
  exchangeRate,
}) => {
  if (userLoan.isZero()) return IntMath.from(userCollateral);
  const userNeededCollateralInUSD = loanPrincipalToElastic(
    totalLoan,
    userLoan,
    loan
  ).div(ltvRatio);
  const collateralInUSD = IntMath.from(userCollateral).mul(exchangeRate);

  const amount = userNeededCollateralInUSD.gte(collateralInUSD)
    ? IntMath.from(ZERO)
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
  ltvRatio,
}) => {
  const userElasticLoan = loanPrincipalToElastic(totalLoan, userLoan, loan);
  const collateralValue = IntMath.from(userCollateral)
    .mul(exchangeRate)
    .mul(ltvRatio);

  return userElasticLoan.gte(collateralValue)
    ? IntMath.from(ZERO)
    : collateralValue.sub(userElasticLoan);
};

export const getBorrowFields: TGetBorrowFields = (data, currency, collateral) =>
  data
    ? data?.balances.map((x) => {
        const SVG = TOKENS_SVG_MAP[x.currency.symbol];

        const marketData = {
          ...data.market,
          userCollateral: data.market.userCollateral.add(
            IntMath.toBigNumber(collateral)
          ),
        };

        if (x.currency.symbol === TOKEN_SYMBOL.DNR)
          return {
            max: data ? calculateBorrowAmount(marketData).toNumber() : 0,
            amount: '0',
            amountUSD: 1,
            CurrencySVG: SVG,
            name: 'borrow.loan',
            label: 'Borrow Dinero',
            currency: TOKEN_SYMBOL.DNR,
          };

        return {
          currency,
          amount: '0',
          CurrencySVG: SVG,
          max: +x.toSignificant(4),
          name: 'borrow.collateral',
          label: 'Deposit Collateral',
          amountUSD: data?.market.exchangeRate.isZero()
            ? 0
            : IntMath.toNumber(data?.market.exchangeRate),
        };
      })
    : [];

const getPositionHealthDataInternal: TGetPositionHealthDataInternal = (
  newBorrowAmount,
  newCollateral,
  data
) => {
  const expectedLiquidationPrice = newBorrowAmount.gte(
    IntMath.from(newCollateral)
      .mul(data.exchangeRate)
      .mul(data.ltvRatio)
      .value()
  )
    ? IntMath.from(data.exchangeRate)
    : calculateExpectedLiquidationPrice(data);

  const positionHealth = calculatePositionHealth({
    ...data,
    userCollateral: newCollateral,
    userLoan: loanElasticToPrincipal(
      data.totalLoan,
      newBorrowAmount,
      data.loan
    ).value(),
  });

  const positionHealthNumber = +Fraction.from(
    positionHealth.value(),
    ethers.utils.parseEther('1')
  ).toSignificant(2);

  const roundPositionHealthNumber = Math.trunc(
    Math.ceil((1 - positionHealthNumber) * 100)
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

  const newBorrowAmount = loanPrincipalToElastic(
    data.market.totalLoan,
    data.market.userLoan,
    data.market.loan
  )
    .sub(IntMath.toBigNumber(loan))
    .value();
  const newCollateral = data.market.userCollateral.sub(
    IntMath.toBigNumber(collateral)
  );

  return getPositionHealthDataInternal(
    newBorrowAmount,
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
  const { ltvRatio, loan, liquidationFee } = data.market;
  return [
    `${IntMath.from(ltvRatio).toPercentage()}`,
    `${IntMath.from(liquidationFee).toPercentage()}`,
    `${IntMath.from(loan.INTEREST_RATE.mul(SECONDS_IN_A_YEAR)).toPercentage()}`,
  ];
};

export const getMyPositionData: TGetMyPositionData = (data, currency) => {
  {
    if (!data || !data.market) return ['0', '$0', '0', '$0', '0', '0'];

    const collateral = CurrencyAmount.fromRawAmount(
      BSC_TEST_ERC_20_DATA[currency],
      data.market.userCollateral
    );

    const liquidationPrice = formatMoney(
      +Fraction.from(
        calculateExpectedLiquidationPrice(data.market).value(),
        ethers.utils.parseEther('1')
      ).toSignificant(4)
    );

    return [
      `${collateral.toSignificant(8)} ${currency}`,
      `$${formatMoney(
        +Fraction.from(
          IntMath.from(data.market.userCollateral)
            .mul(data.market.exchangeRate)
            .value(),
          BigNumber.from(10).pow(collateral.currency.decimals)
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
      `$${liquidationPrice} (${currency}) `,
      `${formatMoney(
        +Fraction.from(
          calculateDineroLeftToBorrow(data.market).value(),
          ethers.utils.parseEther('1')
        ).toSignificant(4)
      )}`,
      `${Fraction.from(
        safeAmountToWithdraw(data.market).value(),
        ethers.utils.parseEther('1')
      ).toSignificant(4)} ${currency}`,
    ];
  }
};

export const calculateDineroToRepay: TCalculateDineroToRepay = (
  { loan, totalLoan, userLoan },
  balance,
  intendedLTV = 100
) => {
  const elasticLoan = loanPrincipalToElastic(totalLoan, userLoan, loan);

  const target = elasticLoan.mul(IntMath.toBigNumber(intendedLTV, 16));

  const targetToPay = target.gt(balance) ? IntMath.from(balance) : target;

  return targetToPay.toNumber().toString();
};

export const convertCollateralToDinero = (
  collateralAmount: BigNumber,
  ltv: BigNumber,
  exchangeRate: BigNumber
): BigNumber =>
  IntMath.from(collateralAmount).mul(ltv).mul(exchangeRate).value();

export const getRepayFields: TGetRepayFields = (
  data,
  currency,
  repayLoan: string
) => {
  if (!data) return [];

  const result = data?.balances.map((x) => {
    const SVG = TOKENS_SVG_MAP[x.currency.symbol];
    if (x.currency.symbol === TOKEN_SYMBOL.DNR)
      return {
        amount: '0',
        amountUSD: 1,
        CurrencySVG: SVG,
        name: 'repay.loan',
        label: 'Repay Dinero',
        max: +calculateDineroToRepay(data.market, x.numerator),
        currency: TOKEN_SYMBOL.DNR,
      } as IBorrowFormField;

    return {
      currency,
      amount: '0',
      CurrencySVG: SVG,
      max: safeAmountToWithdraw(data.market).toNumber(),
      name: 'repay.collateral',
      label: 'Remove Collateral',
      amountUSD: data?.market.exchangeRate.isZero()
        ? 0
        : IntMath.toNumber(data?.market.exchangeRate) || 0,
    } as IBorrowFormField;
  });

  return [result[1], result[0]];
};
