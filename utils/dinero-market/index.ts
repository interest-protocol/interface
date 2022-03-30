import { Web3Provider } from '@ethersproject/providers';
import { BigNumber, ContractTransaction, ethers } from 'ethers';

import BTCDineroMarketABI from '@/constants/abi/btc-dinero-market.abi.json';
import ERC20ABI from '@/constants/abi/erc-20.abi.json';
import {
  BSC_TEST_ERC_20_DATA,
  TOKEN_SYMBOL,
  TOKENS_SVG_MAP,
} from '@/constants/erc-20.data';
import { SECONDS_IN_A_YEAR, ZERO } from '@/constants/index';
import { CurrencyAmount } from '@/sdk/entities/currency-amount';
import { Fraction } from '@/sdk/entities/fraction';
import { IntMath } from '@/sdk/entities/int-math';

import { BtcDineroMarketAbi, Erc20Abi } from '../../types/ethers-contracts';
import { formatMoney } from '../string';
import {
  GetDineroMarketUserDataReturn,
  TGetBorrowFields,
  TGetCurrencyAmount,
  TGetInfoLoanData,
  TGetLoanData,
  TGetMyPositionData,
  TGetRepayFields,
} from './dinero-market.types';

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

export const addDineroMarketCollateral = async (
  dineroMarket: string,
  provider: Web3Provider,
  userAccount: string,
  collateral: string,
  amount: BigNumber
): Promise<ContractTransaction> => {
  const market = new ethers.Contract(
    dineroMarket,
    BTCDineroMarketABI,
    provider.getSigner(userAccount)
  ) as BtcDineroMarketAbi;

  return market.addCollateral(userAccount, amount);
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

export const loanPrincipalToElastic = (
  totalLoan: [BigNumber, BigNumber] & { elastic: BigNumber; base: BigNumber },
  userPrincipal: BigNumber
): IntMath => {
  if (totalLoan.base.isZero()) return IntMath.from(0);
  return IntMath.from(userPrincipal).mul(totalLoan.elastic).div(totalLoan.base);
};

export const calculateUserLTVRatio = (
  ltv: BigNumber,
  totalLoan: [BigNumber, BigNumber] & { elastic: BigNumber; base: BigNumber },
  userCollateral: BigNumber,
  userPrincipal: BigNumber
): IntMath => {
  if (userCollateral.isZero()) return IntMath.from(0);
  const userElasticLoan = loanPrincipalToElastic(totalLoan, userPrincipal);
  const collateral = IntMath.from(ltv).mul(userCollateral);
  return userElasticLoan.div(collateral);
};

export const calculateExpectedLiquidationPrice = (
  ltv: BigNumber,
  totalLoan: [BigNumber, BigNumber] & { elastic: BigNumber; base: BigNumber },
  userCollateral: BigNumber,
  userPrincipal: BigNumber,
  additionalBorrow: BigNumber
): IntMath => {
  if (userCollateral.isZero()) return IntMath.from(0);
  const userElasticLoan = loanPrincipalToElastic(totalLoan, userPrincipal).add(
    additionalBorrow
  );
  return userElasticLoan.div(IntMath.from(ltv).mul(userCollateral));
};

export const calculatePositionHealth = (
  ltv: BigNumber,
  totalLoan: [BigNumber, BigNumber] & { elastic: BigNumber; base: BigNumber },
  userCollateral: BigNumber,
  userPrincipal: BigNumber,
  additionalBorrow: BigNumber
): IntMath => {
  if (userCollateral.isZero())
    return IntMath.from(ethers.utils.parseEther('100'));
  const userElasticLoan = loanPrincipalToElastic(totalLoan, userPrincipal).add(
    additionalBorrow
  );

  return IntMath.from(ethers.utils.parseEther('100')).sub(
    userElasticLoan.div(IntMath.from(ltv).mul(userCollateral))
  );
};

export const calculateLiquidationPrice = (
  ltv: BigNumber,
  totalLoan: [BigNumber, BigNumber] & { elastic: BigNumber; base: BigNumber },
  userCollateral: BigNumber,
  userPrincipal: BigNumber
): IntMath => {
  if (userCollateral.isZero()) return IntMath.from(0);
  const userElasticLoan = loanPrincipalToElastic(totalLoan, userPrincipal);
  return userElasticLoan.div(IntMath.from(ltv).mul(userCollateral));
};

export const calculateDineroLeftToBorrow = (
  ltv: BigNumber,
  totalLoan: [BigNumber, BigNumber] & { elastic: BigNumber; base: BigNumber },
  userCollateral: BigNumber,
  userPrincipal: BigNumber,
  exchangeRate: BigNumber
): IntMath => {
  const userElasticLoan = loanPrincipalToElastic(totalLoan, userPrincipal);
  const collateral = IntMath.from(ltv).mul(userCollateral).mul(exchangeRate);
  return collateral.mul(ltv).sub(userElasticLoan);
};

export const safeAmountToWithdraw = (
  ltv: BigNumber,
  totalLoan: [BigNumber, BigNumber] & { elastic: BigNumber; base: BigNumber },
  userCollateral: BigNumber,
  userPrincipal: BigNumber,
  exchangeRate: BigNumber
): IntMath => {
  const userElasticLoan = loanPrincipalToElastic(totalLoan, userPrincipal);
  const collateral = IntMath.from(ltv).mul(userCollateral).mul(exchangeRate);
  return collateral.sub(userElasticLoan.div(ltv));
};

export const calculateBorrowAmount = (
  userCollateral: BigNumber,
  userPrincipal: BigNumber,
  exchangeRate: BigNumber,
  intendedLTV: BigNumber,
  totalLoan: [BigNumber, BigNumber] & { elastic: BigNumber; base: BigNumber }
): IntMath => {
  const userElasticLoan = loanPrincipalToElastic(totalLoan, userPrincipal);

  return IntMath.from(userCollateral)
    .mul(exchangeRate)
    .mul(intendedLTV)
    .sub(userElasticLoan);
};

export const getCurrencyAmount: TGetCurrencyAmount = (data, currency) =>
  +(
    data?.balances
      .find((x) => x.currency.symbol === currency)
      ?.toSignificant(4) ?? 0
  );

export const getRepayFields: TGetRepayFields = (data, currency) =>
  data?.balances.map((x) => {
    const SVG = TOKENS_SVG_MAP[x.currency.symbol];
    if (x.currency.symbol === TOKEN_SYMBOL.DNR)
      return {
        amount: '0',
        amountUSD: 1,
        CurrencySVG: SVG,
        name: 'repay.loan',
        label: 'Repay Dinero',
        max: +x.toSignificant(4),
        currency: TOKEN_SYMBOL.DNR,
      };

    return {
      currency,
      amount: '0',
      CurrencySVG: SVG,
      max: +x.toSignificant(4),
      name: 'repay.collateral',
      label: 'Remove Collateral',
      amountUSD: data?.market.exchangeRate.isZero()
        ? 0
        : data?.market.exchangeRate
            .div(ethers.utils.parseEther('1'))
            .toNumber() || 0,
    };
  });

export const getBorrowFields: TGetBorrowFields = (data, currency, collateral) =>
  data?.balances.map((x) => {
    const SVG = TOKENS_SVG_MAP[x.currency.symbol];
    if (x.currency.symbol === TOKEN_SYMBOL.DNR)
      return {
        max: data
          ? calculateBorrowAmount(
              data.market.userCollateral.add(
                BigNumber.from(collateral).mul(ethers.utils.parseEther('1'))
              ),
              data.market.userLoan,
              data.market.exchangeRate,
              data.market.ltvRatio,
              data.market.totalLoan
            )
              .value()
              .div(ethers.utils.parseEther('1'))
              .toNumber()
          : 0,
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
        : data?.market.exchangeRate
            .div(ethers.utils.parseEther('1'))
            .toNumber() || 0,
    };
  });

export const getCurrencyLoanData: TGetLoanData = (data, loan) => {
  if (!data) return ['0', '0', '0'];

  const newBorrowAmount = data.market.userLoan.add(
    IntMath.toBigNumber(+loan || 0)
  );

  const expectedLiquidationPrice = calculateExpectedLiquidationPrice(
    data.market.ltvRatio,
    data.market.totalLoan,
    data.market.userCollateral,
    data.market.userLoan,
    loan ? BigNumber.from(loan) : ZERO
  );

  const positionHealth = calculatePositionHealth(
    data.market.ltvRatio,
    data.market.totalLoan,
    data.market.userCollateral,
    data.market.userLoan,
    loan ? BigNumber.from(loan) : ZERO
  );

  return [
    Fraction.from(newBorrowAmount, ethers.utils.parseEther('1')).toSignificant(
      4
    ),
    Fraction.from(
      expectedLiquidationPrice.value(),
      ethers.utils.parseEther('1')
    ).toSignificant(4),
    `${Fraction.from(
      positionHealth.value(),
      ethers.utils.parseEther('1')
    ).toSignificant(4)} %`,
  ];
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
        calculateLiquidationPrice(
          data.market.ltvRatio,
          data.market.totalLoan,
          data.market.userCollateral,
          data.market.userLoan
        ).value(),
        ethers.utils.parseEther('1')
      ).toSignificant(1)
    );
    return [
      collateral.toSignificant(4),
      formatMoney(+collateral.toSignificant(0)),
      Fraction.from(
        loanPrincipalToElastic(
          data.market.totalLoan,
          data.market.userLoan
        ).value(),
        ethers.utils.parseEther('1')
      ).toSignificant(1),
      liquidationPrice,
      Fraction.from(
        calculateDineroLeftToBorrow(
          data.market.ltvRatio,
          data.market.totalLoan,
          data.market.userCollateral,
          data.market.userLoan,
          data.market.exchangeRate
        ).value(),
        ethers.utils.parseEther('1')
      ).toSignificant(1),
      Fraction.from(
        safeAmountToWithdraw(
          data.market.ltvRatio,
          data.market.totalLoan,
          data.market.userCollateral,
          data.market.userLoan,
          data.market.exchangeRate
        ).value(),
        ethers.utils.parseEther('1')
      ).toSignificant(1),
    ];
  }
};
