import { parseContractResult } from '@wagmi/core';
import { useMemo } from 'react';
import { deepEqual, useQuery } from 'wagmi';

import { useChainId } from '../use-chain-id';
import {
  UseContractReadArgs,
  UseContractReadConfig,
} from './use-contract-read.types';
import { queryFn, queryKey } from './use-contract-read.utils';

export function useContractRead({
  addressOrName,
  contractInterface,
  functionName,
  args,
  overrides,
  cacheOnBlock = false,
  cacheTime,
  enabled: enabled_ = true,
  isDataEqual = deepEqual,
  select,
  staleTime,
  suspense,
  onError,
  onSettled,
  onSuccess,
}: Omit<UseContractReadArgs, 'chainId'> & UseContractReadConfig) {
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
    [addressOrName, args, cacheOnBlock, chainId, functionName, overrides]
  );

  const enabled = useMemo(() => {
    return Boolean(enabled_ && addressOrName && functionName);
  }, [addressOrName, cacheOnBlock, enabled_, functionName]);

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
