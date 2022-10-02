import { ethers } from 'ethers';
import { pathOr } from 'ramda';
import { FC, SVGAttributes } from 'react';

import { CHAIN_ID, TOKEN_SYMBOL } from '@/sdk';
import { BitcoinSVG, BNBSVG, EtherSVG, TetherSVG, UnknownCoinSVG } from '@/svg';
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
      '0x4591e17429509FE55494e4290DB65808951945D2'
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

const DINERO_MARKET_SVG_MAP = {
  [CHAIN_ID.BNB_TEST_NET]: {
    [getBSCTestNetDineroMarkets().BTC]: [
      { icon: BitcoinSVG, highZIndex: false },
    ],
    [getBSCTestNetDineroMarkets().ETH]: [{ icon: EtherSVG, highZIndex: false }],
    [getBSCTestNetDineroMarkets().NATIVE_TOKEN]: [
      { icon: BNBSVG, highZIndex: false },
    ],
    [getBSCTestNetDineroMarkets().USDT_WBNB_VOLATILE]: [
      { icon: TetherSVG, highZIndex: true },
      { icon: BNBSVG, highZIndex: false },
    ],
  },
};

export const getDineroMarketSVGByAddress = (
  chain: number,
  marketAddress: string
): ReadonlyArray<{
  SVG: FC<SVGAttributes<SVGSVGElement>>;
  highZIndex: boolean;
}> => {
  const data = pathOr(
    [
      {
        icon: UnknownCoinSVG,
        highZIndex: false,
      },
    ],
    [chain.toString(), ethers.utils.getAddress(marketAddress)],
    DINERO_MARKET_SVG_MAP
  );

  // 1 Token
  if (data.length === 1)
    return [
      {
        SVG: data[0].icon,
        highZIndex: data[0].highZIndex,
      },
    ];

  return [
    {
      SVG: data[0].icon,
      highZIndex: data[0].highZIndex,
    },
    {
      SVG: data[1].icon,
      highZIndex: data[1].highZIndex,
    },
  ];
};
