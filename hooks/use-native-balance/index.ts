import { deepEqual, useQuery } from 'wagmi';

import { getStaticWeb3Provider } from '@/utils';

import { useIdAccount } from '../use-id-account';
import {
  QueryKeyArgs,
  UseNativeBalanceConfig,
} from './use-native-balance.types';

export const queryKey = ({
  chainId,
  account,
}: QueryKeyArgs & {
  chainId?: number;
}) => [{ entity: 'nativeBalance', chainId, account }] as const;

export function useNativeBalance({
  cacheTime,
  enabled = true,
  staleTime,
  suspense,
  onError,
  onSettled,
  onSuccess,
}: UseNativeBalanceConfig = {}) {
  const { account, chainId } = useIdAccount();
  const provider = getStaticWeb3Provider(chainId);

  return useQuery(
    queryKey({ account, chainId }),
    () => provider.getBalance(account),
    {
      cacheTime,
      enabled,
      staleTime,
      suspense,
      onError,
      onSettled,
      onSuccess,
      isDataEqual: deepEqual,
    }
  );
}
