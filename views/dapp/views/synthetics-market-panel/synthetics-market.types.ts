import { Result } from '@ethersproject/abi';
import { BigNumber, CallOverrides, ContractInterface } from 'ethers';
import { FC, SVGAttributes } from 'react';
import { UseFormResetField, UseFormReturn } from 'react-hook-form';

import { DineroMarketKind } from '@/constants';
import { FixedPointMath } from '@/sdk';

import { InterestViewDinero } from '../../../../types/ethers-contracts/InterestViewDineroV2Abi';

export type TSyntheticsMarketMode = 'borrow' | 'repay';

export interface SyntheticsMarketPanelProps {
  address: string;
  mode: TSyntheticsMarketMode;
}

export interface SyntheticsMarketSwitchProps
  extends SyntheticsMarketPanelProps {
  resetField: UseFormResetField<ISyntheticForm>;
}

export interface ISyntheticForm {
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
  isGettingData: boolean;
  mode: 'borrow' | 'repay';
  data: SyntheticMarketData;
  form: UseFormReturn<ISyntheticForm>;
  refetch: () => Promise<void>;
}

export interface SyntheticMarketData {
  userSyntMinted: BigNumber;
  userCollateral: BigNumber;
  adjustedUserCollateral: BigNumber;
  transferFee: BigNumber;
  liquidationFee: BigNumber;
  tvl: BigNumber;
  tvlInUSD: BigNumber;
  ltv: BigNumber;
  collateralAllowance: BigNumber;
  collateralBalance: BigNumber;
  adjustedCollateralBalance: BigNumber;
  syntBalance: BigNumber;
  syntUSDPrice: BigNumber;
  syntAddress: string;
  pendingRewards: BigNumber;
  symbol: string;
  name: string;
  marketAddress: string;
  collateralDecimals: number;
  collateralAddress: string;
  chainId: number;
}

export interface SyntheticMarketData {
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
  loading: boolean;
  now: number;
}

export type ProcessSyntheticData = (
  chainId: number,
  market: string,
  data: undefined | InterestViewDinero.SyntheticMarketDataStructOutput | Result
) => SyntheticMarketData;

interface TGetPositionHealthDataInternalArgs {
  userCollateralAmount: BigNumber;
  userElasticAmount: BigNumber;
  loanElastic: BigNumber;
}

export type TGetPositionHealthDataInternal = (
  data: TGetPositionHealthDataInternalArgs,
  market: SyntheticMarketData
) => [string, string, string, string];

export type TGetBorrowPositionHealthData = (
  data: SyntheticMarketData,
  borrow: { loan: string; collateral: string }
) => [string, string, string, string];

export type TGetRepayPositionHealthData = (
  data: SyntheticMarketData,
  borrow: { loan: string; collateral: string }
) => [string, string, string, string];

export type TGetInfoLoanData = (
  data: SyntheticMarketData
) => ReadonlyArray<string>;

export type TGetMyPositionData = (
  data: SyntheticMarketData
) => [string, string, string, string, string, string];

interface TCalculateInterestAccruedArgs {
  loanElastic: SyntheticMarketData['loanElastic'];
  lastAccrued: SyntheticMarketData['lastAccrued'];
  interestRate: SyntheticMarketData['interestRate'];
  now: number;
}

export type TCalculateInterestAccrued = (
  data: TCalculateInterestAccruedArgs
) => BigNumber;

interface TLoanPrincipalToElasticArgs {
  loanBase: SyntheticMarketData['loanBase'];
  userPrincipal: SyntheticMarketData['userPrincipal'];
  lastAccrued: SyntheticMarketData['lastAccrued'];
  loanElastic: SyntheticMarketData['loanElastic'];
  interestRate: SyntheticMarketData['interestRate'];
  now: number;
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
  data: SyntheticMarketData,
  userLoanElastic: BigNumber
) => FixedPointMath;

export type TCalculateDineroLeftToBorrow = (
  data: SyntheticMarketData
) => FixedPointMath;

export type TSafeAmountToWithdraw = (
  data: SyntheticMarketData
) => FixedPointMath;

export type TCalculateBorrowAmount = (
  data: SyntheticMarketData
) => FixedPointMath;

export type TSafeAmountToWithdrawRepay = (
  data: SyntheticMarketData,
  repayLoan: BigNumber
) => FixedPointMath;

export type TCalculateUserCurrentLTV = (
  data: SyntheticMarketData,
  borrowCollateral: BigNumber,
  borrowLoan: BigNumber
) => FixedPointMath;

export type SyntheticsCurrencyIcons = ReadonlyArray<{
  SVG: FC<SVGAttributes<SVGSVGElement>>;
  highZIndex: boolean;
}>;

export interface ISyntheticFormField {
  max?: number;
  label: string;
  amount: string;
  currency: string;
  amountUSD: number;
  disabled: boolean;
  currencyIcons: SyntheticsCurrencyIcons;
  name: 'repay.collateral' | 'repay.loan' | 'borrow.collateral' | 'borrow.loan';
}

export type TGetRepayFields = (
  data: SyntheticMarketData
) => ReadonlyArray<ISyntheticFormField>;

export type TGetBorrowFields = (
  data: SyntheticMarketData
) => ReadonlyArray<ISyntheticFormField>;

export interface HandlerData {
  functionName: string;
  contractInterface: ContractInterface;
  args: any[];
  overrides: CallOverrides;
  enabled: boolean;
}
