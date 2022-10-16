import { QueryFunctionContext, UseQueryOptions } from '@tanstack/react-query';
import type { Ethereum } from '@wagmi/core';
import { CallOverrides } from 'ethers/lib/ethers';

export type MaybeArray<T> = T | Array<T>;

export type UseContractArgs = {
  cacheOnBlock?: boolean;
  overrides?: CallOverrides;
  enabled?: boolean;
  staleTime?: number;
};

export declare type QueryFunctionArgs<T extends (...args: any) => any> =
  QueryFunctionContext<ReturnType<T>>;

export declare type QueryConfig<Data, Error> = Pick<
  UseQueryOptions<Data, Error>,
  | 'cacheTime'
  | 'enabled'
  | 'isDataEqual'
  | 'keepPreviousData'
  | 'staleTime'
  | 'select'
  | 'suspense'
  | 'onError'
  | 'onSettled'
  | 'onSuccess'
>;

declare global {
  interface Window {
    BinanceChain?: {
      bnbSign?: (
        address: string,
        message: string
      ) => Promise<{ publicKey: string; signature: string }>;
      switchNetwork?: (networkId: string) => Promise<string>;
    } & Ethereum;
  }
}
