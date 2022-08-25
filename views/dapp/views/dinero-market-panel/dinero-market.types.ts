import { BigNumber } from 'ethers';
import { FC, SVGAttributes } from 'react';
import { UseFormResetField, UseFormReturn } from 'react-hook-form';

import { DineroMarketKind } from '@/constants';
import { IntMath } from '@/sdk';

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
  loanBase: BigNumber;
  loanElastic: BigNumber;
  interestRate: BigNumber;
  lastAccrued: BigNumber;
  collateralUSDPrice: BigNumber;
  liquidationFee: BigNumber;
  ltv: BigNumber;
  userCollateral: BigNumber;
  userPrincipal: BigNumber;
  collateralAllowance: BigNumber;
  collateralBalance: BigNumber;
  dnrBalance: BigNumber;
  pendingRewards: BigNumber;
  apr: IntMath;
  symbol0: string;
  symbol1: string;
  name: string;
  stable: boolean;
  marketAddress: string;
  collateralDecimals: number;
  collateralAddress: string;
  intUSDPrice: BigNumber;
  chainId: number;
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

export type TGetPositionHealthDataInternal = (
  borrowAmount: BigNumber,
  collateralAmount: BigNumber,
  data: DineroMarketData
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

export type TCalculateInterestAccrued = (
  totalLoan: ProcessedMarketData['loanBase'],
  lastAccrued: ProcessedMarketData['lastAccrued'],
  interestRate: ProcessedMarketData['interestRate']
) => BigNumber;

export type TLoanPrincipalToElastic = (
  loanBase: ProcessedMarketData['loanBase'],
  userPrincipal: ProcessedMarketData['userPrincipal'],
  lastAccrued: ProcessedMarketData['lastAccrued'],
  loanElastic: ProcessedMarketData['loanElastic'],
  interestRate: ProcessedMarketData['interestRate']
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
  loanBase: ProcessedMarketData['loanBase'],
  lastAccrued: ProcessedMarketData['lastAccrued'],
  loanElastic: ProcessedMarketData['loanElastic'],
  interestRate: ProcessedMarketData['interestRate']
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
