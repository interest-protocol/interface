import { BigNumber } from 'ethers';
import { curry } from 'ramda';

import { IntMath, MAX_NUMBER_INPUT_VALUE } from '@/sdk';

export const fromPositiveNumber = curry(
  (x: number, y: number): BigNumber =>
    BigNumber.from(y).mul(BigNumber.from(10).pow(x))
);

export const to18Decimals = fromPositiveNumber(18);

export const addPositiveNumberStrings = (x: string, y: string): string =>
  BigNumber.from(x).add(BigNumber.from(y)).toString();

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
