import { ethers } from 'ethers';
import { and, equals, identity, not, useWith as rUseWith } from 'ramda';

import { IntMath, ZERO_BIG_NUMBER } from '@/sdk';
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
    return IntMath.toNumber(
      principalToElastic(data.totalElastic, data.totalBase, data.borrow)
    );

  if (isRepaying(base, type) || isSupplying(base, type))
    return IntMath.toNumber(data.balance, data.decimals);

  if (isRedeeming(base, type)) return IntMath.toNumber(data.supply);

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

  const safeTotalMaxBorrowAmountInUSD = IntMath.from(
    totalMaxBorrowAmountInUSD
  ).mul(ethers.utils.parseEther('0.9'));

  if (isBorrowing(base, type)) {
    if (totalBorrowInUSD.gte(safeTotalMaxBorrowAmountInUSD.value())) return 0;

    const amount = safeTotalMaxBorrowAmountInUSD
      .sub(totalBorrowInUSD)
      .div(data.usdPrice);

    return IntMath.toNumber(amount.gt(data.cash) ? data.cash : amount.value());
  }

  if (isRepaying(base, type) || isSupplying(base, type))
    return IntMath.toNumber(data.balance, data.decimals);

  if (isRedeeming(base, type)) {
    if (totalBorrowInUSD.isZero()) {
      return IntMath.toNumber(
        data.supply.gt(data.cash) ? data.cash : data.supply
      );
    }

    if (
      totalBorrowInUSD.gte(totalMaxBorrowAmountInUSD) ||
      totalBorrowInUSD.gte(safeTotalMaxBorrowAmountInUSD.value())
    )
      return 0;

    const safeAmountOfTokens = IntMath.from(totalMaxBorrowAmountInUSD)
      .sub(totalBorrowInUSD)
      .div(data.usdPrice)
      .div(data.ltv)
      .mul(ethers.utils.parseEther('0.95'));

    if (safeAmountOfTokens.gte(data.cash)) return IntMath.toNumber(data.cash);

    if (safeAmountOfTokens.gte(data.supply))
      return IntMath.toNumber(data.supply);

    return safeAmountOfTokens.toNumber();
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
  if (!data) return '';

  if (data.borrow.isZero() && amount === '0') return '0% \u2192 0%';

  const value = safeToBigNumber(amount);
  const valueInUSD = IntMath.from(value).mul(data.usdPrice).value();
  const valueInUSDLTV = IntMath.from(valueInUSD).mul(data.ltv).value();

  const currentRisk = calculatePoolRisk(totalBorrowsInUSDRecord);

  if (isSupplying(base, type))
    return `${currentRisk}% \u2192 ${calculatePoolRisk({
      totalBorrowInUSD: totalBorrowsInUSDRecord.totalBorrowInUSD,
      totalMaxBorrowAmountInUSD:
        totalBorrowsInUSDRecord.totalMaxBorrowAmountInUSD.add(valueInUSDLTV),
    })}%`;

  if (isRedeeming(base, type)) {
    if (valueInUSDLTV.gt(totalBorrowsInUSDRecord.totalMaxBorrowAmountInUSD))
      return `${currentRisk}% \u2192 -${calculatePoolRisk({
        totalBorrowInUSD: totalBorrowsInUSDRecord.totalBorrowInUSD,
        totalMaxBorrowAmountInUSD: valueInUSDLTV.sub(
          totalBorrowsInUSDRecord.totalMaxBorrowAmountInUSD
        ),
      })}%`;

    return `${currentRisk}% \u2192 ${calculatePoolRisk({
      totalBorrowInUSD: totalBorrowsInUSDRecord.totalBorrowInUSD,
      totalMaxBorrowAmountInUSD:
        totalBorrowsInUSDRecord.totalMaxBorrowAmountInUSD.sub(valueInUSDLTV),
    })}%`;
  }

  if (isBorrowing(base, type))
    return `${currentRisk}% \u2192 ${calculatePoolRisk({
      totalBorrowInUSD:
        totalBorrowsInUSDRecord.totalBorrowInUSD.add(valueInUSD),
      totalMaxBorrowAmountInUSD:
        totalBorrowsInUSDRecord.totalMaxBorrowAmountInUSD,
    })}%`;

  if (isRepaying(base, type)) {
    if (valueInUSD.gte(totalBorrowsInUSDRecord.totalBorrowInUSD))
      return `${currentRisk}% \u2192 ${calculatePoolRisk({
        totalBorrowInUSD: ZERO_BIG_NUMBER,
        totalMaxBorrowAmountInUSD:
          totalBorrowsInUSDRecord.totalMaxBorrowAmountInUSD,
      })}%`;

    return `${currentRisk}% \u2192 ${calculatePoolRisk({
      totalBorrowInUSD:
        totalBorrowsInUSDRecord.totalBorrowInUSD.sub(valueInUSD),
      totalMaxBorrowAmountInUSD:
        totalBorrowsInUSDRecord.totalMaxBorrowAmountInUSD,
    })}%`;
  }

  return '';
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

  const amountLeftToBorrowInToken = IntMath.from(amountLeftToBorrowInUSD).div(
    data.usdPrice
  );

  if (isSupplying(base, type))
    return `${formatMoney(IntMath.toNumber(data.supply))} \u2192 ${formatMoney(
      IntMath.toNumber(data.supply.add(value))
    )}`;

  if (isRedeeming(base, type)) {
    if (value.gte(data.cash))
      return `${formatMoney(IntMath.toNumber(data.cash))} \u2192 ${formatMoney(
        0
      )}`;

    return `${formatMoney(IntMath.toNumber(data.cash))} \u2192 ${formatMoney(
      IntMath.toNumber(data.cash.sub(value))
    )}`;
  }

  if (isBorrowing(base, type)) {
    if (value.gt(data.cash) || amountLeftToBorrowInToken.gt(data.cash))
      return `${formatMoney(IntMath.toNumber(data.cash))} \u2192 ${formatMoney(
        0
      )}`;

    return `${formatMoney(IntMath.toNumber(data.cash))} \u2192 ${formatMoney(
      IntMath.toNumber(data.cash.sub(value))
    )}`;
  }

  if (isRepaying(base, type)) {
    if (
      value.gte(
        principalToElastic(data.totalElastic, data.totalBase, data.borrow)
      )
    )
      return `${formatMoney(
        IntMath.toNumber(data.borrow)
      )} \u2192 ${formatMoney(0)}`;

    return `${formatMoney(IntMath.toNumber(data.borrow))} \u2192 ${formatMoney(
      IntMath.toNumber(
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
