import { ethers } from 'ethers';

import { CHAIN_ID, TOKEN_SYMBOL } from '@/sdk';
import { getBTCAddress, getETHERC20Address } from '@/utils';

import { WRAPPED_NATIVE_TOKEN } from './dex';

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
      '0x3A9A2dAAaAa2d73F127e615D5859a5104b0c340B'
    ),
  },
};

const getBSCTestNetDineroMarkets = () =>
  DINERO_MARKETS_MAP[CHAIN_ID.BNB_TEST_NET];

export enum DineroMarketKind {
  Native,
  ERC20,
  LpFreeMarket,
}

export const DINERO_MARKET_SUMMARY_CALL_MAP = {
  [CHAIN_ID.BNB_TEST_NET]: {
    nativeMarket: getBSCTestNetDineroMarkets().NATIVE_TOKEN,
    erc20Markets: [
      getBSCTestNetDineroMarkets().BTC,
      getBSCTestNetDineroMarkets().ETH,
    ],
    lpFreeMarkets: [getBSCTestNetDineroMarkets().USDT_WBNB_VOLATILE],
  },
};

export const DINERO_MARKET_DATA_CALL_MAP = {
  [CHAIN_ID.BNB_TEST_NET]: {
    [DINERO_MARKETS_MAP[CHAIN_ID.BNB_TEST_NET].BTC]: {
      kind: DineroMarketKind.ERC20,
      baseToken: ethers.constants.AddressZero,
    },
    [DINERO_MARKETS_MAP[CHAIN_ID.BNB_TEST_NET].ETH]: {
      kind: DineroMarketKind.ERC20,
      baseToken: ethers.constants.AddressZero,
    },
    [DINERO_MARKETS_MAP[CHAIN_ID.BNB_TEST_NET].NATIVE_TOKEN]: {
      kind: DineroMarketKind.Native,
      baseToken: ethers.constants.AddressZero,
    },
    [DINERO_MARKETS_MAP[CHAIN_ID.BNB_TEST_NET].USDT_WBNB_VOLATILE]: {
      kind: DineroMarketKind.LpFreeMarket,
      baseToken: WRAPPED_NATIVE_TOKEN[CHAIN_ID.BNB_TEST_NET].address,
    },
  },
};

export const DINERO_MARKET_METADATA = {
  [CHAIN_ID.BNB_TEST_NET]: {
    [getBSCTestNetDineroMarkets().BTC]: {
      kind: DineroMarketKind.ERC20,
      symbol0: TOKEN_SYMBOL.BTC,
      symbol1: TOKEN_SYMBOL.Unknown,
      name: 'Bitcoin',
      stable: false,
      collateralDecimals: 18,
      collateralAddress: getBTCAddress(CHAIN_ID.BNB_TEST_NET),
    },
    [getBSCTestNetDineroMarkets().ETH]: {
      kind: DineroMarketKind.ERC20,
      symbol0: TOKEN_SYMBOL.ETH,
      symbol1: TOKEN_SYMBOL.Unknown,
      name: 'Ether',
      stable: false,
      collateralDecimals: 18,
      collateralAddress: getETHERC20Address(CHAIN_ID.BNB_TEST_NET),
    },
    [getBSCTestNetDineroMarkets().NATIVE_TOKEN]: {
      kind: DineroMarketKind.Native,
      symbol0: TOKEN_SYMBOL.BNB,
      symbol1: TOKEN_SYMBOL.Unknown,
      name: 'BNB',
      stable: false,
      collateralDecimals: 18,
      collateralAddress: ethers.constants.AddressZero,
    },
    [getBSCTestNetDineroMarkets().USDT_WBNB_VOLATILE]: {
      kind: DineroMarketKind.LpFreeMarket,
      symbol0: TOKEN_SYMBOL.BNB,
      symbol1: TOKEN_SYMBOL.USDT,
      name: 'BNB-USDT',
      stable: false,
      collateralDecimals: 18,
      collateralAddress: ethers.utils.getAddress(
        '0xb8AF44a4eD047F6137aC148b0D1197913222993d'
      ),
    },
  },
};
