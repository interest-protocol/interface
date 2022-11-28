import { Result } from '@ethersproject/abi';
import { BigNumber } from 'ethers';
import { FC } from 'react';
import { UseFormResetField, UseFormReturn } from 'react-hook-form';

import { SVGProps } from '@/components/svg/svg.types';
import { TTranslatedMessage } from '@/interface';
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
  syntSymbol: string;
  syntName: string;
  marketAddress: string;
  collateralDecimals: number;
  collateralAddress: string;
  chainId: number;
  loading: boolean;
  account: string;
  collateralName: string;
  collateralSymbol: string;
}

export type ProcessSyntheticData = (
  chainId: number,
  account: string,
  market: string,
  data: undefined | InterestViewDinero.SyntheticMarketDataStructOutput | Result
) => SyntheticMarketData;

interface TGetPositionHealthDataInternalArgs {
  userSyntMinted: BigNumber;
  userAdjustedCollateral: BigNumber;
}

export type TGetPositionHealthDataInternal = (
  data: TGetPositionHealthDataInternalArgs,
  market: SyntheticMarketData
) => [string, string, string];

export type TGetMintPositionHealthData = (
  data: SyntheticMarketData,
  borrow: { synt: string; collateral: string }
) => [string, string, string];

export type TGetBurnPositionHealthData = (
  data: SyntheticMarketData,
  userData: { synt: string; collateral: string }
) => [string, string, string];

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
  SVG: FC<SVGProps>;
  highZIndex: boolean;
}>;

export interface ISyntheticFormField {
  max?: number;
  amount: string;
  currency: string;
  disabled: boolean;
  amountUSD: number;
  label: TTranslatedMessage;
  name: TValidSyntFormFieldNames;
  currencyIcons: SyntheticsCurrencyIcons;
}

export type TGetBurnFields = (
  data: SyntheticMarketData
) => ReadonlyArray<ISyntheticFormField>;

export type TGetMintFields = (
  data: SyntheticMarketData
) => ReadonlyArray<ISyntheticFormField>;

interface ConvertCollateralToSyntData {
  adjustedCollateralAmount: BigNumber;
  ltv: BigNumber;
  syntUSDPrice: BigNumber;
}

export type TConvertCollateralToSynt = (
  data: ConvertCollateralToSyntData
) => BigNumber;

export type TInfo = ReadonlyArray<{
  name: TTranslatedMessage;
  tip: TTranslatedMessage;
}>;
