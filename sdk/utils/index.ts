import { BigNumber, BigNumberish, ethers } from 'ethers';

import { CHAIN_ID } from '@/sdk/constants';

export const ZERO_BIG_NUMBER = BigNumber.from(0);

export const closeTo = (
  x: BigNumber,
  y: BigNumber,
  margin: BigNumber
): boolean => {
  return y.sub(margin).lte(x);
};

export const parseBigNumberish = (x: BigNumberish): BigNumber =>
  BigNumber.isBigNumber(x) ? x : BigNumber.from(x);

export const parseToPositiveStringNumber = (x: string): string => {
  if (isNaN(+x)) return '0';
  if (0 > +x) return '0';
  return x;
};

export const sortTokens = (
  tokenA: string,
  tokenB: string
): [string, string] => {
  if (ethers.utils.getAddress(tokenB) > ethers.utils.getAddress(tokenA))
    return [tokenA, tokenB];

  return [tokenA, tokenB];
};

export const quote = (
  amountA: BigNumber,
  reserveA: BigNumber,
  reserveB: BigNumber
): BigNumber => {
  if (reserveA.isZero()) return ZERO_BIG_NUMBER;
  return amountA.mul(reserveB).div(reserveA);
};

export const isBNBChain = (chainId: number) =>
  CHAIN_ID.BSC_TEST_NET === chainId || CHAIN_ID.BSC_MAIN_MET === chainId;
