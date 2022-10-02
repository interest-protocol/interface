import { Result } from '@ethersproject/abi';
import { JsonRpcSigner, StaticJsonRpcProvider } from '@ethersproject/providers';
import { BigNumber } from 'ethers';

export type GetContractAddress = (chainId: number) => string;

export type GetContract<T> = (
  chainId: number,
  provider: StaticJsonRpcProvider | JsonRpcSigner
) => T;

export interface CreateTokenEventArgs extends Result {
  token: string;
  creator: string;
  initialSupply: BigNumber;
}
