import { Network } from '@mysten/sui.js';

export const COIN_TYPE = {
  [Network.DEVNET]: {
    SUI: '0x2::coin::Coin<0x2::sui::SUI>',
    BNB: '0x2::coin::Coin<0x94785845b39ec036fba4954a543a5f71c0860f35::coins::BNB>',
    ETH: '0x2::coin::Coin<0x94785845b39ec036fba4954a543a5f71c0860f35::coins::ETH>',
    BTC: '0x2::coin::Coin<0x94785845b39ec036fba4954a543a5f71c0860f35::coins::BTC>',
    USDT: '0x2::coin::Coin<0x94785845b39ec036fba4954a543a5f71c0860f35::coins::USDT>',
    USDC: '0x2::coin::Coin<0x94785845b39ec036fba4954a543a5f71c0860f35::coins::USDC>',
    DAI: '0x2::coin::Coin<0x94785845b39ec036fba4954a543a5f71c0860f35::coins::DAI>',
  },
};

export const COIN_TYPE_TO_NAME = {
  [Network.DEVNET]: {
    [COIN_TYPE[Network.DEVNET].BTC]: 'BTC',
    [COIN_TYPE[Network.DEVNET].ETH]: 'ETH',
    [COIN_TYPE[Network.DEVNET].BTC]: 'BNB',
    [COIN_TYPE[Network.DEVNET].USDT]: 'USDT',
    [COIN_TYPE[Network.DEVNET].USDC]: 'USDC',
    [COIN_TYPE[Network.DEVNET].DAI]: 'DAI',
    [COIN_TYPE[Network.DEVNET].SUI]: 'Sui',
  },
};

export const COIN_DECIMALS = {
  [Network.DEVNET]: {
    [COIN_TYPE[Network.DEVNET].BTC]: 0,
    [COIN_TYPE[Network.DEVNET].ETH]: 0,
    [COIN_TYPE[Network.DEVNET].BTC]: 0,
    [COIN_TYPE[Network.DEVNET].USDT]: 0,
    [COIN_TYPE[Network.DEVNET].USDC]: 0,
    [COIN_TYPE[Network.DEVNET].DAI]: 0,
    [COIN_TYPE[Network.DEVNET].SUI]: 9,
  },
};
