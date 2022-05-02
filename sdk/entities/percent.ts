import { BigNumber } from 'ethers';

import { Rounding } from '../constants';
import { Fraction } from './fraction';

const _100_PERCENT = new Fraction(BigNumber.from(100));

export class Percent extends Fraction {
  public toSignificant(
    significantDigits = 5,
    format?: Record<string, string>,
    rounding?: Rounding
  ): string {
    return this.multiply(_100_PERCENT).toSignificant(
      significantDigits,
      format,
      rounding
    );
  }

  public toFixed(decimalPlaces = 2, options?: Record<string, any>): string {
    return this.multiply(_100_PERCENT).toFixed(decimalPlaces, options);
  }
}
