import { ethers } from 'ethers';

import { BaseCurrency } from './base-currency';

export class ERC20 extends BaseCurrency {
  readonly isNative = false;
  readonly isERC20 = true;
  readonly address;
  readonly chainId;

  protected constructor(
    name: string,
    symbol: string,
    decimals: number,
    _address: string,
    chainId: number
  ) {
    super(name, symbol, decimals);
    this.address = _address;
    this.chainId = chainId;
  }

  public static from(
    address: string,
    chainId: number,
    name = '???',
    symbol = '???',
    decimals = 18
  ): ERC20 {
    return new ERC20(
      name,
      symbol,
      decimals,
      ethers.utils.getAddress(address),
      chainId
    );
  }
}
