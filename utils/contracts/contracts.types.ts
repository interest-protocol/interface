import { JsonRpcSigner, StaticJsonRpcProvider } from '@ethersproject/providers';

import { TOKEN_SYMBOL } from '@/sdk';

export type GetContractAddress = (chainId: number) => string;

export type GetViewContract<T> = (
  chainId: number,
  provider: StaticJsonRpcProvider
) => T;

export type GetSignerContract<T> = (
  chainId: number,
  provider: JsonRpcSigner
) => T;

export type GetDineroSignerContract<T> = (
  chainId: number,
  tokenSymbol: TOKEN_SYMBOL,
  provider: JsonRpcSigner
) => T;
