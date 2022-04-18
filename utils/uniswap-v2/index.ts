import { ethers } from 'ethers';

import PairABI from '@/constants/abi/uniswap-v2-pair.abi.json';
import { ZERO } from '@/constants/index';
import { Pair } from '@/sdk/entities/pair';

import { UniswapV2PairAbi } from '../../types/ethers-contracts';
import { TGetReserves, TQuote } from './uniswap-v2.types';

export const quote: TQuote = (amountA, reserveA, reserveB) => {
  if (reserveA.isZero()) return ZERO;
  return amountA.mul(reserveB).div(reserveA);
};

export const getReserves: TGetReserves = async (provider, pairAddress) => {
  const pair = new ethers.Contract(
    pairAddress,
    PairABI,
    provider
  ) as UniswapV2PairAbi;

  const [reserve0, reserve1, blockTimestampLast] = await pair.getReserves();

  return {
    reserve0,
    reserve1,
    blockTimestampLast,
  };
};

export const sortTokens = (tokenA: string, tokenB: string): Pair => {
  if (ethers.utils.getAddress(tokenB) > ethers.utils.getAddress(tokenA))
    return Pair.from(tokenA, tokenB);

  return Pair.from(tokenB, tokenA);
};
