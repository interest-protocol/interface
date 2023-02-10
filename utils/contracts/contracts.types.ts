import { Result } from '@ethersproject/abi';
import { JsonRpcSigner, StaticJsonRpcProvider } from '@ethersproject/providers';
import { BigNumber } from 'ethers';

export type GetContractAddress = (chainId: number) => `0x${string}`;

export type GetContract<T> = (
  chainId: number,
  provider: StaticJsonRpcProvider | JsonRpcSigner
) => T;

export interface CreateTokenEventArgs extends Result {
  token: `0x${string}`;
  creator: string;
  initialSupply: BigNumber;
}
