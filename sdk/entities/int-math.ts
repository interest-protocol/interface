import { isBigNumberish } from '@ethersproject/bignumber/lib/bignumber';
import { BigNumber, BigNumberish, utils } from 'ethers';

import { parseToPositiveStringNumber, ZERO_BIG_NUMBER } from '../utils';
import { Fraction } from './fraction';
const { parseEther } = utils;
import { MAX_NUMBER_INPUT_VALUE } from '../constants';

const ONE_ETHER = parseEther('1');

export class IntMath {
  private _value = BigNumber.from(0);

  protected constructor(_value: BigNumberish) {
    const parsed = isBigNumberish(_value) ? _value.toString() : 0;
    this._value = BigNumber.from(parsed);
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

  public static from(value: BigNumberish): IntMath {
    return new IntMath(value);
  }

  public static toBigNumber(
    value: number | string,
    decimals = 18,
    significant = 6
  ): BigNumber {
    if (value == null || isNaN(+value)) return ZERO_BIG_NUMBER;

    const factor = 10 ** significant;

    if (typeof value === 'number' && 0 > value * factor) return ZERO_BIG_NUMBER;
    if (
      typeof value === 'string' &&
      0 > +parseToPositiveStringNumber(value) * factor
    )
      return ZERO_BIG_NUMBER;

    const x = Math.floor(+value * factor);

    return BigNumber.from(
      x >= MAX_NUMBER_INPUT_VALUE ? MAX_NUMBER_INPUT_VALUE : x
    ).mul(BigNumber.from(10).pow(decimals - significant));
  }

  public static toNumber(
    value: BigNumber,
    decimals = 18,
    significantRounding = 4,
    significant = 6
  ): number {
    if (value.isZero()) return 0;

    return +Fraction.from(
      value,
      BigNumber.from(10).pow(decimals)
    ).toSignificant(significant, { groupSeparator: '' }, significantRounding);
  }

  public toNumber(decimals = 18, rounding = 4, significant = 6): number {
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

  public gt(x: BigNumberish | IntMath): boolean {
    return this._value.gt(this.parseValue(x));
  }

  public gte(x: BigNumberish | IntMath): boolean {
    return this._value.gte(this.parseValue(x));
  }
  public lt(x: BigNumberish | IntMath): boolean {
    return this._value.lt(this.parseValue(x));
  }
  public lte(x: BigNumberish | IntMath): boolean {
    return this._value.lte(this.parseValue(x));
  }

  public eq(x: BigNumberish | IntMath): boolean {
    return this._value.eq(this.parseValue(x));
  }

  public value(): BigNumber {
    return this._value;
  }
}
