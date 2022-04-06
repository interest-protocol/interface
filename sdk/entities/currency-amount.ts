import { BigNumberish, ethers } from 'ethers';

import { BaseCurrency } from './base-currency';
import { Fraction } from './fraction';

export class CurrencyAmount<T extends BaseCurrency> extends Fraction {
  public readonly currency: T;
  public readonly decimalScale: ethers.BigNumber;

  protected constructor(
    currency: T,
    numerator: BigNumberish,
    denominator?: BigNumberish
  ) {
    super(numerator, denominator);

    this.currency = currency;
    this.decimalScale = ethers.BigNumber.from(10).pow(currency.decimals);
  }

  public static fromRawAmount<T extends BaseCurrency>(
    currency: T,
    rawAmount: BigNumberish
  ): CurrencyAmount<T> {
    return new CurrencyAmount(currency, rawAmount);
  }

  public toSignificant(
    significantDigits = 6,
    format?: Record<string, string>,
    rounding = 4
  ): string {
    return super
      .divide(this.decimalScale)
      .toSignificant(significantDigits + 1, format, rounding);
  }
}
