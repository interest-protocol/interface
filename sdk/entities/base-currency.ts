export abstract class BaseCurrency {
  abstract readonly isNative: boolean;

  abstract readonly isToken: boolean;

  protected constructor(
    public readonly chainId: number,
    readonly decimals: number,
    readonly symbol: string,
    readonly name: string
  ) {}
}
