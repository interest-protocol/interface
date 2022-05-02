import { Web3Provider } from '@ethersproject/providers';
import { BigNumber } from 'ethers';

export type TGetReserves = (
  provider: Web3Provider,
  pairAddress: string
) => Promise<{
  reserve0: BigNumber;
  reserve1: BigNumber;
  blockTimestampLast: number;
}>;
