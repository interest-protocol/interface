import { Fraction, Rounding } from '@/sdk';

export const toFixedToPrecision = (
  x: string | number,
  fixedArg = 2,
  precisionArg = 2
): string => (+(+x).toFixed(fixedArg)).toPrecision(precisionArg);

export const numberToString = (
  x: number,
  significant: 8,
  rounding: Rounding.ROUND_HALF_UP
): string =>
  Fraction.from(x).toSignificant(
    significant,
    {
      decimalSeparator: '',
    },
    rounding
  );
