import { BigNumber } from 'ethers';

import { TOKEN_SYMBOL } from '@/constants/erc-20.data';
import { CurrencyAmount } from '@/sdk/entities/currency-amount';
import { ERC20 } from '@/sdk/entities/erc-20';
import { IntMath } from '@/sdk/entities/int-math';
import { calculateUserCurrentLTV } from '@/utils/dinero-market/index';
import { IBorrowFormField } from '@/views/dapp/views/dinero-market/components/borrow-form/borrow-form.types';

export interface GetDineroMarketUserDataReturn {
  exchangeRate: BigNumber;
  loan: [BigNumber, BigNumber, BigNumber] & {
    lastAccrued: BigNumber;
    INTEREST_RATE: BigNumber;
    feesEarned: BigNumber;
  };
  liquidationFee: BigNumber;
  ltvRatio: BigNumber;
  userCollateral: BigNumber;
  userLoan: BigNumber;
  totalLoan: [BigNumber, BigNumber] & { elastic: BigNumber; base: BigNumber };
  allowance: BigNumber;
}

export type MarketAndBalancesData = {
  balances: [CurrencyAmount<ERC20>, CurrencyAmount<ERC20>];
  market: GetDineroMarketUserDataReturn;
};

export type TCurrency = TOKEN_SYMBOL;

export type TGetRepayFields = (
  data: MarketAndBalancesData,
  currency: TCurrency
) => ReadonlyArray<IBorrowFormField>;

export type TGetBorrowFields = (
  data: MarketAndBalancesData,
  currency: TCurrency
) => ReadonlyArray<IBorrowFormField>;

export type TGetPositionHealthDataInternal = (
  borrowAmount: BigNumber,
  collateralAmount: BigNumber,
  data: GetDineroMarketUserDataReturn
) => [string, string, string];

export type TGetBorrowPositionHealthData = (
  data: MarketAndBalancesData,
  borrow: { loan: string; collateral: string }
) => [string, string, string];

export type TGetRepayPositionHealthData = (
  data: MarketAndBalancesData,
  borrow: { loan: string; collateral: string }
) => [string, string, string];

export type TGetInfoLoanData = (
  data: MarketAndBalancesData
) => [string, string, string];

export type TGetMyPositionData = (
  data: MarketAndBalancesData,
  currency: TOKEN_SYMBOL
) => [string, string, string, string, string, string];

export type TCalculateInterestAccrued = (
  totalLoan: GetDineroMarketUserDataReturn['totalLoan'],
  loan: GetDineroMarketUserDataReturn['loan']
) => BigNumber;

export type TLoanPrincipalToElastic = (
  totalLoan: GetDineroMarketUserDataReturn['totalLoan'],
  userPrincipal: GetDineroMarketUserDataReturn['userLoan'],
  loan: GetDineroMarketUserDataReturn['loan']
) => IntMath;

export type TCalculateExpectedLiquidationPrice = (
  data: GetDineroMarketUserDataReturn
) => IntMath;

export type TCalculatePositionHealth = (
  data: GetDineroMarketUserDataReturn
) => IntMath;

export type TCalculateDineroLeftToBorrow = (
  data: GetDineroMarketUserDataReturn
) => IntMath;

export type TSafeAmountToWithdraw = (
  data: GetDineroMarketUserDataReturn
) => IntMath;

export type TCalculateBorrowAmount = (
  data: GetDineroMarketUserDataReturn
) => IntMath;

export type TLoanElasticToPrincipal = (
  totalLoan: GetDineroMarketUserDataReturn['totalLoan'],
  userElasticLoan: GetDineroMarketUserDataReturn['userLoan'],
  loan: GetDineroMarketUserDataReturn['loan']
) => IntMath;

export type TSafeAmountToWithdrawRepay = (
  data: GetDineroMarketUserDataReturn,
  repayLoan: BigNumber
) => IntMath;

export type TCalculateUserCurrentLTV = (
  data: GetDineroMarketUserDataReturn,
  borrowCollateral: BigNumber,
  borrowLoan: BigNumber
) => IntMath;
