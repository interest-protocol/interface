import { Network } from '@mysten/sui.js';

import { COIN_TYPE } from '@/constants/coins';
import { AddressZero, TOKEN_SYMBOL } from '@/sdk';

export enum PoolType {
  Volatile,
  Stable,
}

export const DEX_TOKENS_DATA = [
  {
    symbol: TOKEN_SYMBOL.SUI,
    decimals: 9,
    type: COIN_TYPE[Network.DEVNET].SUI,
    name: 'Sui',
  },
  {
    symbol: TOKEN_SYMBOL.BTC,
    decimals: 0,
    type: COIN_TYPE[Network.DEVNET].BTC,
    name: 'Bitcoin',
  },
  {
    symbol: TOKEN_SYMBOL.ETH,
    decimals: 0,
    type: COIN_TYPE[Network.DEVNET].ETH,
    name: 'Ether',
  },
  {
    symbol: TOKEN_SYMBOL.BNB,
    decimals: 0,
    type: COIN_TYPE[Network.DEVNET].BNB,
    name: 'BNB Coin',
  },
  {
    symbol: TOKEN_SYMBOL.USDT,
    decimals: 0,
    type: COIN_TYPE[Network.DEVNET].USDT,
    name: 'USD Tether',
  },
  {
    symbol: TOKEN_SYMBOL.USDC,
    decimals: 0,
    type: COIN_TYPE[Network.DEVNET].USDC,
    name: 'USD Coin',
  },
  {
    symbol: TOKEN_SYMBOL.DAI,
    decimals: 0,
    type: COIN_TYPE[Network.DEVNET].DAI,
    name: 'DAI',
  },
];

const getSUIDevNetData = (tokenSymbol: TOKEN_SYMBOL) => ({
  symbol: tokenSymbol,
  decimals: 12,
  name: tokenSymbol,
  address: AddressZero,
});

export const RECOMMENDED_POOLS = {
  [PoolType.Volatile]: [
    {
      pairAddress: '0xD4a22921a4A642AA653595f5530abd358F7f0842',
      token0: getSUIDevNetData(TOKEN_SYMBOL.SUI),
      token1: getSUIDevNetData(TOKEN_SYMBOL.BNB),
    },
    {
      pairAddress: '0xb8AF44a4eD047F6137aC148b0D1197913222993d',
      token0: getSUIDevNetData(TOKEN_SYMBOL.SUI),
      token1: getSUIDevNetData(TOKEN_SYMBOL.USDT),
    },
    {
      pairAddress: '0x8309E5d16Ade1A46e959Ec50e2D58f7f386273B0',
      token0: getSUIDevNetData(TOKEN_SYMBOL.SUI),
      token1: getSUIDevNetData(TOKEN_SYMBOL.ETH),
    },
  ],
  [PoolType.Stable]: [
    {
      pairAddress: '0xEAd84c099eb2ad7f9714AfE3Ee8939986c3D5691',
      token0: getSUIDevNetData(TOKEN_SYMBOL.DAI),
      token1: getSUIDevNetData(TOKEN_SYMBOL.USDC),
    },
  ],
};
