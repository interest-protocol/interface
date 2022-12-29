import { useMemo } from 'react';

import { useChainId } from '../use-chain-id';
import { UseContractReadConfig } from './use-contract-read.types';
import { queryFn, queryKey } from './use-contract-read.utils';

export function useSafeContractRead({
  addressOrName,
  contractInterface,
  functionName,
  args,
  overrides,
  cacheTime,
  enabled: enabled_ = true,
  isDataEqual = deepEqual,
  select,
  staleTime,
  suspense,
  onError,
  onSettled,
  onSuccess,
}: Omit<ReadContractConfig, 'chainId'> & UseContractReadConfig) {
  const chainId = useChainId();

  const queryKey_ = useMemo(
    () =>
      queryKey({
        addressOrName,
        args,
        chainId,
        functionName,
        overrides,
      }),
    [addressOrName, args, chainId, functionName, overrides]
  );

  const enabled = useMemo(() => {
    return Boolean(enabled_ && addressOrName && functionName);
  }, [addressOrName, enabled_, functionName]);

  return useQuery(queryKey_, queryFn({ contractInterface }), {
    cacheTime,
    enabled,
    isDataEqual,
    select: (data) => {
      const result = parseContractResult({
        contractInterface,
        data,
        functionName,
      });
      return select ? select(result) : result;
    },
    staleTime,
    suspense,
    onError,
    onSettled,
    onSuccess,
  });
}
