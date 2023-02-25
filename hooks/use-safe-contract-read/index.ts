import { parseContractResult, ReadContractConfig } from '@wagmi/core';
import { useMemo } from 'react';
import { deepEqual, useQuery } from 'wagmi';

import { useChainId } from '../use-chain-id';
import { UseContractReadConfig } from './use-contract-read.types';
import { queryFn, queryKey } from './use-contract-read.utils';

export function useSafeContractRead({
  address,
  abi,
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
        address,
        args,
        chainId,
        functionName,
        overrides,
      }),
    [address, args, chainId, functionName, overrides]
  );

  const enabled = useMemo(() => {
    return Boolean(enabled_ && address && functionName);
  }, [address, enabled_, functionName]);

  return useQuery(queryKey_, queryFn({ abi }), {
    cacheTime,
    enabled,
    isDataEqual,
    select: (data) => {
      const result = parseContractResult({
        abi,
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
