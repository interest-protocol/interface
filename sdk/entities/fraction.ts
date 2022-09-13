import _Decimal from 'decimal.js-light';
import { BigNumber, BigNumberish, ethers } from 'ethers';
import toFormat from 'toformat';

import { Rounding } from '../constants';
import { parseBigNumberish } from '../utils';

const Decimal = toFormat(_Decimal);

const toSignificantRounding = {
  [Rounding.ROUND_DOWN]: Decimal.ROUND_DOWN,
  [Rounding.ROUND_HALF_UP]: Decimal.ROUND_HALF_UP,
  [Rounding.ROUND_UP]: Decimal.ROUND_UP,
};

export class Fraction {
  public readonly numerator: ethers.BigNumber;
  public readonly denominator: ethers.BigNumber;

  public constructor(numerator: BigNumberish, denominator: BigNumberish = 1) {
    this.numerator = parseBigNumberish(numerator);
    this.denominator = parseBigNumberish(denominator);
  }

  public get quotient(): BigNumber {
    return this.numerator.div(this.denominator);
  }

  public get remainder(): Fraction {
    return new Fraction(this.numerator.mod(this.denominator), this.denominator);
  }

  public invert(): Fraction {
    return new Fraction(this.numerator, this.denominator);
  }

  public static from(
    numerator: BigNumberish,
    denominator: BigNumberish = 1
  ): Fraction {
    return new Fraction(numerator, denominator);
  }

  private static tryParseFraction(
    fractionish: BigNumberish | Fraction
  ): Fraction {
    if (
      fractionish instanceof BigNumber ||
      typeof fractionish === 'number' ||
      typeof fractionish === 'string'
    )
      return new Fraction(fractionish);

    throw new Error('Could not parse fraction');
  }

  public add(other: Fraction | BigNumberish): Fraction {
    const otherParsed = Fraction.tryParseFraction(other);
    if (otherParsed.denominator.eq(this.denominator))
      return new Fraction(
        this.numerator.add(otherParsed.numerator),
        otherParsed.denominator
      );

    return new Fraction(
      this.numerator
        .mul(otherParsed.denominator)
        .add(this.denominator.mul(otherParsed.numerator)),
      this.denominator.mul(otherParsed.denominator)
    );
  }

  public subtract(other: Fraction | BigNumberish): Fraction {
    const otherParsed = Fraction.tryParseFraction(other);
    if (otherParsed.denominator.eq(this.denominator))
      return new Fraction(
        this.numerator.sub(otherParsed.numerator),
        otherParsed.denominator
      );

    return new Fraction(
      this.numerator
        .mul(otherParsed.denominator)
        .sub(this.denominator.mul(otherParsed.numerator)),
      this.denominator.mul(otherParsed.denominator)
    );
  }

  public lessThan(other: Fraction | BigNumberish): boolean {
    const otherParsed = Fraction.tryParseFraction(other);

    return this.numerator
      .mul(otherParsed.denominator)
      .lt(otherParsed.numerator.mul(this.denominator));
  }

  public equalTo(other: Fraction | BigNumberish): boolean {
    const otherParsed = Fraction.tryParseFraction(other);

    return this.numerator
      .mul(otherParsed.denominator)
      .eq(otherParsed.numerator.mul(this.denominator));
  }

  public divide(other: Fraction | BigNumberish): Fraction {
    const otherParsed = Fraction.tryParseFraction(other);
    return new Fraction(
      this.numerator.mul(otherParsed.denominator),
      this.denominator.mul(otherParsed.numerator)
    );
  }

  public multiply(other: Fraction | BigNumberish): Fraction {
    const otherParsed = Fraction.tryParseFraction(other);
    return new Fraction(
      this.numerator.mul(otherParsed.numerator),
      this.denominator.mul(otherParsed.denominator)
    );
  }

  public toSignificant(
    significantDigits: number,
    format: Record<string, string> = { groupSeparator: '' },
    rounding: Rounding = Rounding.ROUND_HALF_UP
  ): string {
    Decimal.set({
      precision: significantDigits + 1,
      rounding: toSignificantRounding[rounding],
    });
    const quotient = new Decimal(this.numerator.toString())
      .div(this.denominator.toString())
      .toSignificantDigits(significantDigits);
    return quotient.toFormat(quotient.decimalPlaces(), format);
  }

  public toFixed(decimalPlaces: number, options?: Record<string, any>): string {
    const value = this.numerator.div(this.denominator).toString();
    const decimals = value.slice(value.length - decimalPlaces);
    const nonDecimals = value.slice(0, value.length - decimalPlaces);
    const num = Number(`${nonDecimals}.${decimals}`);
    return new Intl.NumberFormat('en-IN', options).format(num);
  }

  public get asFraction(): Fraction {
    const x = 1;
    x.toLocaleString();
    return new Fraction(this.numerator, this.denominator);
  }
}
