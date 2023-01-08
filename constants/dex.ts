import { Network } from '@mysten/sui.js';

import { COIN_TYPE } from '@/constants/coins';
import { TOKEN_SYMBOL } from '@/sdk';

export enum PoolType {
  Volatile,
  Stable,
}
export const DEX_PACKAGE_ID = '0xebe071664df1f5dbcc36368b0ec92840199a7e17';

export const POOLS_OBJECT_ID = '0xe76fb7250f46cb909581333082374dc48eb06d9c';

export const DEX_OBJECT_ID = '0xebe071664df1f5dbcc36368b0ec92840199a7e17';

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

const getSUIDevNetData = (token: TOKEN_SYMBOL) =>
  DEX_TOKENS_DATA.find(({ symbol }) => symbol == token) ?? {
    symbol: TOKEN_SYMBOL.SUI,
    decimals: 9,
    type: COIN_TYPE[Network.DEVNET].SUI,
    name: 'Sui',
  };

export const RECOMMENDED_POOLS = [
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
  {
    pairAddress: '0xD4a22921a4A642AA653595f5530abd358F7f0842',
    token0: getSUIDevNetData(TOKEN_SYMBOL.SUI),
    token1: getSUIDevNetData(TOKEN_SYMBOL.BTC),
  },
  {
    pairAddress: '0xb8AF44a4eD047F6137aC148b0D1197913222993d',
    token0: getSUIDevNetData(TOKEN_SYMBOL.SUI),
    token1: getSUIDevNetData(TOKEN_SYMBOL.DAI),
  },
  {
    pairAddress: '0x8309E5d16Ade1A46e959Ec50e2D58f7f386273B0',
    token0: getSUIDevNetData(TOKEN_SYMBOL.SUI),
    token1: getSUIDevNetData(TOKEN_SYMBOL.USDC),
  },
];
