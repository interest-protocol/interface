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
  TCalculateDineroToRepay,
  TGetBorrowFields,
  TGetBorrowPositionHealthData,
  TGetInfoLoanData,
  TGetMyPositionData,
  TGetPositionHealthDataInternal,
  TGetRepayFields,
  TGetRepayPositionHealthData,
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
  if (totalLoan.base.isZero()) return IntMath.from(ZERO);
  return IntMath.from(userPrincipal).mul(totalLoan.elastic).div(totalLoan.base);
};

export const loanElasticToPrincipal = (
  totalLoan: [BigNumber, BigNumber] & { elastic: BigNumber; base: BigNumber },
  userElasticLoan: BigNumber
): IntMath => {
  if (totalLoan.base.isZero()) return IntMath.from(ZERO);
  return IntMath.from(userElasticLoan)
    .mul(totalLoan.base)
    .div(totalLoan.elastic);
};

export const calculateExpectedLiquidationPrice = (
  ltv: BigNumber,
  totalLoan: [BigNumber, BigNumber] & { elastic: BigNumber; base: BigNumber },
  userCollateral: BigNumber,
  userPrincipal: BigNumber
): IntMath => {
  if (userCollateral.isZero()) return IntMath.from(0);
  const userElasticLoan = loanPrincipalToElastic(totalLoan, userPrincipal);
  return userElasticLoan.div(IntMath.from(ltv).mul(userCollateral));
};

export const calculatePositionHealth = (
  ltv: BigNumber,
  totalLoan: [BigNumber, BigNumber] & { elastic: BigNumber; base: BigNumber },
  userCollateral: BigNumber,
  userPrincipal: BigNumber,
  exchangeRate: BigNumber
): IntMath => {
  if (userPrincipal.isZero() || userCollateral.isZero()) return IntMath.from(0);

  const userElasticLoan = loanPrincipalToElastic(totalLoan, userPrincipal);

  return userElasticLoan.div(
    IntMath.from(userCollateral).mul(exchangeRate).mul(ltv)
  );
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
  return collateral.sub(userElasticLoan);
};

export const safeAmountToWithdraw = (
  ltv: BigNumber,
  totalLoan: [BigNumber, BigNumber] & { elastic: BigNumber; base: BigNumber },
  userCollateral: BigNumber,
  userPrincipal: BigNumber,
  exchangeRate: BigNumber
): IntMath => {
  if (userPrincipal.isZero()) return IntMath.from(userCollateral);
  const userNeededCollateralInUSD = loanPrincipalToElastic(
    totalLoan,
    userPrincipal
  ).div(ltv);
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

export const calculateBorrowAmount = (
  userCollateral: BigNumber,
  userPrincipal: BigNumber,
  exchangeRate: BigNumber,
  intendedLTV: BigNumber,
  totalLoan: [BigNumber, BigNumber] & { elastic: BigNumber; base: BigNumber }
): IntMath => {
  const userElasticLoan = loanPrincipalToElastic(totalLoan, userPrincipal);
  const collateralValue = IntMath.from(userCollateral)
    .mul(exchangeRate)
    .mul(intendedLTV);

  return userElasticLoan.gte(collateralValue)
    ? IntMath.from(ZERO)
    : collateralValue.sub(userElasticLoan);
};

export const getBorrowFields: TGetBorrowFields = (data, currency, collateral) =>
  data
    ? data?.balances.map((x) => {
        const SVG = TOKENS_SVG_MAP[x.currency.symbol];
        if (x.currency.symbol === TOKEN_SYMBOL.DNR)
          return {
            max: data
              ? calculateBorrowAmount(
                  data.market.userCollateral.add(
                    IntMath.toBigNumber(collateral)
                  ),
                  data.market.userLoan,
                  data.market.exchangeRate,
                  data.market.ltvRatio,
                  data.market.totalLoan
                ).toNumber()
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
    : calculateExpectedLiquidationPrice(
        data.ltvRatio,
        data.totalLoan,
        newCollateral,
        newBorrowAmount
      );

  const positionHealth = calculatePositionHealth(
    data.ltvRatio,
    data.totalLoan,
    newCollateral,
    newBorrowAmount,
    data.exchangeRate
  );

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
    data.market.userLoan
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
    data.market.userLoan
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
        calculateExpectedLiquidationPrice(
          data.market.ltvRatio,
          data.market.totalLoan,
          data.market.userCollateral,
          data.market.userLoan
        ).value(),
        ethers.utils.parseEther('1')
      ).toSignificant(4)
    );
    return [
      `${collateral.toSignificant(4)} ${currency}`,
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
            data.market.userLoan
          ).value(),
          ethers.utils.parseEther('1')
        ).toSignificant(4)
      )} DNR`,
      `$${liquidationPrice} (${currency}) `,
      `${formatMoney(
        +Fraction.from(
          calculateDineroLeftToBorrow(
            data.market.ltvRatio,
            data.market.totalLoan,
            data.market.userCollateral,
            data.market.userLoan,
            data.market.exchangeRate
          ).value(),
          ethers.utils.parseEther('1')
        ).toSignificant(4)
      )}`,
      `${Fraction.from(
        safeAmountToWithdraw(
          data.market.ltvRatio,
          data.market.totalLoan,
          data.market.userCollateral,
          data.market.userLoan,
          data.market.exchangeRate
        ).value(),
        ethers.utils.parseEther('1')
      ).toSignificant(4)} ${currency}`,
    ];
  }
};

export const calculateDineroToRepay: TCalculateDineroToRepay = (
  totalLoan,
  userLoan,
  balance,
  intendedLTV = 100
) => {
  const elasticLoan = loanPrincipalToElastic(totalLoan, userLoan);
  const maxToPay = elasticLoan.gt(balance) ? balance : elasticLoan.value();

  const target = elasticLoan.mul(IntMath.toBigNumber(intendedLTV, 16));
  const targetToPay = target.gt(balance) ? IntMath.from(balance) : target;

  return intendedLTV === 100
    ? IntMath.from(maxToPay).toNumber().toString()
    : targetToPay.toNumber().toString();
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
        max: +calculateDineroToRepay(
          data.market.totalLoan,
          data.market.userLoan,
          x.numerator
        ),
        currency: TOKEN_SYMBOL.DNR,
      } as IBorrowFormField;

    return {
      currency,
      amount: '0',
      CurrencySVG: SVG,
      max: safeAmountToWithdraw(
        data.market.ltvRatio,
        data.market.totalLoan,
        data.market.userCollateral,
        data.market.userLoan.sub(
          loanElasticToPrincipal(
            data.market.totalLoan,
            IntMath.toBigNumber(repayLoan)
          ).value()
        ),
        data.market.exchangeRate
      ).toNumber(),
      name: 'repay.collateral',
      label: 'Remove Collateral',
      amountUSD: data?.market.exchangeRate.isZero()
        ? 0
        : IntMath.toNumber(data?.market.exchangeRate) || 0,
    } as IBorrowFormField;
  });

  return [result[1], result[0]];
};
