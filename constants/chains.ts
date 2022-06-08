import type { AddEthereumChainParameter } from '@web3-react/types';
import { __, always, identity, ifElse, includes, pathOr } from 'ramda';

import { CHAIN_ID } from '@/sdk/constants';

import { Routes } from './routes';

export const SUPPORTED_CHAINS_RECORD = {
  [Routes.dapp]: [CHAIN_ID.BNB_TEST_NET],
  [Routes.earn]: [CHAIN_ID.BNB_TEST_NET],
  [Routes.faucet]: [CHAIN_ID.RINKEBY],
  [Routes.repay]: [CHAIN_ID.BNB_TEST_NET],
  [Routes['dinero-market']]: [CHAIN_ID.BNB_TEST_NET],
  [Routes['mail-market']]: [CHAIN_ID.RINKEBY],
  [Routes['mail-market-pool']]: [CHAIN_ID.RINKEBY],
};

export const BNB: AddEthereumChainParameter['nativeCurrency'] = {
  name: 'Binance Coin',
  symbol: 'BNB',
  decimals: 18,
};

const ETH: AddEthereumChainParameter['nativeCurrency'] = {
  name: 'Ether',
  symbol: 'ETH',
  decimals: 18,
};

export const RPC_URL = {
  [CHAIN_ID.BNB_TEST_NET]: process.env.NEXT_PUBLIC_BSC_TEST_NET_JSON_RPC
    ? process.env.NEXT_PUBLIC_BSC_TEST_NET_JSON_RPC
    : 'https://data-seed-prebsc-2-s1.binance.org:8545/',
  [CHAIN_ID.BNB_MAIN_MET]: process.env.NEXT_PUBLIC_BSC_RPC_URL
    ? process.env.NEXT_PUBLIC_BSC_RPC_URL
    : 'https://bsc-dataseed.binance.org/',
  [CHAIN_ID.RINKEBY]: process.env.NEXT_PUBLIC_RINKEBY_URL
    ? process.env.NEXT_PUBLIC_RINKEBY_URL
    : 'https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
};

export const CHAINS = {
  [CHAIN_ID.RINKEBY]: {
    chainId: CHAIN_ID.RINKEBY,
    chainName: 'Rinkeby',
    nativeCurrency: ETH,
    rpcUrls: ['https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161'],
    blockExplorerUrls: ['https://rinkeby.etherscan.io/'],
  },
  [CHAIN_ID.BNB_TEST_NET]: {
    chainId: CHAIN_ID.BNB_TEST_NET,
    chainName: 'BNBT',
    nativeCurrency: BNB,
    rpcUrls: [
      'https://data-seed-prebsc-1-s1.binance.org:8545/',
      'https://data-seed-prebsc-2-s1.binance.org:8545/',
      'https://data-seed-prebsc-1-s2.binance.org:8545/',
      'https://data-seed-prebsc-2-s2.binance.org:8545/',
      'https://data-seed-prebsc-1-s3.binance.org:8545/',
      'https://data-seed-prebsc-2-s3.binance.org:8545/',
    ],
    blockExplorerUrls: ['https://testnet.bscscan.com'],
  },
  [CHAIN_ID.BNB_MAIN_MET]: {
    chainId: CHAIN_ID.BNB_MAIN_MET,
    chainName: 'BNB',
    nativeCurrency: BNB,
    rpcUrls: [
      'https://bsc-dataseed.binance.org/',
      'https://bsc-dataseed1.defibit.io/',
      'https://bsc-dataseed1.ninicoin.io/',
    ],
    blockExplorerUrls: ['https://bscscan.com'],
  },
  [CHAIN_ID.UNSUPPORTED]: {
    symbol: '???',
    chainId: CHAIN_ID.UNSUPPORTED,
    chainName: 'Unsupported Network',
    nativeCurrency: {
      name: '???',
      symbol: '???',
      decimals: 18,
    },
    rpcUrls: [''],
    blockExplorerUrls: [''],
  },
} as Record<string, AddEthereumChainParameter>;

export const URLS = Object.keys(CHAINS).reduce((acc, chainId) => {
  const rpcUrls = CHAINS[chainId].rpcUrls;

  if (!rpcUrls.length) return acc;

  return { ...acc, [+chainId]: rpcUrls };
}, {});

export const isChainIdSupported = includes(__, [
  CHAIN_ID.BNB_TEST_NET,
  CHAIN_ID.RINKEBY,
]);

export const verifyChainId = ifElse(
  isChainIdSupported,
  identity,
  always(CHAIN_ID.UNSUPPORTED)
);

export const getNativeCurrencySymbol = (chainId: number): string =>
  pathOr('???', [chainId.toString(), 'nativeCurrency', 'symbol'], CHAINS);

export const supportsMAILMarkets = includes(__, [CHAIN_ID.RINKEBY]);

export const supportsDineroMarkets = includes(__, [CHAIN_ID.BNB_TEST_NET]);
