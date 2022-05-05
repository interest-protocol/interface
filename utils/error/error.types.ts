import { JsonRpcSigner } from '@ethersproject/providers';

interface ThrowIfInvalidSignerResponse {
  validId: number;
  validSigner: JsonRpcSigner;
}

export type ThrowIfInvalidSigner = (
  accounts: ReadonlyArray<string>,
  chainId: number | null,
  signer: JsonRpcSigner | undefined | null
) => ThrowIfInvalidSignerResponse;
