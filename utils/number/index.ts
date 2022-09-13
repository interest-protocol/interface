import _Decimal from 'decimal.js-light';
import toFormat from 'toformat';

const Decimal = toFormat(_Decimal);

Decimal.format = {
  decimalSeparator: '.',
  groupSeparator: '',
};

export const toFixedToPrecision = (
  x: string | number,
  fixedArg = 2,
  precisionArg = 2
): string => (+(+x).toFixed(fixedArg)).toPrecision(precisionArg);

export const numberToString = (x: number): string => new Decimal(x).toFormat();
