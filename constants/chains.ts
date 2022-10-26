import { rinkeby } from '@wagmi/core/chains';
import { __, includes } from 'ramda';
import { Chain } from 'wagmi';

import { RoutesEnum } from '@/constants/routes';
import { CHAIN_ID } from '@/sdk/constants';

import { Routes } from './routes';

export const SUPPORTED_CHAINS_RECORD = {
  [Routes[RoutesEnum.Farms]]: [CHAIN_ID.BNB_TEST_NET],
  [Routes[RoutesEnum.FarmDetails]]: [CHAIN_ID.BNB_TEST_NET],
  [Routes[RoutesEnum.Faucet]]: [CHAIN_ID.RINKEBY, CHAIN_ID.BNB_TEST_NET],
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
};

export const BNB: Chain['nativeCurrency'] = {
  name: 'Binance Coin',
  symbol: 'BNB',
  decimals: 18,
};

export const RPC_URL = {
  [CHAIN_ID.BNB_TEST_NET]: process.env.NEXT_PUBLIC_BSC_TEST_NET_JSON_RPC
    ? process.env.NEXT_PUBLIC_BSC_TEST_NET_JSON_RPC
    : 'https://data-seed-prebsc-2-s1.binance.org:8545/',
  [CHAIN_ID.BNB_MAIN_NET]: process.env.NEXT_PUBLIC_BSC_RPC_URL
    ? process.env.NEXT_PUBLIC_BSC_RPC_URL
    : 'https://bsc-dataseed.binance.org/',
  [CHAIN_ID.RINKEBY]: process.env.NEXT_PUBLIC_RINKEBY_URL
    ? process.env.NEXT_PUBLIC_RINKEBY_URL
    : 'https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
};

export const CHAINS = {
  [CHAIN_ID.RINKEBY]: rinkeby,
  [CHAIN_ID.BNB_TEST_NET]: {
    id: CHAIN_ID.BNB_TEST_NET,
    name: 'BNBT',
    network: 'bnbt',
    nativeCurrency: BNB,
    rpcUrls: { default: 'https://data-seed-prebsc-1-s1.binance.org:8545/' },
    blockExplorers: {
      default: { url: 'https://testnet.bscscan.com', name: 'BSCScan' },
    },
    testnet: true,
  },
  [CHAIN_ID.BNB_MAIN_NET]: {
    id: CHAIN_ID.BNB_MAIN_NET,
    name: 'BNB',
    network: 'bnb',
    nativeCurrency: BNB,
    rpcUrls: {
      default: 'https://bsc-dataseed.binance.org/',
    },
    blockExplorers: {
      default: { url: 'https://bscscan.com', name: 'BSCScan' },
    },
    testnet: false,
  },
  [CHAIN_ID.UNSUPPORTED]: {
    id: CHAIN_ID.UNSUPPORTED,
    name: 'Unsupported Network',
    network: 'unsupported network',
    nativeCurrency: {
      name: '???',
      symbol: '???',
      decimals: 18,
    },
    rpcUrls: { default: '' },
    blockExplorers: {
      default: { url: '', name: '' },
    },
  },
} as Record<string, Chain>;

export const isChainIdSupported = includes(__, [
  CHAIN_ID.BNB_TEST_NET,
  CHAIN_ID.RINKEBY,
]);
