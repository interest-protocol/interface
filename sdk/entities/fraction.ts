import _Decimal from 'decimal.js-light';
import { BigNumber, BigNumberish, ethers } from 'ethers';
import toFormat from 'toformat';

const Decimal = toFormat(_Decimal);

export class Fraction {
  public readonly numerator: ethers.BigNumber;
  public readonly denominator: ethers.BigNumber;

  public constructor(numerator: BigNumberish, denominator: BigNumberish = 1) {
    this.numerator = ethers.BigNumber.from(numerator);
    this.denominator = ethers.BigNumber.from(denominator);
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
    rounding = 4
  ): string {
    Decimal.set({
      precision: significantDigits + 1,
      rounding,
    });
    const quotient = new Decimal(this.numerator.toString())
      .div(this.denominator.toString())
      .toSignificantDigits(significantDigits);
    return quotient.toFormat(quotient.decimalPlaces(), format);
  }
}
