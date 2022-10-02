import { BigNumber } from 'ethers';

export type QuoteRemoveLiquidity = (
  chainId: number,
  tokenA: string,
  tokenB: string,
  isStable: boolean,
  amount: BigNumber
) => Promise<
  [BigNumber, BigNumber] & { amountA: BigNumber; amountB: BigNumber }
>;

export type QuoteAddLiquidity = (
  chainId: number,
  tokenA: string,
  tokenB: string,
  isStable: boolean,
  amountADesired: BigNumber,
  amountBDesired: BigNumber
) => Promise<
  [BigNumber, BigNumber, BigNumber] & {
    amountA: BigNumber;
    amountB: BigNumber;
    liquidity: BigNumber;
  }
>;
