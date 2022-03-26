import { BigNumber, BigNumberish, utils } from 'ethers';

import { Fraction } from './fraction';
const { parseEther } = utils;

const ONE_ETHER = parseEther('1');

export class IntMath {
  private _value = BigNumber.from(0);

  protected constructor(_value: BigNumberish) {
    this._value = BigNumber.from(_value);
  }

  public static from(value: BigNumberish): IntMath {
    return new IntMath(value);
  }

  public div(x: BigNumberish): IntMath {
    this._value = this._value.mul(ONE_ETHER).div(x);
    return this;
  }

  public mul(x: BigNumberish): IntMath {
    this._value = this._value.mul(x).div(ONE_ETHER);
    return this;
  }

  public add(x: BigNumberish): IntMath {
    this._value = this._value.add(x);
    return this;
  }

  public sub(x: BigNumberish): IntMath {
    this._value = this._value.sub(x);
    return this;
  }

  public pow(x: BigNumberish): IntMath {
    this._value = this._value.pow(x);
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
