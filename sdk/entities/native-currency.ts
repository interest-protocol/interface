import { CHAIN_ID, CHAINS } from '@/constants/chains';

import { BaseCurrency } from './base-currency';

export class NativeCurrency extends BaseCurrency {
  readonly isNative = true;
  readonly isToken = false;

  protected constructor(chainId: CHAIN_ID) {
    const nativeCurrency = CHAINS[chainId].nativeCurrency;

    super(
      chainId,
      nativeCurrency.decimals,
      nativeCurrency.symbol,
      nativeCurrency.name
    );
  }

  public static from(chainId: CHAIN_ID): NativeCurrency {
    return new NativeCurrency(chainId);
  }
}
