import { QueryFunctionContext, UseQueryOptions } from '@tanstack/react-query';
import type { Ethereum } from '@wagmi/core';
import { PrepareWriteContractConfig } from '@wagmi/core';
import { NextPage } from 'next';
import MessageKeys from 'use-intl/dist/utils/MessageKeys';
import { UsePrepareContractWriteConfig } from 'wagmi';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IEmptyObj {}

export type UseContractArgs = {
  cacheOnBlock?: boolean;
  overrides?: PrepareWriteContractConfig['overrides'];
  enabled?: boolean;
  staleTime?: number;
};

export declare type QueryFunctionArgs<T extends (...args: any) => any> =
  QueryFunctionContext<ReturnType<T>>;

export interface ContractHookError {
  prepare: boolean;
  write: boolean;
}

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

export interface QueryKeyArgs {
  address: `0x${string}`;
  args: ReadonlyArray<unknown> | undefined;
  chainId: number;
  functionName: string;
  overrides: any;
}

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

export type TTranslatedMessage = MessageKeys<IntlMessages, keyof IntlMessages>;

export interface HandlerData {
  functionName: UsePrepareContractWriteConfig['functionName'];
  abi: UsePrepareContractWriteConfig['abi'];
  args: any[];
  overrides?: UsePrepareContractWriteConfig['overrides'] | undefined;
  enabled: boolean;
}

export type NextPageWithAddress = NextPage<{ address: `0x${string}` }>;

export type Address = `0x${string}`;
