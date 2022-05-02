import { StaticJsonRpcProvider } from '@ethersproject/providers';

export type GetContractAddress = (chainId: number) => string;

export type GetViewContract<T> = (
  chainId: number,
  provider: StaticJsonRpcProvider
) => T;
