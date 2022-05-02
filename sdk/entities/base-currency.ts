export abstract class BaseCurrency {
  abstract readonly isNative: boolean;

  abstract readonly isToken: boolean;

  protected constructor(
    readonly name: string,
    readonly symbol: string,
    readonly decimals: number
  ) {}
}
