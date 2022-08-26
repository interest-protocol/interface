import { ethers } from 'ethers';
import { and, equals, identity, not, useWith as rUseWith } from 'ramda';

import { FixedPointMath, ZERO_BIG_NUMBER } from '@/sdk';
import { formatMoney, principalToElastic, safeToBigNumber } from '@/utils';
import { calculatePoolRisk } from '@/views/dapp/views/mail-market-pool/utils';

import { MAILMarketPoolModalProps } from './mail-market-pool-modal.types';

export const isSupplying = rUseWith(and, [identity, equals('supply')]);

export const isRedeeming = rUseWith(and, [not, equals('supply')]);

export const isBorrowing = rUseWith(and, [identity, equals('borrow')]);

export const isRepaying = rUseWith(and, [not, equals('borrow')]);

export const calculateTokenValue = (
  data: MAILMarketPoolModalProps['data'],
  base: boolean,
  type: MAILMarketPoolModalProps['type']
): number => {
  if (!data) return 0;

  if (isBorrowing(base, type))
    return FixedPointMath.toNumber(
      principalToElastic(data.totalElastic, data.totalBase, data.borrow)
    );

  if (isRepaying(base, type) || isSupplying(base, type))
    return FixedPointMath.toNumber(data.balance, data.decimals);

  if (isRedeeming(base, type)) return FixedPointMath.toNumber(data.supply);

  return 0;
};

export const calculateMax = (
  data: MAILMarketPoolModalProps['data'],
  base: boolean,
  type: MAILMarketPoolModalProps['type'],
  totalBorrowsInUSDRecord: MAILMarketPoolModalProps['totalBorrowsInUSDRecord']
): number => {
  if (!data) return 0;

  const { totalBorrowInUSD, totalMaxBorrowAmountInUSD } =
    totalBorrowsInUSDRecord;

  const safeTotalMaxBorrowAmountInUSD = FixedPointMath.from(
    totalMaxBorrowAmountInUSD
  ).mul(ethers.utils.parseEther('0.9'));

  if (isBorrowing(base, type)) {
    if (totalBorrowInUSD.gte(safeTotalMaxBorrowAmountInUSD.value())) return 0;

    const amount = safeTotalMaxBorrowAmountInUSD
      .sub(totalBorrowInUSD)
      .div(data.usdPrice);

    return FixedPointMath.toNumber(
      amount.gt(data.cash) ? data.cash : amount.value()
    );
  }

  if (isRepaying(base, type) || isSupplying(base, type))
    return FixedPointMath.toNumber(data.balance, data.decimals);

  if (isRedeeming(base, type)) {
    if (totalBorrowInUSD.isZero()) {
      return FixedPointMath.toNumber(
        data.supply.gt(data.cash) ? data.cash : data.supply
      );
    }

    if (
      totalBorrowInUSD.gte(totalMaxBorrowAmountInUSD) ||
      totalBorrowInUSD.gte(safeTotalMaxBorrowAmountInUSD.value())
    )
      return 0;

    const safeAmountOfTokens = FixedPointMath.from(totalMaxBorrowAmountInUSD)
      .sub(totalBorrowInUSD)
      .div(data.usdPrice)
      .div(data.ltv)
      .mul(ethers.utils.parseEther('0.95'));

    if (safeAmountOfTokens.gte(data.supply))
      return FixedPointMath.toNumber(
        data.supply.gte(data.cash) ? data.cash : data.supply
      );

    return safeAmountOfTokens.gt(data.cash)
      ? FixedPointMath.toNumber(data.cash)
      : safeAmountOfTokens.toNumber();
  }

  return 0;
};

export const calculateLiquidationRisk = (
  data: MAILMarketPoolModalProps['data'],
  base: boolean,
  type: MAILMarketPoolModalProps['type'],
  totalBorrowsInUSDRecord: MAILMarketPoolModalProps['totalBorrowsInUSDRecord'],
  amount: string
) => {
  if (!data)
    return {
      currentRisk: null,
      poolRisk: null,
    };

  if (data.borrow.isZero() && amount === '0')
    return {
      currentRisk: 0,
      poolRisk: 0,
    };

  const value = safeToBigNumber(amount);
  const valueInUSD = FixedPointMath.from(value).mul(data.usdPrice).value();
  const valueInUSDLTV = FixedPointMath.from(valueInUSD).mul(data.ltv).value();

  const currentRisk = calculatePoolRisk(totalBorrowsInUSDRecord);

  if (isSupplying(base, type))
    return {
      currentRisk,
      poolRisk: calculatePoolRisk({
        totalBorrowInUSD: totalBorrowsInUSDRecord.totalBorrowInUSD,
        totalMaxBorrowAmountInUSD:
          totalBorrowsInUSDRecord.totalMaxBorrowAmountInUSD.add(valueInUSDLTV),
      }),
    };

  if (isRedeeming(base, type)) {
    if (valueInUSDLTV.gt(totalBorrowsInUSDRecord.totalMaxBorrowAmountInUSD))
      return {
        currentRisk,
        poolRisk: -calculatePoolRisk({
          totalBorrowInUSD: totalBorrowsInUSDRecord.totalBorrowInUSD,
          totalMaxBorrowAmountInUSD: valueInUSDLTV.sub(
            totalBorrowsInUSDRecord.totalMaxBorrowAmountInUSD
          ),
        }),
      };

    return {
      currentRisk,
      poolRisk: calculatePoolRisk({
        totalBorrowInUSD: totalBorrowsInUSDRecord.totalBorrowInUSD,
        totalMaxBorrowAmountInUSD:
          totalBorrowsInUSDRecord.totalMaxBorrowAmountInUSD.sub(valueInUSDLTV),
      }),
    };
  }

  if (isBorrowing(base, type))
    return {
      currentRisk,
      poolRisk: calculatePoolRisk({
        totalBorrowInUSD:
          totalBorrowsInUSDRecord.totalBorrowInUSD.add(valueInUSD),
        totalMaxBorrowAmountInUSD:
          totalBorrowsInUSDRecord.totalMaxBorrowAmountInUSD,
      }),
    };

  if (isRepaying(base, type)) {
    if (valueInUSD.gte(totalBorrowsInUSDRecord.totalBorrowInUSD))
      return {
        currentRisk,
        poolRisk: calculatePoolRisk({
          totalBorrowInUSD: ZERO_BIG_NUMBER,
          totalMaxBorrowAmountInUSD:
            totalBorrowsInUSDRecord.totalMaxBorrowAmountInUSD,
        }),
      };

    return {
      currentRisk,
      poolRisk: calculatePoolRisk({
        totalBorrowInUSD:
          totalBorrowsInUSDRecord.totalBorrowInUSD.sub(valueInUSD),
        totalMaxBorrowAmountInUSD:
          totalBorrowsInUSDRecord.totalMaxBorrowAmountInUSD,
      }),
    };
  }

  return {
    currentRisk: null,
    poolRisk: null,
  };
};

export const processDetailsInfo = (
  base: boolean,
  type: MAILMarketPoolModalProps['type'],
  symbol: string
) => {
  if (isSupplying(base, type)) return `My ${symbol} deposit`;

  if (isBorrowing(base, type) || isRedeeming(base, type)) return `Cash`;

  if (isRepaying(base, type) || isBorrowing(base, type))
    return `My ${symbol} loan`;

  return '';
};

export const calculateDetails = (
  data: MAILMarketPoolModalProps['data'],
  base: boolean,
  type: MAILMarketPoolModalProps['type'],
  totalBorrowsInUSDRecord: MAILMarketPoolModalProps['totalBorrowsInUSDRecord'],
  amount: string
) => {
  if (!data) return '';

  const value = safeToBigNumber(amount);

  const amountLeftToBorrowInUSD =
    totalBorrowsInUSDRecord.totalMaxBorrowAmountInUSD.sub(
      totalBorrowsInUSDRecord.totalBorrowInUSD
    );

  const amountLeftToBorrowInToken = FixedPointMath.from(
    amountLeftToBorrowInUSD
  ).div(data.usdPrice);

  if (isSupplying(base, type))
    return `${formatMoney(
      FixedPointMath.toNumber(data.supply)
    )} \u2192 ${formatMoney(FixedPointMath.toNumber(data.supply.add(value)))}`;

  if (isRedeeming(base, type)) {
    if (value.gte(data.cash))
      return `${formatMoney(
        FixedPointMath.toNumber(data.cash)
      )} \u2192 ${formatMoney(0)}`;

    return `${formatMoney(
      FixedPointMath.toNumber(data.cash)
    )} \u2192 ${formatMoney(FixedPointMath.toNumber(data.cash.sub(value)))}`;
  }

  if (isBorrowing(base, type)) {
    if (value.gt(data.cash) || amountLeftToBorrowInToken.gt(data.cash))
      return `${formatMoney(
        FixedPointMath.toNumber(data.cash)
      )} \u2192 ${formatMoney(0)}`;

    return `${formatMoney(
      FixedPointMath.toNumber(data.cash)
    )} \u2192 ${formatMoney(FixedPointMath.toNumber(data.cash.sub(value)))}`;
  }

  if (isRepaying(base, type)) {
    if (
      value.gte(
        principalToElastic(data.totalElastic, data.totalBase, data.borrow)
      )
    )
      return `${formatMoney(
        FixedPointMath.toNumber(data.borrow)
      )} \u2192 ${formatMoney(0)}`;

    return `${formatMoney(
      FixedPointMath.toNumber(data.borrow)
    )} \u2192 ${formatMoney(
      FixedPointMath.toNumber(
        principalToElastic(data.totalElastic, data.totalBase, data.borrow).sub(
          value
        )
      )
    )}`;
  }

  return '';
};

export const processLoadingMessage = (
  base: boolean,
  type: MAILMarketPoolModalProps['type'],
  symbol: string
) => {
  if (isSupplying(base, type)) return `Supplying ${symbol}...`;

  if (isRedeeming(base, type)) return `Redeeming ${symbol}...`;

  if (isBorrowing(base, type)) return `Borrowing ${symbol}...`;

  if (isRepaying(base, type)) return `Repaying ${symbol}...`;

  return '';
};

export const processButtonText = (
  base: boolean,
  type: MAILMarketPoolModalProps['type'],
  symbol: string
) => {
  if (isSupplying(base, type)) return `Supply ${symbol}`;

  if (isRedeeming(base, type)) return `Redeem ${symbol}`;

  if (isBorrowing(base, type)) return `Borrow ${symbol}`;

  if (isRepaying(base, type)) return `Repay ${symbol}`;

  return '';
};
