import { always, ifElse, isNil, toString } from 'ramda';

import { Fraction, MAX_NUMBER_INPUT_VALUE, Rounding } from '@/sdk';

export const shortAccount = (account: string): string =>
  `${account.slice(0, 6)}...${account.slice(-4)}`;

const treatDecimals = (money: number) => {
  const [integerPart, decimalPart] = money.toString().split('.');
  const digits = integerPart.toString().length;

  const newMoney = Number(
    digits > 9
      ? `${integerPart.slice(0, -9)}.${integerPart.slice(-9, -7)}`
      : digits > 6
      ? `${integerPart.slice(0, -6)}.${integerPart.slice(-6, -4)}`
      : `${integerPart}.${decimalPart?.slice(0, 2) ?? 0}`
  );

  const { length: integerLength } = newMoney.toString().split('.')[0];

  return {
    digits,
    newMoney,
    integerLength,
  };
};

export const formatDollars = (money: number): string => {
  const { digits, newMoney, integerLength } = treatDecimals(money);

  return `${new Intl.NumberFormat('en-US', {
    currency: 'USD',
    style: 'currency',
    maximumSignificantDigits: integerLength > 20 ? 20 : integerLength + 4,
    minimumSignificantDigits: integerLength > 20 ? 20 : integerLength + 2,
  }).format(newMoney)} ${digits > 9 ? 'B' : digits > 6 ? 'M' : ''}`;
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
