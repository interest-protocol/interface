import { BigNumber } from 'ethers';

import { QueryConfig } from '@/interface';

export type UseNativeBalanceConfig = QueryConfig<BigNumber, Error>;

export interface QueryKeyArgs {
  account: string;
  chainId: number;
}
