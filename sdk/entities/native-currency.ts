import { BaseCurrency } from './base-currency';

export class NativeCurrency extends BaseCurrency {
  readonly isNative = true;
  readonly isERC20 = false;
  readonly chainId;

  protected constructor(
    name: string,
    symbol: string,
    decimals: number,
    chainId: number
  ) {
    super(name, symbol, decimals);

    this.chainId = chainId;
  }

  public static from(
    name: string,
    symbol: string,
    decimals: number,
    chainId: number
  ): NativeCurrency {
    return new NativeCurrency(name, symbol, decimals, chainId);
  }
}
