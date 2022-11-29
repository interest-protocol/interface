import { Result } from '@ethersproject/abi';
import { ethers } from 'ethers';
import { UseFormReturn } from 'react-hook-form';
import { InterestViewDinero } from 'types/ethers-contracts/InterestViewDineroV2Abi';

import {
  getSyntheticsMarketSVGByAddress,
  IS_STABLE_COIN_MAP,
  SYNTHETIC_PANEL_RESPONSE_MAP,
  SyntheticOracleType,
} from '@/constants';
import { TTranslatedMessage } from '@/interface';
import {
  CHAIN_ID,
  FixedPointMath,
  ONE_ETHER,
  ZERO_ADDRESS,
  ZERO_BIG_NUMBER,
} from '@/sdk';
import { Fraction } from '@/sdk/entities/fraction';
import { closeTo } from '@/sdk/utils';
import {
  adjustDecimals,
  formatDollars,
  formatMoney,
  hasKeys,
  numberToString,
} from '@/utils';

import {
  ISyntheticForm,
  ProcessSyntheticData,
  TCalculateMintAmount,
  TCalculatePositionHealth,
  TCalculateSyntExpectedLiquidationPrice,
  TCalculateSyntLeftToMint,
  TCalculateUserCurrentLTV,
  TConvertCollateralToSynt,
  TGetBurnFields,
  TGetBurnPositionHealthData,
  TGetMintFields,
  TGetMintPositionHealthData,
  TGetMyPositionData,
  TGetPositionHealthDataInternal,
  TGetRewardsInfo,
  TMarketDataAttribute,
  TSafeAmountToWithdraw,
  TSafeAmountToWithdrawRepay,
} from './synthetics-market-panel.types';

export const isFormMintEmpty = (form: UseFormReturn<ISyntheticForm>) =>
  form.formState.errors.mint ||
  form.formState.errors.mint?.['synt'] ||
  form.formState.errors.mint?.['collateral'];

export const isFormBurnEmpty = (form: UseFormReturn<ISyntheticForm>) =>
  form.formState.errors.burn ||
  form.formState.errors.burn?.['synt'] ||
  form.formState.errors.burn?.['collateral'];

const DEFAULT_MARKET_DATA = {
  userSyntMinted: ZERO_BIG_NUMBER,
  userCollateral: ZERO_BIG_NUMBER,
  adjustedUserCollateral: ZERO_BIG_NUMBER,
  transferFee: ZERO_BIG_NUMBER,
  liquidationFee: ZERO_BIG_NUMBER,
  tvl: ZERO_BIG_NUMBER,
  tvlInUSD: ZERO_BIG_NUMBER,
  ltv: ZERO_BIG_NUMBER,
  collateralAllowance: ZERO_BIG_NUMBER,
  collateralBalance: ZERO_BIG_NUMBER,
  adjustedCollateralBalance: ZERO_BIG_NUMBER,
  syntBalance: ZERO_BIG_NUMBER,
  syntPrice: ZERO_BIG_NUMBER,
  syntAddress: ZERO_ADDRESS,
  pendingRewards: ZERO_BIG_NUMBER,
  syntSymbol: '',
  syntName: '',
  marketAddress: ZERO_ADDRESS,
  collateralDecimals: 18,
  collateralAddress: ZERO_ADDRESS,
  chainId: CHAIN_ID.BNB_TEST_NET,
  loading: true,
  account: ZERO_ADDRESS,
  collateralName: 'Unknown',
  collateralSymbol: 'Unknown',
  dataFeedId: '',
  oracleType: SyntheticOracleType.ChainLink,
  isCollateralStable: false,
};

const MARKET_DATA_KEYS: ReadonlyArray<TMarketDataAttribute> = [
  'userSyntMinted',
  'transferFee',
  'syntheticUSDPrice',
  'liquidationFee',
  'TVL',
  'LTV',
  'userCollateral',
  'collateralAllowance',
  'collateralBalance',
  'syntBalance',
  'pendingRewards',
];

const isMissingAttribute = (
  data: InterestViewDinero.SyntheticMarketDataStructOutput | Result
) =>
  !hasKeys<InterestViewDinero.SyntheticMarketDataStructOutput | Result>(
    MARKET_DATA_KEYS,
    data
  );

export const processSyntheticData: ProcessSyntheticData = (
  chainId,
  account,
  market,
  data
) => {
  if (!ethers.utils.isAddress(market) || !chainId || !data)
    return DEFAULT_MARKET_DATA;

  const responseMap =
    SYNTHETIC_PANEL_RESPONSE_MAP[chainId][ethers.utils.getAddress(market)];

  if (!responseMap || isMissingAttribute(data)) return DEFAULT_MARKET_DATA;

  return {
    userSyntMinted: data.userSyntMinted,
    userCollateral: data.userCollateral,
    adjustedUserCollateral: adjustDecimals(
      data.userCollateral,
      responseMap.collateralDecimals
    ),
    transferFee: data.transferFee,
    liquidationFee: data.liquidationFee,
    tvl: data.TVL,
    tvlInUSD: FixedPointMath.from(data.TVL).mul(data.syntheticUSDPrice).value(),
    ltv: data.LTV,
    collateralAllowance: data.collateralAllowance,
    collateralBalance: data.collateralBalance,
    adjustedCollateralBalance: adjustDecimals(
      data.collateralBalance,
      responseMap.collateralDecimals
    ),
    syntBalance: data.syntBalance,
    // RedStone prices come with 8 decimals
    syntPrice:
      responseMap.oracleType === SyntheticOracleType.RedStoneConsumer
        ? adjustDecimals(data.syntheticUSDPrice, 8)
        : data.syntheticUSDPrice,
    syntAddress: responseMap.syntAddress,
    pendingRewards: data.pendingRewards,
    syntSymbol: responseMap.syntSymbol,
    syntName: responseMap.syntName,
    marketAddress: responseMap.marketAddress,
    collateralDecimals: responseMap.collateralDecimals,
    collateralAddress: responseMap.collateralAddress,
    chainId,
    loading: false,
    account: account || ZERO_ADDRESS,
    collateralName: responseMap.collateralName,
    collateralSymbol: responseMap.collateralSymbol,
    dataFeedId: responseMap.dataFeedId,
    oracleType: responseMap.oracleType,
    isCollateralStable:
      IS_STABLE_COIN_MAP[chainId][responseMap.collateralAddress] || false,
  };
};

export const calculateSyntExpectedLiquidationPrice: TCalculateSyntExpectedLiquidationPrice =
  ({ ltv, syntMinted, adjustedUserCollateral, syntPrice }): FixedPointMath => {
    if (adjustedUserCollateral.isZero()) return FixedPointMath.from(syntPrice);

    const fixedPointUserSyntMinted = FixedPointMath.from(syntMinted);

    const userCollateralValue = FixedPointMath.from(adjustedUserCollateral).mul(
      ltv
    );

    return userCollateralValue.div(fixedPointUserSyntMinted);
  };

export const calculatePositionHealth: TCalculatePositionHealth = (
  { ltv, adjustedUserCollateral, syntPrice },
  newSyntAmount
) => {
  if (newSyntAmount.isZero()) return FixedPointMath.from(0);

  if (adjustedUserCollateral.isZero() && !newSyntAmount.isZero())
    return FixedPointMath.from(ethers.utils.parseEther('1'));

  const userCollateralValue = FixedPointMath.from(adjustedUserCollateral).mul(
    ltv
  );

  const fixedMathUserSyntInUSD =
    FixedPointMath.from(newSyntAmount).mul(syntPrice);

  if (fixedMathUserSyntInUSD.gte(userCollateralValue))
    return FixedPointMath.from(0);

  return fixedMathUserSyntInUSD.div(userCollateralValue);
};

export const calculateSyntLeftToMint: TCalculateSyntLeftToMint = ({
  ltv,
  adjustedUserCollateral,
  userSyntMinted,
  syntPrice,
}): FixedPointMath => {
  const collateralInUSD = FixedPointMath.from(ltv).mul(adjustedUserCollateral);

  const syntInUSD = FixedPointMath.from(userSyntMinted).mul(syntPrice);

  if (syntInUSD.gte(collateralInUSD)) return FixedPointMath.from(0);

  return collateralInUSD.sub(syntInUSD).div(syntPrice);
};

export const safeAmountToWithdrawRepay: TSafeAmountToWithdrawRepay = (
  { ltv, adjustedUserCollateral, syntPrice, userSyntMinted },
  burnAmount
) => {
  if (userSyntMinted.isZero())
    return FixedPointMath.from(adjustedUserCollateral);

  if (burnAmount.gte(userSyntMinted))
    return FixedPointMath.from(adjustedUserCollateral);

  const userNeededCollateralInUSD = FixedPointMath.from(
    userSyntMinted.sub(burnAmount)
  )
    .mul(syntPrice)
    .div(ltv);

  const amount = FixedPointMath.from(
    userNeededCollateralInUSD.gte(adjustedUserCollateral)
      ? ZERO_BIG_NUMBER
      : adjustedUserCollateral.sub(userNeededCollateralInUSD.value())
  );

  return amount.mul(ethers.utils.parseEther('0.95'));
};

export const safeAmountToWithdraw: TSafeAmountToWithdraw = ({
  syntPrice,
  adjustedUserCollateral,
  userSyntMinted,
  ltv,
}) => {
  const userNeededCollateralInUSD = FixedPointMath.from(userSyntMinted)
    .mul(syntPrice)
    .div(ltv);

  const amount = userNeededCollateralInUSD.gte(adjustedUserCollateral)
    ? ZERO_BIG_NUMBER
    : adjustedUserCollateral.sub(userNeededCollateralInUSD.value());

  return FixedPointMath.from(
    closeTo(amount, ONE_ETHER, ethers.utils.parseEther('0.001'))
      ? amount
      : amount.mul(ethers.utils.parseEther('0.95'))
  );
};

export const calculateMintAmount: TCalculateMintAmount = ({
  ltv,
  adjustedUserCollateral,
  userSyntMinted,
  syntPrice,
}) => {
  const collateral = FixedPointMath.from(adjustedUserCollateral).mul(ltv);
  const fixedPointUserSyntInCollateral =
    FixedPointMath.from(userSyntMinted).mul(syntPrice);

  return fixedPointUserSyntInCollateral.gte(collateral)
    ? FixedPointMath.from(ZERO_BIG_NUMBER)
    : collateral.sub(fixedPointUserSyntInCollateral).div(syntPrice);
};

const getPositionHealthDataInternal: TGetPositionHealthDataInternal = (
  { userAdjustedCollateral, userSyntMinted },
  market
) => {
  const expectedLiquidationPrice = FixedPointMath.from(userSyntMinted)
    .mul(market.syntPrice)
    .gte(userAdjustedCollateral)
    ? FixedPointMath.from(market.syntPrice)
    : calculateSyntExpectedLiquidationPrice({
        ltv: market.ltv,
        syntMinted: userSyntMinted,
        adjustedUserCollateral: userAdjustedCollateral,
        syntPrice: market.syntPrice,
      });

  const positionHealth = userSyntMinted.isZero()
    ? ethers.utils.parseEther('1')
    : calculatePositionHealth(
        {
          ...market,
          adjustedUserCollateral: userAdjustedCollateral,
        },
        userSyntMinted
      ).value();

  const roundPositionHealthNumber = Math.trunc(
    FixedPointMath.toNumber(positionHealth) * 100
  );

  const formattedExpectedLiquidationPrice = market.isCollateralStable
    ? formatDollars(
        Math.floor(
          +Fraction.from(
            expectedLiquidationPrice.value(),
            ethers.utils.parseEther('1')
          ).toSignificant(4)
        )
      )
    : `${formatMoney(
        Math.floor(
          +Fraction.from(
            expectedLiquidationPrice.value(),
            ethers.utils.parseEther('1')
          ).toSignificant(4)
        )
      )} ${market.collateralSymbol}`;

  return [
    userSyntMinted.isZero()
      ? '0'
      : numberToString(FixedPointMath.from(userSyntMinted).toNumber()),
    formattedExpectedLiquidationPrice,
    `${
      roundPositionHealthNumber > 100
        ? roundPositionHealthNumber
        : 100 - roundPositionHealthNumber
    } %`,
  ];
};

export const getBurnPositionHealthData: TGetBurnPositionHealthData = (
  market,
  { collateral, synt }
) => {
  if (!market) return ['0', '0', '0'];

  const syntBurnAmount = FixedPointMath.from(FixedPointMath.toBigNumber(synt));

  const mintedAmount = market.userSyntMinted;

  const newMintedAmount = syntBurnAmount.gte(mintedAmount)
    ? ZERO_BIG_NUMBER
    : mintedAmount.sub(syntBurnAmount.value());

  const bnCollateral = FixedPointMath.toBigNumber(collateral);

  const newCollateral = bnCollateral.gte(market.adjustedUserCollateral)
    ? ZERO_BIG_NUMBER
    : market.adjustedUserCollateral.sub(bnCollateral);

  return getPositionHealthDataInternal(
    {
      userSyntMinted: newMintedAmount,
      userAdjustedCollateral: newCollateral,
    },
    market
  );
};

export const getMintPositionHealthData: TGetMintPositionHealthData = (
  market,
  { collateral, synt }
) => {
  if (!market) return ['0', '0', '0'];

  const totalUserMintedAmount = market.userSyntMinted.add(
    FixedPointMath.toBigNumber(synt)
  );

  const newCollateral = market.adjustedUserCollateral.add(
    FixedPointMath.toBigNumber(collateral)
  );

  return getPositionHealthDataInternal(
    {
      userSyntMinted: totalUserMintedAmount,
      userAdjustedCollateral: newCollateral,
    },
    market
  );
};

export const getRewardsInfo: TGetRewardsInfo = (market) => {
  if (!market) return ['0%', '0%', '0', '0'];

  const ltv = FixedPointMath.from(market.ltv).toPercentage();

  const liquidationFee = FixedPointMath.from(
    market.liquidationFee
  ).toPercentage();

  const fixedPointMathRewards = FixedPointMath.from(market.pendingRewards);

  const pendingRewardsValue = market.isCollateralStable
    ? `${formatDollars(
        // Synt assets have 18 decimals
        fixedPointMathRewards.mul(market.syntPrice).toNumber()
      )}`
    : `${formatMoney(fixedPointMathRewards.mul(market.syntPrice).toNumber())} ${
        market.collateralSymbol
      }`;

  return [
    ltv,
    liquidationFee,
    `${formatMoney(fixedPointMathRewards.toNumber())} ${market.syntSymbol}`,
    pendingRewardsValue,
  ];
};

export const getMyPositionData: TGetMyPositionData = (market) => {
  {
    if (!market) return ['0', '0', '$0', '$0', '0', '0'];

    const syntheticValue = +Fraction.from(
      FixedPointMath.from(market.userSyntMinted).mul(market.syntPrice).value(),
      ethers.utils.parseEther('1')
    ).toSignificant(8);

    const formattedSyntheticValue = market.isCollateralStable
      ? `${formatDollars(syntheticValue)}`
      : `${formatMoney(syntheticValue)} ${market.collateralSymbol}`;

    const liquidationValue = +Fraction.from(
      calculateSyntExpectedLiquidationPrice({
        ltv: market.ltv,
        syntMinted: market.userSyntMinted,
        adjustedUserCollateral: market.adjustedUserCollateral,
        syntPrice: market.syntPrice,
      }).value(),
      ethers.utils.parseEther('1')
    ).toSignificant(4);

    const formattedLiquidationValue = market.isCollateralStable
      ? formatDollars(liquidationValue)
      : `${formatMoney(liquidationValue)} ${market.collateralSymbol}`;

    return [
      `${formatMoney(
        FixedPointMath.from(market.adjustedUserCollateral).toNumber()
      )} ${market.collateralSymbol}`,
      `${formatMoney(
        +Fraction.from(
          market.userSyntMinted,
          ethers.utils.parseEther('1')
        ).toSignificant(8)
      )} ${market.syntSymbol}`,
      formattedSyntheticValue,
      `${formattedLiquidationValue} (${market.syntSymbol}) `,
      `${formatMoney(
        +Fraction.from(
          calculateSyntLeftToMint(market).value(),
          ethers.utils.parseEther('1')
        ).toSignificant(4)
      )} ${market.syntSymbol}`,
      `${Fraction.from(
        safeAmountToWithdraw(market).value(),
        ethers.utils.parseEther('1')
      ).toSignificant(4)} ${market.collateralSymbol}`,
    ];
  }
};

export const convertCollateralToSynt: TConvertCollateralToSynt = ({
  ltv,
  syntPrice,
  adjustedCollateralAmount,
}) =>
  FixedPointMath.from(adjustedCollateralAmount).mul(ltv).div(syntPrice).value();

export const calculateUserCurrentLTV: TCalculateUserCurrentLTV = (
  { adjustedUserCollateral, userSyntMinted, syntPrice },
  mintCollateral,
  mintSynt
) => {
  const collateralInUSD = FixedPointMath.from(
    adjustedUserCollateral.add(mintCollateral)
  );

  const syntMinted = FixedPointMath.from(userSyntMinted.add(mintSynt)).mul(
    syntPrice
  );

  return syntMinted.div(collateralInUSD);
};

export const getMintFields: TGetMintFields = (market) => {
  if (!market) return [];

  return [
    {
      currency: market.collateralSymbol,
      amount: '0',
      currencyIcons: getSyntheticsMarketSVGByAddress(
        market.chainId,
        market.marketAddress,
        true
      ),
      max: FixedPointMath.toNumber(market.adjustedCollateralBalance),
      name: 'mint.collateral',
      label:
        'syntheticsMarketAddress.mint.collateralLabel' as TTranslatedMessage,
      price: 1,
      disabled: market.collateralBalance.isZero(),
    },
    {
      max: calculateMintAmount(market).toNumber(),
      amount: '0',
      price: FixedPointMath.from(market.syntPrice).toNumber(),
      currencyIcons: getSyntheticsMarketSVGByAddress(
        market.chainId,
        market.marketAddress
      ),
      name: 'mint.synt',
      label:
        'syntheticsMarketAddress.mint.syntheticLabel' as TTranslatedMessage,
      currency: market.syntSymbol,
      disabled:
        market.collateralBalance.isZero() && market.userCollateral.isZero(),
    },
  ];
};

export const getBurnFields: TGetBurnFields = (market) => {
  if (!market) return [];

  return [
    {
      amount: '0',
      price: FixedPointMath.from(market.syntPrice).toNumber(),
      currencyIcons: getSyntheticsMarketSVGByAddress(
        market.chainId,
        market.marketAddress
      ),
      name: 'burn.synt',
      currency: market.syntSymbol,
      disabled: market.syntBalance.isZero(),
      label:
        'syntheticsMarketAddress.burn.syntheticLabel' as TTranslatedMessage,
      max: FixedPointMath.from(market.syntBalance).toNumber(),
    },
    {
      currency: market.collateralSymbol,
      amount: '0',
      currencyIcons: getSyntheticsMarketSVGByAddress(
        market.chainId,
        market.marketAddress,
        true
      ),
      max: safeAmountToWithdraw(market).toNumber(),
      name: 'burn.collateral',
      label:
        'syntheticsMarketAddress.burn.collateralLabel' as TTranslatedMessage,
      price: 1,
      disabled: market.userCollateral.isZero(),
    },
  ];
};
