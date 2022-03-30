import { BigNumber, BigNumberish, utils } from 'ethers';

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

  public static from(value: BigNumberish): IntMath {
    return new IntMath(value);
  }

  public static toBigNumber(value: number, decimals = 18): BigNumber {
    return BigNumber.from(value).mul(BigNumber.from(10).pow(decimals));
  }

  public div(x: BigNumberish | IntMath): IntMath {
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
