import { ethers } from 'ethers';

import PairABI from '@/sdk/abi/uniswap-v2-pair.abi.json';

import { UniswapV2PairAbi } from '../../types/ethers-contracts';
import { TGetReserves } from './uniswap-v2.types';

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
