import { ProviderRpcError } from '@web3-react/types';

import { isChainIdSupported } from '@/constants';
import { isValidAccount } from '@/utils/address';

import { ThrowIfInvalidSigner } from './error.types';
export const throwContractCallError = (e: unknown): void => {
  if ((e as ProviderRpcError).code === -32603) {
    const message = ((e as ProviderRpcError)?.data as Record<string, string>)
      ?.message;
    throw new Error(
      typeof message === 'string' ? message : 'Something went wrong'
    );
  }
  throw new Error('Something went wrong');
};

export const throwIfInvalidAccount = (accounts: ReadonlyArray<string>) => {
  accounts.forEach((x) => {
    if (!isValidAccount(x)) throw new Error(`Invalid account: ${x}`);
  });
};

export const throwIfInvalidSigner: ThrowIfInvalidSigner = (
  accounts,
  chainId,
  signer
) => {
  throwIfInvalidAccount(accounts);

  if (!chainId) throw new Error(`No chain id detected`);

  if (!isChainIdSupported(chainId))
    throw new Error(`Invalid chain id: ${chainId}`);

  if (!signer) throw new Error('No JsonRpcSigner detected');

  return { validId: chainId, validSigner: signer };
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const throwError = (message?: string, e?: unknown) => {
  throw e ?? new Error(message || 'Something went wrong');
};
