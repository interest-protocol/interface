import { BigNumber } from 'ethers';
import { curryN } from 'ramda';

import { FixedPointMath, MAX_NUMBER_INPUT_VALUE } from '@/sdk';

export const addPositiveNumberStrings = (x: string, y: string): string => {
  if (isNaN(+x) || isNaN(+y) || 0 > +x || 0 > +y) return '0';

  return BigNumber.from(x).add(BigNumber.from(y)).toString();
};

export const stringToBigNumber = (value: string, decimals = 0) => {
  const parsedValue = isNaN(+value) ? '0' : value ? value : '0';
  const [tokenInIntegralPart, tokenInDecimalPart] = parsedValue.split('.');

  return adjustDecimals(BigNumber.from(tokenInIntegralPart), 0, decimals).add(
    tokenInDecimalPart
      ? adjustDecimals(
          BigNumber.from(tokenInDecimalPart),
          tokenInDecimalPart.length,
          decimals
        )
      : 0
  );
};

export const safeToBigNumber = (
  x: number | string,
  decimals = 18,
  significant = 6
): BigNumber =>
  FixedPointMath.toBigNumber(
    +x > MAX_NUMBER_INPUT_VALUE ? MAX_NUMBER_INPUT_VALUE.toString() : x,
    decimals,
    significant
  );

export const adjustDecimals = (x: BigNumber, decimals: number, k = 18) => {
  if (decimals == k) return x;

  if (decimals < k) return x.mul(BigNumber.from(10).pow(k - decimals));

  return x.div(BigNumber.from(10).pow(decimals - k));
};

export const getBNPercent = curryN(
  3,
  (percent: number, x: BigNumber, decimals: number) => {
    const multiplier = BigNumber.from(100 - percent).mul(
      BigNumber.from(10).pow(decimals - 2)
    );
    const one = BigNumber.from(10).pow(decimals);

    return x.mul(multiplier).div(one);
  }
);
