import { bsc, bscTestnet } from '@wagmi/core/chains';
import { __, includes } from 'ramda';
import { Chain } from 'wagmi';

import { RoutesEnum } from '@/constants/routes';
import { CHAIN_ID } from '@/sdk/constants';

import { Routes } from './routes';

export const SUPPORTED_CHAINS_RECORD = {
  [Routes[RoutesEnum.Farms]]: [CHAIN_ID.BNB_TEST_NET],
  [Routes[RoutesEnum.FarmDetails]]: [CHAIN_ID.BNB_TEST_NET],
  [Routes[RoutesEnum.Faucet]]: [CHAIN_ID.BNB_TEST_NET],
  [Routes[RoutesEnum.DineroMarket]]: [CHAIN_ID.BNB_TEST_NET],
  [Routes[RoutesEnum.DineroMarketRepay]]: [CHAIN_ID.BNB_TEST_NET],
  [Routes[RoutesEnum.DineroMarketBorrow]]: [CHAIN_ID.BNB_TEST_NET],
  [Routes[RoutesEnum.SyntheticsMarket]]: [CHAIN_ID.BNB_TEST_NET],
  [Routes[RoutesEnum.SyntheticsMarketMint]]: [CHAIN_ID.BNB_TEST_NET],
  [Routes[RoutesEnum.SyntheticsMarketBurn]]: [CHAIN_ID.BNB_TEST_NET],
  [Routes[RoutesEnum.DEX]]: [CHAIN_ID.BNB_TEST_NET],
  [Routes[RoutesEnum.DEXPool]]: [CHAIN_ID.BNB_TEST_NET],
  [Routes[RoutesEnum.DEXFindPool]]: [CHAIN_ID.BNB_TEST_NET],
  [Routes[RoutesEnum.DEXPoolDetails]]: [CHAIN_ID.BNB_TEST_NET],
  [Routes[RoutesEnum.Vaults]]: [CHAIN_ID.BNB_TEST_NET],
  [Routes[RoutesEnum.DineroVault]]: [CHAIN_ID.BNB_TEST_NET],
} as Record<string, ReadonlyArray<number>>;

export const BNB: Chain['nativeCurrency'] = {
  name: 'Binance Coin',
  symbol: 'BNB',
  decimals: 18,
};

export const RPC_URL = {
  [CHAIN_ID.BNB_TEST_NET]: process.env.NEXT_PUBLIC_BSC_TEST_NET_JSON_RPC
    ? process.env.NEXT_PUBLIC_BSC_TEST_NET_JSON_RPC
    : bscTestnet.rpcUrls.public.http[0],
  [CHAIN_ID.BNB_MAIN_NET]: process.env.NEXT_PUBLIC_BSC_RPC_URL
    ? process.env.NEXT_PUBLIC_BSC_RPC_URL
    : bsc.rpcUrls.public.http[0],
};

export const CHAINS = {
  [CHAIN_ID.BNB_TEST_NET]: bscTestnet,
  [CHAIN_ID.BNB_MAIN_NET]: bsc,
  [CHAIN_ID.UNSUPPORTED]: {
    id: CHAIN_ID.UNSUPPORTED,
    name: 'Unsupported Network',
    network: 'unsupported network',
    nativeCurrency: {
      name: '???',
      symbol: '???',
      decimals: 18,
    },
    rpcUrls: {
      default: {
        http: [],
        webSocket: [],
      },
      public: {
        http: [],
        webSocket: [],
      },
    },
    blockExplorers: {
      default: { url: '', name: '' },
      public: { url: '', name: '' },
    },
  },
} as Record<string, Chain>;

export const isChainIdSupported = includes(__, [
  CHAIN_ID.BNB_TEST_NET as number,
]);
