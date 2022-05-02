import type { AddEthereumChainParameter } from '@web3-react/types';
import {
  __,
  always,
  dissoc,
  identity,
  ifElse,
  includes,
  pathOr,
  values,
} from 'ramda';

import { CHAIN_ID } from '@/sdk/constants';

export const BNB: AddEthereumChainParameter['nativeCurrency'] = {
  name: 'Binance Coin',
  symbol: 'BNB',
  decimals: 18,
};

export const CHAINS = {
  [CHAIN_ID.BSC_TEST_NET]: {
    chainId: CHAIN_ID.BSC_TEST_NET,
    chainName: 'Binance Smart Chain Test Net',
    nativeCurrency: BNB,
    rpcUrls: process.env.NEXT_PUBLIC_BSC_TEST_NET_JSON_RPC
      ? [process.env.NEXT_PUBLIC_BSC_TEST_NET_JSON_RPC].concat([
          'https://data-seed-prebsc-2-s1.binance.org:8545/',
          'https://data-seed-prebsc-1-s1.binance.org:8545/',
          'https://data-seed-prebsc-1-s2.binance.org:8545/',
          'https://data-seed-prebsc-2-s2.binance.org:8545/',
          'https://data-seed-prebsc-1-s3.binance.org:8545/',
          'https://data-seed-prebsc-2-s3.binance.org:8545/',
        ])
      : [
          'https://data-seed-prebsc-2-s1.binance.org:8545/',
          'https://data-seed-prebsc-1-s1.binance.org:8545/',
          'https://data-seed-prebsc-1-s2.binance.org:8545/',
          'https://data-seed-prebsc-2-s2.binance.org:8545/',
          'https://data-seed-prebsc-1-s3.binance.org:8545/',
          'https://data-seed-prebsc-2-s3.binance.org:8545/',
        ],
    blockExplorerUrls: ['https://testnet.bscscan.com'],
  },
  [CHAIN_ID.BSC_MAIN_MET]: {
    chainId: CHAIN_ID.BSC_MAIN_MET,
    chainName: 'Binance Smart Chain',
    nativeCurrency: BNB,
    rpcUrls: process.env.NEXT_PUBLIC_BSC_RPC_URL
      ? [process.env.NEXT_PUBLIC_BSC_RPC_URL].concat([
          'https://bsc-dataseed.binance.org/',
          'https://bsc-dataseed1.defibit.io/',
          'https://bsc-dataseed1.ninicoin.io/',
        ])
      : [
          'https://bsc-dataseed.binance.org/',
          'https://bsc-dataseed1.defibit.io/',
          'https://bsc-dataseed1.ninicoin.io/',
        ],
    blockExplorerUrls: ['https://bscscan.com'],
  },
  [CHAIN_ID.UNSUPPORTED]: {
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

export const CHAIN_ID_ARRAY = values(dissoc('UNSUPPORTED', CHAIN_ID));

export const isChainIdSupported = includes(__, CHAIN_ID_ARRAY);

export const verifyChainId = ifElse(
  isChainIdSupported,
  identity,
  always(CHAIN_ID.UNSUPPORTED)
);

export const getNativeCurrencySymbol = (chainId: number): string =>
  pathOr('???', [chainId.toString(), 'nativeCurrency', 'symbol'], CHAINS);
