import { always, ifElse, isNil, toString } from 'ramda';

import { Fraction, MAX_NUMBER_INPUT_VALUE, Rounding } from '@/sdk';

export const shortAccount = (account: string): string =>
  `${account.slice(0, 6)}...${account.slice(-5, -1)}`;

export const formatDollars = (money: number): string => {
  const [integralPart] = money.toString().split('.');
  const length = integralPart.length;
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    maximumSignificantDigits: length > 20 ? 20 : length + 4,
    minimumSignificantDigits: length > 20 ? 20 : length + 2,
    currency: 'USD',
  }).format(money);
};

export const formatMoney = (value: number): string =>
  formatDollars(value).slice(1);

export const toSignificant = (
  x: string,
  decimalHouses: number,
  denominator = 1,
  format?: Record<string, string>,
  rounding?: Rounding
): string =>
  new Fraction(x, denominator).toSignificant(decimalHouses, format, rounding);

export const makeSWRKey = (
  args: ReadonlyArray<unknown>,
  methodName: string
): string =>
  args
    .map(ifElse(isNil, always(''), toString))
    .concat([methodName])
    .join('|');

export const parseToSafeStringNumber = (x: string): string =>
  isNaN(+x)
    ? ''
    : +x >= MAX_NUMBER_INPUT_VALUE
    ? MAX_NUMBER_INPUT_VALUE.toString()
    : x;
