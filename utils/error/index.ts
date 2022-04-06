import { ProviderRpcError } from '@web3-react/types';

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
