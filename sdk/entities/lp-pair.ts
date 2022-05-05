import { BigNumber, ethers } from 'ethers';

import { CONTRACTS, INIT_CODE_HASH } from '../constants';
import { isBNBChain, quote, sortTokens } from '../utils';
import { ERC20 } from './erc-20';

const LOCAL_CACHE = new Map();

const composeKey = (token0: ERC20, token1: ERC20) =>
  `${token0.chainId}-${token0.address}-${token1.address}`;

const getInitCodeHash = (chainId: number) => {
  if (isBNBChain(chainId)) return INIT_CODE_HASH.PCS_PAIR[chainId];

  return ethers.constants.HashZero;
};

export const getFactoryContract = (chainId: number) => {
  if (isBNBChain(chainId)) return CONTRACTS.PCS_FACTORY[chainId];

  return ethers.constants.AddressZero;
};

export class LPPairV2 extends ERC20 {
  protected constructor(
    name: string,
    symbol: string,
    decimals: number,
    address: string,
    chainId: number,
    public readonly token0: ERC20,
    public readonly token1: ERC20,
    public readonly reserves0: BigNumber,
    public readonly reserves1: BigNumber
  ) {
    super(name, symbol, decimals, address, chainId);
  }

  public static createPCSPair(
    address: string,
    chainId: number,
    token0: ERC20,
    token1: ERC20,
    reserves0: BigNumber,
    reserves1: BigNumber
  ): LPPairV2 {
    return new LPPairV2(
      'Pancake LPs',
      'Cake-LP',
      18,
      address,
      chainId,
      token0,
      token1,
      reserves0,
      reserves1
    );
  }

  public static getV2Address(tokenA: ERC20, tokenB: ERC20): string {
    const sortedAddresses = sortTokens(tokenA.address, tokenB.address);

    if (
      tokenA.chainId !== tokenB.chainId ||
      tokenA.address.toLowerCase() === tokenB.address.toLowerCase()
    )
      return ethers.constants.AddressZero;

    const [token0, token1] =
      sortedAddresses[0] === tokenA.address
        ? [tokenA, tokenB]
        : [tokenB, tokenA];

    const key = composeKey(token0, token1);

    if (!LOCAL_CACHE.has(key)) {
      LOCAL_CACHE.set(
        key,
        ethers.utils.getCreate2Address(
          CONTRACTS.PCS_FACTORY[tokenA.chainId],
          ethers.utils.solidityKeccak256(
            ['bytes'],
            [
              ethers.utils.solidityPack(
                ['address', 'address'],
                [token0.address, token1.address]
              ),
            ]
          ),
          getInitCodeHash(token0.chainId)
        )
      );
    }

    return LOCAL_CACHE.get(key);
  }

  public hasToken(token: ERC20): boolean {
    const x = ethers.utils.getAddress(token.address);
    if (token.chainId !== this.chainId) return false;
    return this.hasAddress(x);
  }

  public hasAddress(address: string): boolean {
    const x = ethers.utils.getAddress(address);
    return (
      ethers.utils.getAddress(this.token0.address) === x ||
      x === ethers.utils.getAddress(this.token1.address)
    );
  }

  public isAddress0(x: string): boolean {
    return (
      ethers.utils.getAddress(x) ===
      ethers.utils.getAddress(this.token0.address)
    );
  }

  public isAddress1(x: string): boolean {
    return (
      ethers.utils.getAddress(x) ===
      ethers.utils.getAddress(this.token1.address)
    );
  }

  public quoteToken0(amount0: BigNumber): BigNumber {
    return quote(amount0, this.reserves0, this.reserves1);
  }

  public quoteToken1(amount1: BigNumber): BigNumber {
    return quote(amount1, this.reserves1, this.reserves0);
  }

  public getReserve(token: ERC20): BigNumber {
    if (!this.hasToken(token)) return BigNumber.from(0);

    return ethers.utils.getAddress(token.address) ===
      ethers.utils.getAddress(this.token0.address)
      ? this.reserves0
      : this.reserves1;
  }
}
