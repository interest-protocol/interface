export abstract class BaseCurrency {
  abstract readonly isNative: boolean;

  abstract readonly isERC20: boolean;

  protected constructor(
    readonly name: string,
    readonly symbol: string,
    readonly decimals: number
  ) {}
}
