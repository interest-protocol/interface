import { Result } from '@ethersproject/abi';
import { JsonRpcSigner, StaticJsonRpcProvider } from '@ethersproject/providers';
import { BigNumber } from 'ethers';

import { TOKEN_SYMBOL } from '@/sdk';

export type GetContractAddress = (chainId: number) => string;

export type GetContract<T> = (
  chainId: number,
  provider: StaticJsonRpcProvider | JsonRpcSigner
) => T;

export type GetSignerContract<T> = (
  chainId: number,
  signer: JsonRpcSigner
) => T;

export type GetDineroSignerContract<T> = (
  chainId: number,
  tokenSymbol: TOKEN_SYMBOL,
  provider: JsonRpcSigner
) => T;

export interface CreateTokenEventArgs extends Result {
  token: string;
  creator: string;
  initialSupply: BigNumber;
}
