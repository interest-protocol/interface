import { always, ifElse, isNil } from 'ramda';

import { Rounding } from '@/sdk/constants';
import { Fraction } from '@/sdk/entities/fraction';

export const shortAccount = (account: string): string =>
  `${account.slice(0, 6)}...${account.slice(-5, -1)}`;

export const formatDollars = (value: number): string => {
  const valueInDollars = new Intl.NumberFormat('en-US', {
    style: 'currency',
    maximumSignificantDigits: `${value}`.split('').length + 2,
    minimumSignificantDigits:
      value > 1 || value < -1 || value === 0
        ? `${value}`.split('').length + 2
        : 1,
    currency: 'USD',
  }).format(value);

  const decimals = valueInDollars.split(',');

  return decimals.length > 3
    ? `${decimals.slice(0, decimals.length - 3).join(',')}B`
    : decimals.length === 3
    ? `${decimals[0]}.${`${decimals[1]}`.charAt(0)}M`
    : decimals.join(',');
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
