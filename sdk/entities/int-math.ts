import { BigNumber, BigNumberish, utils } from 'ethers';

import { Rounding, ZERO } from '@/constants/index';
import { parseToStringNumber } from '@/utils';

import { Fraction } from './fraction';
const { parseEther } = utils;

const ONE_ETHER = parseEther('1');

export class IntMath {
  private _value = BigNumber.from(0);

  protected constructor(_value: BigNumberish) {
    this._value = BigNumber.from(_value);
  }

  private parseValue(x: BigNumberish | IntMath): BigNumberish {
    if (x instanceof IntMath) return x.value();

    return x;
  }

  private isZero(value: BigNumberish | IntMath): boolean {
    if (value instanceof BigNumber) return value.isZero();
    if (value === 0) return true;
    if (value instanceof IntMath) return value.value().isZero();
    return value === '0';
  }

  private static parseRounding(x: Rounding): number {
    if (Rounding.UP === x) return 1;
    if (Rounding.Down) return -1;
    if (Rounding.HalfUp) return 0.5;
    if (Rounding.HalfDown) return -0.5;
    return 0;
  }

  public static from(value: BigNumberish): IntMath {
    return new IntMath(value);
  }

  public static toBigNumber(
    value: number | string,
    decimals = 18,
    significant = 6
  ): BigNumber {
    const factor = 10 ** significant;
    if (typeof value === 'number' && 0 > value * factor) return ZERO;
    if (typeof value === 'string' && 0 > +parseToStringNumber(value) * factor)
      return ZERO;
    if (value == null || isNaN(+value)) return ZERO;

    return BigNumber.from(Math.trunc(+value * factor)).mul(
      BigNumber.from(10).pow(decimals - significant)
    );
  }

  public static toNumber(
    value: BigNumber,
    decimals = 18,
    rounding = Rounding.Nothing,
    significant = 6
  ): number {
    if (value.isZero()) return 0;
    return (
      +Fraction.from(value, BigNumber.from(10).pow(decimals)).toSignificant(
        significant
      ) + this.parseRounding(rounding)
    );
  }

  public toNumber(
    decimals = 18,
    rounding = Rounding.Nothing,
    significant = 6
  ): number {
    return IntMath.toNumber(this._value, decimals, rounding, significant);
  }

  public div(x: BigNumberish | IntMath): IntMath {
    if (this.isZero(x)) return IntMath.from(0);
    this._value = this._value.mul(ONE_ETHER).div(this.parseValue(x));
    return this;
  }

  public mul(x: BigNumberish | IntMath): IntMath {
    this._value = this._value
      .mul(this.parseValue(this.parseValue(x)))
      .div(ONE_ETHER);
    return this;
  }

  public add(x: BigNumberish | IntMath): IntMath {
    this._value = this._value.add(this.parseValue(x));
    return this;
  }

  public sub(x: BigNumberish | IntMath): IntMath {
    this._value = this._value.sub(this.parseValue(x));
    return this;
  }

  public pow(x: BigNumberish | IntMath): IntMath {
    this._value = this._value.pow(this.parseValue(x));
    return this;
  }

  public toPercentage(toSignificant = 2): string {
    const fraction = Fraction.from(this._value, parseEther('1')).multiply(100);

    return `${fraction.toSignificant(toSignificant || 1)} %`;
  }

  public value(): BigNumber {
    return this._value;
  }
}
