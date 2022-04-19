import { BigNumber, ethers } from 'ethers';

import { CHAIN_ID } from '@/constants/chains';

import { BaseCurrency } from './base-currency';

export class ERC20 extends BaseCurrency {
  readonly isNative = false;
  readonly isToken = true;
  readonly address;
  readonly totalSupply;

  protected constructor(
    name: string,
    symbol: string,
    decimals: number,
    _address: string,
    chainId: CHAIN_ID,
    totalSupply = BigNumber.from(0)
  ) {
    super(chainId, decimals, symbol, name);
    this.address = _address;
    this.totalSupply = totalSupply;
  }

  public static from(
    address: string,
    chainId: CHAIN_ID,
    name = '???',
    symbol = '???',
    decimals = 18
  ): ERC20 {
    if (!ethers.utils.isAddress(address)) throw new Error('Wrong address');
    return new ERC20(name, symbol, decimals, address, chainId);
  }

  public static withTotalSupply(
    address: string,
    chainId: CHAIN_ID,
    totalSupply: BigNumber,
    name = '???',
    symbol = '???',
    decimals = 18
  ): ERC20 {
    if (!ethers.utils.isAddress(address)) throw new Error('Wrong address');
    return new ERC20(name, symbol, decimals, address, chainId, totalSupply);
  }
}
