import _Decimal from 'decimal.js-light';
import toFormat from 'toformat';

const Decimal = toFormat(_Decimal);

Decimal.format = {
  decimalSeparator: '.',
  groupSeparator: '',
};

export const numberToString = (x: number): string => new Decimal(x).toFormat();
