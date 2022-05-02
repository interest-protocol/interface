import { BigNumber } from 'ethers';
import { curry } from 'ramda';

export const fromPositiveNumber = curry(
  (x: number, y: number): BigNumber =>
    BigNumber.from(y).mul(BigNumber.from(10).pow(x))
);

export const to18Decimals = fromPositiveNumber(18);

export const addPositiveNumberStrings = (x: string, y: string): string =>
  BigNumber.from(x).add(BigNumber.from(y)).toString();
