import type { AddEthereumChainParameter } from '@web3-react/types';

export enum CHAIN_ID {
  BSC_TEST_NET = 97,
  BSC_MAIN_MET = 56,
}

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
  [CHAIN_ID.BSC_MAIN_MET]: {
    chainId: CHAIN_ID.BSC_MAIN_MET,
    chainName: 'Binance Smart Chain',
    nativeCurrency: BNB,
    rpcUrls: process.env.NEXT_PUBLIC_IS_PROD
      ? [process.env.NEXT_PUBLIC_BSC_RPC_URL]
      : [
          'https://bsc-dataseed.binance.org/',
          'https://bsc-dataseed1.defibit.io/',
          'https://bsc-dataseed1.ninicoin.io/',
        ],
    blockExplorerUrls: ['https://bscscan.com'],
  },
} as { [key: string]: AddEthereumChainParameter };

export const URLS = Object.keys(CHAINS).reduce((acc, chainId) => {
  const rpcUrls = CHAINS[chainId].rpcUrls;

  if (!rpcUrls.length) return acc;

  return { ...acc, [+chainId]: rpcUrls };
}, {});

export const CHAIN_IDS = Object.keys(CHAINS).map(Number);