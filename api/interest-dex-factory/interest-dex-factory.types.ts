export type IsInterestDexPair = (
  chainId: number,
  pairAddress: string
) => Promise<boolean>;
