import { always, ifElse, isNil, toString } from 'ramda';
import { ChangeEvent } from 'react';

import {
  Fraction,
  MAX_NUMBER_INPUT_VALUE,
  Rounding,
  TOKEN_SYMBOL,
} from '@/sdk';

const isExponential = (number: number) => number.toString().includes('e');

export const shortAccount = (account: string): string =>
  `${account.slice(0, 6)}...${account.slice(-4)}`;

const removeZero = (array: ReadonlyArray<string>): string => {
  if (!array.length) return '';

  if (array[array.length - 1] == '0') return removeZero(array.slice(0, -1));

  return array.join('');
};

export const removeUnnecessaryZeros = (string: string): string =>
  string.includes('.') ? removeZero(string.split('')) : string;

const treatDecimals = (money: number, maxDecimals: number) => {
  const [integralPart, decimalPart] = (
    isExponential(money)
      ? removeUnnecessaryZeros(money.toFixed(maxDecimals))
      : money.toString()
  ).split('.');

  const integralDigits = integralPart.toString().length;

  const newMoney = Number(
    integralDigits > 12
      ? `${integralPart.slice(0, -12)}.${integralPart.slice(-12, -10)}`
      : integralDigits > 9
      ? `${integralPart.slice(0, -9)}.${integralPart.slice(-9, -7)}`
      : integralDigits > 6
      ? `${integralPart.slice(0, -6)}.${integralPart.slice(-6, -4)}`
      : `${integralPart}.${
          +integralPart >= 10 ? decimalPart?.slice(0, 2) ?? 0 : decimalPart ?? 0
        }`
  );

  const newMoneyString = isExponential(newMoney)
    ? removeUnnecessaryZeros(newMoney.toFixed(maxDecimals - integralDigits))
    : newMoney.toPrecision();

  const baseDecimals = integralDigits > 6 ? 0 : 2;

  const decimalDigits =
    integralDigits <= 6 && +integralPart >= 10
      ? 2
      : newMoneyString.split('.')[1]?.length ?? baseDecimals;

  return {
    newMoney,
    decimalDigits,
    integralDigits,
  };
};

export const formatMoney = (money: number, maxFractionDigits = 20): string => {
  const { integralDigits, newMoney, decimalDigits } = treatDecimals(
    money,
    maxFractionDigits
  );

  const maximumFractionDigits =
    decimalDigits < maxFractionDigits ? decimalDigits : maxFractionDigits;

  const minimumFractionDigits =
    decimalDigits > maximumFractionDigits
      ? maximumFractionDigits
      : decimalDigits;

  return `${new Intl.NumberFormat('en-US', {
    currency: 'USD',
    style: 'currency',
    maximumFractionDigits,
    minimumFractionDigits,
  }).format(newMoney)}${
    integralDigits > 12
      ? 'T'
      : integralDigits > 9
      ? 'B'
      : integralDigits > 6
      ? 'M'
      : ''
  }`.slice(1);
};

export const formatDollars = (money: number): string =>
  '$' + formatMoney(money, 6);

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

export const parseInputEventToNumberString = (
  event: ChangeEvent<HTMLInputElement>,
  max: number = MAX_NUMBER_INPUT_VALUE
): string => {
  const value = event.target.value;

  const x =
    isNaN(+value[value.length - 1]) && value[value.length - 1] !== '.'
      ? value.slice(0, value.length - 1)
      : value;

  return isNaN(+x)
    ? ''
    : +x >= max
    ? max.toString()
    : x.charAt(0) == '0' && !x.startsWith('0.')
    ? String(Number(x))
    : x;
};

export const maybeLPTokenName = (symbol0?: string, symbol1?: string): string =>
  `${symbol0 ?? ''}${
    symbol1 && symbol1 !== TOKEN_SYMBOL.Unknown ? `-${symbol1}` : ''
  }`;

export const capitalize = (str: string | undefined): string =>
  str ? str.charAt(0).toUpperCase() + str.slice(1) : '';
