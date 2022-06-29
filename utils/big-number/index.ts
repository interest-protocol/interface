import { BigNumber } from 'ethers';
import { curry } from 'ramda';

import { IntMath, MAX_NUMBER_INPUT_VALUE, ZERO_BIG_NUMBER } from '@/sdk';

export const fromPositiveNumber = curry(
  (decimals: number, value: number): BigNumber => {
    if (
      0 > value ||
      value >= MAX_NUMBER_INPUT_VALUE ||
      0 > decimals ||
      decimals > 50
    )
      return ZERO_BIG_NUMBER;

    return BigNumber.from(value).mul(BigNumber.from(10).pow(decimals));
  }
);

export const to18Decimals = fromPositiveNumber(18);

export const addPositiveNumberStrings = (x: string, y: string): string => {
  if (isNaN(+x) || isNaN(+y) || 0 > +x || 0 > +y) return '0';

  return BigNumber.from(x).add(BigNumber.from(y)).toString();
};

export const safeToBigNumber = (
  x: number | string,
  decimals = 18,
  significant = 6
): BigNumber =>
  IntMath.toBigNumber(
    x > MAX_NUMBER_INPUT_VALUE ? MAX_NUMBER_INPUT_VALUE.toString() : x,
    decimals,
    significant
  );

export const adjustTo18Decimals = (x: BigNumber, decimals: number) => {
  const k = 18;

  if (decimals == k) return x;

  if (decimals < k) return x.mul(BigNumber.from(10).pow(k - decimals));

  return x.div(BigNumber.from(10).pow(decimals - k));
};
