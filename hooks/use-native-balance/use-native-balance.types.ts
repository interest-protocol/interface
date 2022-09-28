import { BigNumber } from 'ethers';
import { QueryConfig } from 'wagmi/dist/declarations/src/types';

export type UseNativeBalanceConfig = QueryConfig<BigNumber, Error>;

export interface QueryKeyArgs {
  account: string;
  chainId: number;
}
