import { ReadContractResult } from '@wagmi/core';

import { QueryConfig } from '@/interface';

export type UseContractReadConfig = QueryConfig<ReadContractResult, Error>;
