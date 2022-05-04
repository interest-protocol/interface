import { BigNumber } from 'ethers';
import { curry } from 'ramda';

import { MAX_NUMBER_INPUT_VALUE } from '@/constants';
import { IntMath } from '@/sdk';

export const fromPositiveNumber = curry(
  (x: number, y: number): BigNumber =>
    BigNumber.from(y).mul(BigNumber.from(10).pow(x))
);

export const to18Decimals = fromPositiveNumber(18);

export const addPositiveNumberStrings = (x: string, y: string): string =>
  BigNumber.from(x).add(BigNumber.from(y)).toString();

export const safeToBigNumber = (
  x: number,
  decimals = 18,
  significant = 6
): BigNumber =>
  IntMath.toBigNumber(
    x > MAX_NUMBER_INPUT_VALUE
      ? MAX_NUMBER_INPUT_VALUE.toString()
      : x.toString(),
    decimals,
    significant
  );
