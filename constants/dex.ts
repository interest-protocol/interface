import { CHAIN_ID, TOKEN_SYMBOL } from '@/sdk';
import { getWETHAddress } from '@/utils';

import { ERC_20_DATA } from './erc-20';

export enum PoolType {
  Volatile,
  Stable,
}

const getBNBTestNetData = (tokenSymbol: TOKEN_SYMBOL) => ({
  symbol: ERC_20_DATA[CHAIN_ID.BNB_TEST_NET][tokenSymbol].symbol,
  decimals: ERC_20_DATA[CHAIN_ID.BNB_TEST_NET][tokenSymbol].decimals,
  name: ERC_20_DATA[CHAIN_ID.BNB_TEST_NET][tokenSymbol].name,
  address: ERC_20_DATA[CHAIN_ID.BNB_TEST_NET][tokenSymbol].address,
  chainId: ERC_20_DATA[CHAIN_ID.BNB_TEST_NET][tokenSymbol].chainId,
});

export const SWAP_BASES = {
  [CHAIN_ID.BNB_MAIN_MET]: [],
  [CHAIN_ID.RINKEBY]: [],
  [CHAIN_ID.BNB_TEST_NET]: [
    getBNBTestNetData(TOKEN_SYMBOL.ETH),
    getBNBTestNetData(TOKEN_SYMBOL.USDC),
  ],
};

export const RECOMMENDED_POOLS = {
  [CHAIN_ID.BNB_MAIN_MET]: {
    [PoolType.Volatile]: [],
    [PoolType.Stable]: [],
  },
  [CHAIN_ID.RINKEBY]: {
    [PoolType.Volatile]: [],
    [PoolType.Stable]: [],
  },
  [CHAIN_ID.BNB_TEST_NET]: {
    [PoolType.Volatile]: [
      {
        pairAddress: '0xD4a22921a4A642AA653595f5530abd358F7f0842',
        token0: getBNBTestNetData(TOKEN_SYMBOL.INT),
        token1: getBNBTestNetData(TOKEN_SYMBOL.WBNB),
      },
      {
        pairAddress: '0xb8AF44a4eD047F6137aC148b0D1197913222993d',
        token0: getBNBTestNetData(TOKEN_SYMBOL.WBNB),
        token1: getBNBTestNetData(TOKEN_SYMBOL.USDT),
      },
      {
        pairAddress: '0x8309E5d16Ade1A46e959Ec50e2D58f7f386273B0',
        token0: getBNBTestNetData(TOKEN_SYMBOL.INT),
        token1: getBNBTestNetData(TOKEN_SYMBOL.ETH),
      },
    ],
    [PoolType.Stable]: [
      {
        pairAddress: '0xEAd84c099eb2ad7f9714AfE3Ee8939986c3D5691',
        token0: getBNBTestNetData(TOKEN_SYMBOL.DNR),
        token1: getBNBTestNetData(TOKEN_SYMBOL.USDC),
      },
    ],
  },
};

export const WRAPPED_NATIVE_TOKEN = {
  [CHAIN_ID.BNB_TEST_NET]: {
    symbol: TOKEN_SYMBOL.WBNB,
    decimals: 18,
    name: 'Wrapped Binance Coin',
    address: getWETHAddress(CHAIN_ID.BNB_TEST_NET),
    chainId: CHAIN_ID.BNB_TEST_NET,
  },
};
