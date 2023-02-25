import { BigNumber, BigNumberish, ethers } from 'ethers';

import { Address } from '@/interface';

import { CONTRACTS, INIT_CODE_HASH } from '../constants';

export const ZERO_BIG_NUMBER = BigNumber.from(0);

export const ONE_ETHER = ethers.utils.parseEther('1');

export const closeTo = (
  x: BigNumber,
  y: BigNumber,
  margin: BigNumber
): boolean => {
  return y.sub(margin).lte(x);
};

export const parseBigNumberish = (x: BigNumberish): BigNumber =>
  BigNumber.isBigNumber(x) ? x : BigNumber.from(x.toString());

export const parseToPositiveStringNumber = (x: string): string => {
  if (isNaN(+x)) return '0';
  if (0 > +x) return '0';
  return x;
};

export const sortTokens = (
  tokenA: Address,
  tokenB: Address
): [Address, Address] =>
  BigNumber.from(tokenB).gt(BigNumber.from(tokenA))
    ? [tokenA, tokenB]
    : [tokenB, tokenA];

export const quote = (
  amountA: BigNumber,
  reserveA: BigNumber,
  reserveB: BigNumber
): BigNumber => {
  if (reserveA.isZero()) return ZERO_BIG_NUMBER;
  return amountA.mul(reserveB).div(reserveA);
};

export const getIPXPairAddress = (
  chainId: number,
  tokenAAddress: Address,
  tokenBAddress: Address,
  isStable: boolean
) =>
  ethers.utils.getCreate2Address(
    CONTRACTS.INT_DEX_FACTORY[chainId],
    ethers.utils.solidityKeccak256(
      ['bytes'],
      [
        ethers.utils.solidityPack(
          ['address', 'address', 'bool'],
          [...sortTokens(tokenAAddress, tokenBAddress), isStable]
        ),
      ]
    ),
    INIT_CODE_HASH[chainId]
  );
