import { ProviderRpcError } from 'wagmi';

export const throwContractCallError = (e: unknown): void => {
  if (e instanceof ProviderRpcError) {
    if (e.code === -32603) {
      throw new Error(e.message ?? 'Something went wrong');
    }
  }
  throw new Error('Something went wrong');
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const throwError = (message?: string, e?: unknown) => {
  throw e ?? new Error(message || 'Something went wrong');
};
