import { ethers } from 'ethers';

import { CHAIN_ID, TOKEN_SYMBOL } from '@/sdk';

/**
 * @description These are the market contracts and not the collateral contracts.
 */
const DINERO_MARKETS_MAP = {
  [CHAIN_ID.BNB_TEST_NET]: {
    BTC: ethers.utils.getAddress('0x671DaAD30D4cf0adFA73eE70B2F2d9F38b3714e8'),
    NATIVE_TOKEN: ethers.utils.getAddress(
      '0xEF8704168B5028F1d200426ba558365cDd1B3FfB'
    ),
    ETH: ethers.utils.getAddress('0x7e257F4930435E63538E50451bAE5D3495f12486'),
    USDT_WBNB_VOLATILE: ethers.utils.getAddress(
      '0x0e8F6F6A467f8E0A1F2013bDd66B68e902ab2b9A'
    ),
  },
};

const getBSCTestNetDineroMarkets = () =>
  DINERO_MARKETS_MAP[CHAIN_ID.BNB_TEST_NET];

export const DINERO_MARKET_CALL_MAP = {
  [CHAIN_ID.BNB_TEST_NET]: {
    nativeMarket: getBSCTestNetDineroMarkets().NATIVE_TOKEN,
    erc20Markets: [
      getBSCTestNetDineroMarkets().BTC,
      getBSCTestNetDineroMarkets().ETH,
    ],
    lpFreeMarkets: [getBSCTestNetDineroMarkets().USDT_WBNB_VOLATILE],
  },
};

export const DINERO_MARKET_METADATA = {
  [CHAIN_ID.BNB_TEST_NET]: {
    [getBSCTestNetDineroMarkets().BTC]: {
      isPair: false,
      symbol0: TOKEN_SYMBOL.BTC,
      symbol1: TOKEN_SYMBOL.Unknown,
      name: 'Bitcoin',
      stable: false,
      collateralDecimals: 18,
    },
    [getBSCTestNetDineroMarkets().ETH]: {
      isPair: false,
      symbol0: TOKEN_SYMBOL.ETH,
      symbol1: TOKEN_SYMBOL.Unknown,
      name: 'Ether',
      stable: false,
      collateralDecimals: 18,
    },
    [getBSCTestNetDineroMarkets().NATIVE_TOKEN]: {
      isPair: false,
      symbol0: TOKEN_SYMBOL.BNB,
      symbol1: TOKEN_SYMBOL.Unknown,
      name: 'BNB',
      stable: false,
      collateralDecimals: 18,
    },
    [getBSCTestNetDineroMarkets().USDT_WBNB_VOLATILE]: {
      isPair: true,
      symbol0: TOKEN_SYMBOL.BNB,
      symbol1: TOKEN_SYMBOL.USDT,
      name: 'BNB-USDT',
      stable: false,
      collateralDecimals: 18,
    },
  },
};
