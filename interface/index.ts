import { CallOverrides } from 'ethers/lib/ethers';

export type MaybeArray<T> = T | Array<T>;

export type UseContractArgs = {
  cacheOnBlock?: boolean;
  overrides?: CallOverrides;
  enabled?: boolean;
  staleTime?: number;
};
