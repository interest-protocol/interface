import { ReadContractConfig, ReadContractResult } from '@wagmi/core';
import { QueryConfig } from 'wagmi/dist/declarations/src/types';

export type UseContractReadArgs = ReadContractConfig & {
  /** If set to `true`, the cache will depend on the block number */
  cacheOnBlock?: boolean;
  /** Subscribe to changes */
  watch?: boolean;
};

export type UseContractReadConfig = QueryConfig<ReadContractResult, Error>;
