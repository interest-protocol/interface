import { Fraction, Rounding } from '@/sdk';

export const toFixedToPrecision = (
  x: string | number,
  fixedArg = 2,
  precisionArg = 2
): string => (+(+x).toFixed(fixedArg)).toPrecision(precisionArg);

export const numberToString = (
  x: number,
  significant: 6,
  rounding: Rounding.ROUND_HALF_UP
): string =>
  Fraction.from(+x.toFixed(8) * 10 ** 8, 10 ** 8).toSignificant(
    significant,
    {
      decimalSeparator: '.',
      groupSeparator: '',
    },
    rounding
  );
