import { BigNumber } from 'ethers';

import { DineroMarketPair, ERC20, TOKEN_SYMBOL } from '@/sdk';
import { IntMath } from '@/sdk/entities/int-math';
import { IBorrowFormField } from '@/views/dapp/views/dinero-market/components/borrow-form/borrow-form.types';

import { DineroMarketUserDataStructOutput } from '../../types/ethers-contracts/InterestViewAbi';

export interface SafeDineroMarketUserData {
  dineroPair: DineroMarketPair;
  market: {
    totalLoan: {
      elastic: BigNumber;
      base: BigNumber;
    };
    loan: {
      lastAccrued: BigNumber;
      interestRate: BigNumber;
      feesEarned: BigNumber;
    };
    exchangeRate: BigNumber;
    liquidationFee: BigNumber;
    maxLTVRatio: BigNumber;
    userCollateral: BigNumber;
    userLoan: BigNumber;
  };
}

type ProcessedMarketData = SafeDineroMarketUserData['market'];

export type DineroMarketUserData =
  | ([DineroMarketUserDataStructOutput, BigNumber[], BigNumber[]] & {
      returnData: DineroMarketUserDataStructOutput;
      balances: BigNumber[];
      allowances: BigNumber[];
    })
  | undefined;

export type TCurrency = TOKEN_SYMBOL;

export type TGetRepayFields = (
  data: SafeDineroMarketUserData
) => ReadonlyArray<IBorrowFormField>;

export type TGetBorrowFields = (
  data: SafeDineroMarketUserData
) => ReadonlyArray<IBorrowFormField>;

export type TGetPositionHealthDataInternal = (
  borrowAmount: BigNumber,
  collateralAmount: BigNumber,
  data: SafeDineroMarketUserData['market']
) => [string, string, string];

export type TGetBorrowPositionHealthData = (
  data: SafeDineroMarketUserData,
  borrow: { loan: string; collateral: string }
) => [string, string, string];

export type TGetRepayPositionHealthData = (
  data: SafeDineroMarketUserData,
  borrow: { loan: string; collateral: string }
) => [string, string, string];

export type TGetInfoLoanData = (
  data: SafeDineroMarketUserData
) => [string, string, string];

export type TGetMyPositionData = (
  data: SafeDineroMarketUserData
) => [string, string, string, string, string, string];

export type TCalculateInterestAccrued = (
  totalLoan: ProcessedMarketData['totalLoan'],
  loan: ProcessedMarketData['loan']
) => BigNumber;

export type TLoanPrincipalToElastic = (
  totalLoan: ProcessedMarketData['totalLoan'],
  userPrincipal: ProcessedMarketData['userLoan'],
  loan: ProcessedMarketData['loan']
) => IntMath;

export type TCalculateExpectedLiquidationPrice = (
  data: ProcessedMarketData,
  additionalCollateral: BigNumber,
  additionalPrincipal: BigNumber
) => IntMath;

export type TCalculatePositionHealth = (data: ProcessedMarketData) => IntMath;

export type TCalculateDineroLeftToBorrow = (
  data: ProcessedMarketData
) => IntMath;

export type TSafeAmountToWithdraw = (data: ProcessedMarketData) => IntMath;

export type TCalculateBorrowAmount = (data: ProcessedMarketData) => IntMath;

export type TLoanElasticToPrincipal = (
  totalLoan: ProcessedMarketData['totalLoan'],
  userElasticLoan: ProcessedMarketData['userLoan'],
  loan: ProcessedMarketData['loan']
) => IntMath;

export type TSafeAmountToWithdrawRepay = (
  data: ProcessedMarketData,
  repayLoan: BigNumber
) => IntMath;

export type TCalculateUserCurrentLTV = (
  data: ProcessedMarketData,
  borrowCollateral: BigNumber,
  borrowLoan: BigNumber
) => IntMath;

export type MakeDineroMarketPair = (
  collateralBalance: BigNumber,
  collateralAllowance: BigNumber,
  collateral: ERC20,
  dineroBalance: BigNumber,
  dineroAllowance: BigNumber,
  dinero: ERC20
) => DineroMarketPair;
