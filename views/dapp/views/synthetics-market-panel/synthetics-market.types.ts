import { Result } from '@ethersproject/abi';
import { BigNumber, CallOverrides, ContractInterface } from 'ethers';
import { FC, SVGAttributes } from 'react';
import { UseFormResetField, UseFormReturn } from 'react-hook-form';

import { FixedPointMath } from '@/sdk';

import { InterestViewDinero } from '../../../../types/ethers-contracts/InterestViewDineroV2Abi';

export type TSyntheticsMarketMode = 'mint' | 'burn';

export type TValidSyntFormFieldNames =
  | 'mint.collateral'
  | 'mint.synt'
  | 'burn.collateral'
  | 'burn.synt';

export interface SyntheticsMarketPanelProps {
  address: string;
  mode: TSyntheticsMarketMode;
}

export interface SyntheticsMarketSwitchProps
  extends SyntheticsMarketPanelProps {
  resetField: UseFormResetField<ISyntheticForm>;
}

export interface ISyntheticForm {
  mint: {
    collateral: string;
    synt: string;
  };
  burn: {
    collateral: string;
    synt: string;
  };
}

export interface FormsProps {
  isGettingData: boolean;
  mode: TSyntheticsMarketMode;
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
  loading: boolean;
  account: string;
}

export type ProcessSyntheticData = (
  chainId: number,
  account: string,
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

export type TGetMintPositionHealthData = (
  data: SyntheticMarketData,
  borrow: { synt: string; collateral: string }
) => [string, string, string, string];

export type TGetBurnPositionHealthData = (
  data: SyntheticMarketData,
  borrow: { synt: string; collateral: string }
) => [string, string, string, string];

export type TGetRewardsInfo = (
  data: SyntheticMarketData
) => ReadonlyArray<string>;

export type TGetMyPositionData = (
  data: SyntheticMarketData
) => [string, string, string, string, string, string];

interface TCalculateSyntExpectedLiquidationPriceArgs {
  ltv: BigNumber;
  adjustedUserCollateral: BigNumber;
  syntMinted: BigNumber;
  syntUSDPrice: BigNumber;
}

export type TCalculateSyntExpectedLiquidationPrice = (
  data: TCalculateSyntExpectedLiquidationPriceArgs
) => FixedPointMath;

export type TCalculatePositionHealth = (
  data: SyntheticMarketData,
  newSyntAmount: BigNumber
) => FixedPointMath;

export type TCalculateSyntLeftToMint = (
  data: SyntheticMarketData
) => FixedPointMath;

export type TSafeAmountToWithdraw = (
  data: SyntheticMarketData
) => FixedPointMath;

export type TCalculateMintAmount = (
  data: SyntheticMarketData
) => FixedPointMath;

export type TSafeAmountToWithdrawRepay = (
  data: SyntheticMarketData,
  burnAmount: BigNumber
) => FixedPointMath;

export type TCalculateUserCurrentLTV = (
  data: SyntheticMarketData,
  mintCollateral: BigNumber,
  mintSynt: BigNumber
) => FixedPointMath;

export type SyntheticsCurrencyIcons = ReadonlyArray<{
  SVG: FC<SVGAttributes<SVGSVGElement>>;
  highZIndex: boolean;
}>;

export interface ISyntheticFormField {
  label: string;
  amount: string;
  currency: string;
  amountUSD: number;
  disabled: boolean;
  max?: number;
  currencyIcons: SyntheticsCurrencyIcons;
  name: TValidSyntFormFieldNames;
}

export type TGetBurnFields = (
  data: SyntheticMarketData
) => ReadonlyArray<ISyntheticFormField>;

export type TGetMintFields = (
  data: SyntheticMarketData
) => ReadonlyArray<ISyntheticFormField>;

export interface HandlerData {
  functionName: string;
  contractInterface: ContractInterface;
  args: any[];
  overrides: CallOverrides;
  enabled: boolean;
}
