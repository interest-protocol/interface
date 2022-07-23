import { BigNumber, BigNumberish, ethers } from 'ethers';

import { CHAIN_ID, CONTRACTS, INIT_CODE_HASH } from '../constants';
import { ERC20 } from '../entities/erc-20';

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
  tokenA: string,
  tokenB: string
): [string, string] => {
  const tokenABN = BigNumber.from(tokenA);
  const tokenBBN = BigNumber.from(tokenB);
  if (tokenBBN.gt(tokenABN)) return [tokenA, tokenB];

  return [tokenB, tokenA];
};

export const sortERC20 = (tokenA: ERC20, tokenB: ERC20): [ERC20, ERC20] =>
  ethers.utils.getAddress(sortTokens(tokenA.address, tokenB.address)[0]) ===
  ethers.utils.getAddress(tokenA.address)
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

export const isBNBChain = (chainId: number) =>
  CHAIN_ID.BNB_TEST_NET === chainId || CHAIN_ID.BNB_MAIN_MET === chainId;

export const getIPXPairAddress = (
  chainId: number,
  tokenAAddress: string,
  tokenBAddress: string,
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
    INIT_CODE_HASH.IPX_PAIR[chainId]
  );
