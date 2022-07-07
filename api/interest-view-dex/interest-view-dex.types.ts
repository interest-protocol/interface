import { BigNumber } from 'ethers';

export type GetAmountsOut = (
  chainId: number,
  tokenIn: string,
  tokenOut: string,
  amountIn: BigNumber,
  bases: string[]
) => Promise<[string, BigNumber] & { base: string; amountOut: BigNumber }>;
