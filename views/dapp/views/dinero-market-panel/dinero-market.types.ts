import { BigNumber } from 'ethers';
import { FC, SVGAttributes } from 'react';
import { UseFormResetField, UseFormReturn } from 'react-hook-form';

import { DineroMarketKind } from '@/constants';
import { FixedPointMath } from '@/sdk';

import { InterestViewDinero } from '../../../../types/ethers-contracts/InterestViewDineroV2Abi';

type TDineroMarketMode = 'borrow' | 'repay';

export interface DineroMarketPanelProps {
  address: string;
  mode: TDineroMarketMode;
}

export interface DineroMarketSwitchProps extends DineroMarketPanelProps {
  resetField: UseFormResetField<IBorrowForm>;
}

export interface IBorrowForm {
  repay: {
    collateral: string;
    loan: string;
    max: boolean;
  };
  borrow: {
    collateral: string;
    loan: string;
  };
}

export interface FormsProps {
  account: string;
  isSubmitting: boolean;
  isGettingData: boolean;
  mode: 'borrow' | 'repay';
  onSubmitRepay: () => void;
  onSubmitBorrow: () => void;
  data: DineroMarketData;
  form: UseFormReturn<IBorrowForm>;
  handleAddAllowance: () => Promise<void>;
}

export interface DineroMarketData {
  kind: DineroMarketKind;
  loanElastic: BigNumber;
  loanBase: BigNumber;
  userPrincipal: BigNumber;
  userCollateral: BigNumber;
  adjustedUserCollateral: BigNumber;
  interestRate: BigNumber;
  lastAccrued: BigNumber;
  collateralUSDPrice: BigNumber;
  liquidationFee: BigNumber;
  ltv: BigNumber;
  collateralAllowance: BigNumber;
  collateralBalance: BigNumber;
  adjustedCollateralBalance: BigNumber;
  dnrBalance: BigNumber;
  pendingRewards: BigNumber;
  apr: FixedPointMath;
  symbol0: string;
  symbol1: string;
  name: string;
  stable: boolean;
  marketAddress: string;
  collateralDecimals: number;
  collateralAddress: string;
  intUSDPrice: BigNumber;
  chainId: number;
  maxBorrowAmount: BigNumber;
  rewardsBalance: BigNumber;
}

export type GetSafeDineroMarketData = (
  chainId: number,
  market: string,
  data:
    | undefined
    | ([
        InterestViewDinero.DineroMarketDataStructOutput,
        InterestViewDinero.PoolDataStructOutput,
        InterestViewDinero.PoolDataStructOutput,
        InterestViewDinero.MintDataStructOutput,
        BigNumber,
        BigNumber
      ] & {
        marketData: InterestViewDinero.DineroMarketDataStructOutput;
        ipxPoolData: InterestViewDinero.PoolDataStructOutput;
        collateralPoolData: InterestViewDinero.PoolDataStructOutput;
        mintData: InterestViewDinero.MintDataStructOutput;
        nativeUSDPrice: BigNumber;
        baseTokenUSDPrice: BigNumber;
      })
) => DineroMarketData;

type ProcessedMarketData = DineroMarketData;

interface TGetPositionHealthDataInternalArgs {
  userCollateralAmount: BigNumber;
  userElasticAmount: BigNumber;
  loanElastic: BigNumber;
}

export type TGetPositionHealthDataInternal = (
  data: TGetPositionHealthDataInternalArgs,
  market: DineroMarketData
) => [string, string, string, string];

export type TGetBorrowPositionHealthData = (
  data: DineroMarketData,
  borrow: { loan: string; collateral: string }
) => [string, string, string, string];

export type TGetRepayPositionHealthData = (
  data: DineroMarketData,
  borrow: { loan: string; collateral: string }
) => [string, string, string, string];

export type TGetInfoLoanData = (
  data: DineroMarketData,
  kind: DineroMarketKind
) => ReadonlyArray<string>;

export type TGetMyPositionData = (
  data: DineroMarketData
) => [string, string, string, string, string, string];

interface TCalculateInterestAccruedArgs {
  loanElastic: ProcessedMarketData['loanElastic'];
  lastAccrued: ProcessedMarketData['lastAccrued'];
  interestRate: ProcessedMarketData['interestRate'];
}

export type TCalculateInterestAccrued = (
  data: TCalculateInterestAccruedArgs
) => BigNumber;

interface TLoanPrincipalToElasticArgs {
  loanBase: ProcessedMarketData['loanBase'];
  userPrincipal: ProcessedMarketData['userPrincipal'];
  lastAccrued: ProcessedMarketData['lastAccrued'];
  loanElastic: ProcessedMarketData['loanElastic'];
  interestRate: ProcessedMarketData['interestRate'];
}

export type TLoanPrincipalToElastic = (
  data: TLoanPrincipalToElasticArgs
) => FixedPointMath;

interface TCalculateExpectedLiquidationPriceArgs {
  ltv: BigNumber;
  collateralUSDPrice: BigNumber;
  adjustUserCollateral: BigNumber;
  userElasticLoan: BigNumber;
}

export type TCalculateExpectedLiquidationPrice = (
  data: TCalculateExpectedLiquidationPriceArgs
) => FixedPointMath;

export type TCalculatePositionHealth = (
  data: ProcessedMarketData,
  userLoanElastic: BigNumber
) => FixedPointMath;

export type TCalculateDineroLeftToBorrow = (
  data: ProcessedMarketData
) => FixedPointMath;

export type TSafeAmountToWithdraw = (
  data: ProcessedMarketData
) => FixedPointMath;

export type TCalculateBorrowAmount = (
  data: ProcessedMarketData
) => FixedPointMath;

interface TLoanElasticToPrincipalArgs {
  loanBase: ProcessedMarketData['loanBase'];
  loanElastic: ProcessedMarketData['loanElastic'];
  userElastic: BigNumber;
  lastAccrued: ProcessedMarketData['lastAccrued'];
  interestRate: ProcessedMarketData['interestRate'];
}

export type TLoanElasticToPrincipal = (
  data: TLoanElasticToPrincipalArgs
) => FixedPointMath;

export type TSafeAmountToWithdrawRepay = (
  data: ProcessedMarketData,
  repayLoan: BigNumber
) => FixedPointMath;

export type TCalculateUserCurrentLTV = (
  data: ProcessedMarketData,
  borrowCollateral: BigNumber,
  borrowLoan: BigNumber
) => FixedPointMath;

export type DineroCurrencyIcons = ReadonlyArray<{
  SVG: FC<SVGAttributes<SVGSVGElement>>;
  highZIndex: boolean;
}>;

export interface IBorrowFormField {
  max?: number;
  label: string;
  amount: string;
  currency: string;
  amountUSD: number;
  disabled: boolean;
  currencyIcons: DineroCurrencyIcons;
  name: 'repay.collateral' | 'repay.loan' | 'borrow.collateral' | 'borrow.loan';
}

export type TGetRepayFields = (
  data: DineroMarketData
) => ReadonlyArray<IBorrowFormField>;

export type TGetBorrowFields = (
  data: DineroMarketData
) => ReadonlyArray<IBorrowFormField>;
