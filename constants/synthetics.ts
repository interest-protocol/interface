import { ethers } from 'ethers';
import { pathOr } from 'ramda';
import { FC } from 'react';

import { SVGProps } from '@/components/svg/svg.types';
import { CHAIN_ID, CONTRACTS, TOKEN_SYMBOL } from '@/sdk';
import {
  BinanceUSDSVG,
  EtherSVG,
  SynthAppleSVG,
  SynthBAYCSVG,
  SynthBitcoinSVG,
  SynthBRLSVG,
  SynthEthereumSVG,
  SynthGBPSVG,
  SynthJPYSVG,
  SynthTeslaSVG,
  SynthXAUSVG,
  UnknownCoinSVG,
} from '@/svg';
import { getBUSDAddress, getETHERC20Address } from '@/utils';

export enum SyntheticRequestActions {
  Deposit,
  Withdraw,
  Mint,
  Burn,
}

const SYNTHETIC_MARKETS = {
  [CHAIN_ID.BNB_TEST_NET]: {
    iBTC: ethers.utils.getAddress('0x73104FA347919b1D9E4A8daff0F70f0a8A2Cc7e9'),
    iETH: ethers.utils.getAddress('0x7fBB0fBAf6fa136687Bf19CcB2038258DAa329A2'),
    iXAU: ethers.utils.getAddress('0x203FE21B6E64988B0127BB120f235478b455c0FD'),
    iJPY: ethers.utils.getAddress('0xDB2C842cA9d54fECD4891530a91242f38A944c8e'),
    iGBP: ethers.utils.getAddress('0x390FB862dDb1D9342217626854D2aB5a58157F5A'),
    iBRL: ethers.utils.getAddress('0x523a7A48449F0Bf4Ae3204EDbb37788066683947'),
    iTSLA: ethers.utils.getAddress(
      '0x5470303350F5B2ed6c1FC814E6921f5aA135D2D7'
    ),
    iAPPL: ethers.utils.getAddress(
      '0xf3EF86417a8170ad92B2F9A89631141D046B433C'
    ),
    iBAYC: ethers.utils.getAddress(
      '0x4701aCa58DFDC7714fe6e6aC0a4a936F4E7d2FFd'
    ),
  },
  [CHAIN_ID.BNB_MAIN_NET]: {},
  [CHAIN_ID.UNSUPPORTED]: {},
  [CHAIN_ID.RINKEBY]: {},
};

export enum SyntheticOracleType {
  ChainLink,
  RedStoneConsumer,
  RedStonePriceAware,
}

export const REDSTONE_CORE_CONSUMER_DATA = {
  [CHAIN_ID.BNB_TEST_NET]: {
    dataServiceId: 'redstone-main-demo',
    uniqueSignersCount: 1,
    url: 'https://d33trozg86ya9x.cloudfront.net',
  },
  [CHAIN_ID.BNB_MAIN_NET]: {
    dataServiceId: 'redstone-main-demo',
    uniqueSignersCount: 1,
    url: 'https://d33trozg86ya9x.cloudfront.net',
  },
  [CHAIN_ID.UNSUPPORTED]: {
    dataServiceId: 'redstone-main-demo',
    uniqueSignersCount: 1,
    url: 'https://d33trozg86ya9x.cloudfront.net',
  },
  [CHAIN_ID.RINKEBY]: {
    dataServiceId: 'redstone-main-demo',
    uniqueSignersCount: 1,
    url: 'https://d33trozg86ya9x.cloudfront.net',
  },
};

export const SYNTHETICS_MARKET_PANEL_CALL_MAP = {
  [CHAIN_ID.BNB_MAIN_NET]: {},
  [CHAIN_ID.BNB_TEST_NET]: {
    [SYNTHETIC_MARKETS[CHAIN_ID.BNB_TEST_NET].iBAYC!]: {
      dataFeedId: '0x60cbe6b18347697f',
      oracleType: SyntheticOracleType.RedStonePriceAware,
      collateralAddress: getETHERC20Address(CHAIN_ID.BNB_TEST_NET),
    },
    [SYNTHETIC_MARKETS[CHAIN_ID.BNB_TEST_NET].iTSLA!]: {
      dataFeedId: 'TSLA',
      oracleType: SyntheticOracleType.RedStoneConsumer,
      collateralAddress: getBUSDAddress(CHAIN_ID.BNB_TEST_NET),
    },
    [SYNTHETIC_MARKETS[CHAIN_ID.BNB_TEST_NET].iAPPL!]: {
      dataFeedId: 'AAPL',
      oracleType: SyntheticOracleType.RedStoneConsumer,
      collateralAddress: getBUSDAddress(CHAIN_ID.BNB_TEST_NET),
    },
    [SYNTHETIC_MARKETS[CHAIN_ID.BNB_TEST_NET].iBTC!]: {
      dataFeedId: '',
      oracleType: SyntheticOracleType.ChainLink,
      collateralAddress: getBUSDAddress(CHAIN_ID.BNB_TEST_NET),
    },
    [SYNTHETIC_MARKETS[CHAIN_ID.BNB_TEST_NET].iETH!]: {
      dataFeedId: '',
      oracleType: SyntheticOracleType.ChainLink,
      collateralAddress: getBUSDAddress(CHAIN_ID.BNB_TEST_NET),
    },
    [SYNTHETIC_MARKETS[CHAIN_ID.BNB_TEST_NET].iXAU!]: {
      dataFeedId: '',
      oracleType: SyntheticOracleType.ChainLink,
      collateralAddress: getBUSDAddress(CHAIN_ID.BNB_TEST_NET),
    },
    [SYNTHETIC_MARKETS[CHAIN_ID.BNB_TEST_NET].iGBP!]: {
      dataFeedId: '',
      oracleType: SyntheticOracleType.ChainLink,
      collateralAddress: getBUSDAddress(CHAIN_ID.BNB_TEST_NET),
    },
    [SYNTHETIC_MARKETS[CHAIN_ID.BNB_TEST_NET].iJPY!]: {
      dataFeedId: '',
      oracleType: SyntheticOracleType.ChainLink,
      collateralAddress: getBUSDAddress(CHAIN_ID.BNB_TEST_NET),
    },
    [SYNTHETIC_MARKETS[CHAIN_ID.BNB_TEST_NET].iBRL!]: {
      dataFeedId: '',
      oracleType: SyntheticOracleType.ChainLink,
      collateralAddress: getBUSDAddress(CHAIN_ID.BNB_TEST_NET),
    },
  },
  [CHAIN_ID.RINKEBY]: {},
  [CHAIN_ID.UNSUPPORTED]: {},
};

export const SYNTHETICS_CALL_MAP = {
  [CHAIN_ID.BNB_TEST_NET]: {
    markets: [
      SYNTHETIC_MARKETS[CHAIN_ID.BNB_TEST_NET].iBAYC!,
      SYNTHETIC_MARKETS[CHAIN_ID.BNB_TEST_NET].iTSLA!,
      SYNTHETIC_MARKETS[CHAIN_ID.BNB_TEST_NET].iAPPL!,
      SYNTHETIC_MARKETS[CHAIN_ID.BNB_TEST_NET].iBTC!,
      SYNTHETIC_MARKETS[CHAIN_ID.BNB_TEST_NET].iETH!,
      SYNTHETIC_MARKETS[CHAIN_ID.BNB_TEST_NET].iXAU!,
      SYNTHETIC_MARKETS[CHAIN_ID.BNB_TEST_NET].iGBP!,
      SYNTHETIC_MARKETS[CHAIN_ID.BNB_TEST_NET].iJPY!,
      SYNTHETIC_MARKETS[CHAIN_ID.BNB_TEST_NET].iBRL!,
    ],
    marketTypes: [
      SyntheticOracleType.RedStonePriceAware,
      SyntheticOracleType.RedStoneConsumer,
      SyntheticOracleType.RedStoneConsumer,
      SyntheticOracleType.ChainLink,
      SyntheticOracleType.ChainLink,
      SyntheticOracleType.ChainLink,
      SyntheticOracleType.ChainLink,
      SyntheticOracleType.ChainLink,
      SyntheticOracleType.ChainLink,
    ],
    redStoneSymbols: [
      ethers.utils.formatBytes32String('TSLA'),
      ethers.utils.formatBytes32String('AAPL'),
    ],
    redStoneWrapper: {
      dataServiceId: 'redstone-main-demo',
      uniqueSignersCount: 1,
      dataFeeds: ['TSLA', 'AAPL'],
      url: 'https://d33trozg86ya9x.cloudfront.net',
    },
  },
  [CHAIN_ID.BNB_MAIN_NET]: {
    markets: [],
    marketTypes: [],
    redStoneSymbols: [],
    redStoneWrapper: {},
  },
  [CHAIN_ID.UNSUPPORTED]: {
    markets: [],
    marketTypes: [],
    redStoneSymbols: [],
    redStoneWrapper: {},
  },
  [CHAIN_ID.RINKEBY]: {
    markets: [],
    marketTypes: [],
    redStoneSymbols: [],
    redStoneWrapper: {},
  },
};

export const SYNTHETICS_RESPONSE_MAP = {
  [CHAIN_ID.BNB_TEST_NET]: [
    {
      marketAddress: SYNTHETIC_MARKETS[CHAIN_ID.BNB_TEST_NET].iBAYC!,
      syntheticAddress: CONTRACTS.iBAYC[CHAIN_ID.BNB_TEST_NET],
      symbol: TOKEN_SYMBOL.iBAYC,
      name: 'Interest Bored Ape Yatch Club',
      collateralDecimals: 18,
      oracleType: SyntheticOracleType.RedStonePriceAware,
      redStonePriceIndex: 0,
      collateralAddress: getETHERC20Address(CHAIN_ID.BNB_TEST_NET),
      dataFeedId: '0x60cbe6b18347697f',
    },
    {
      marketAddress: SYNTHETIC_MARKETS[CHAIN_ID.BNB_TEST_NET].iTSLA!,
      syntheticAddress: CONTRACTS.iTSLA[CHAIN_ID.BNB_TEST_NET],
      symbol: TOKEN_SYMBOL.iTSLA,
      name: 'Interest Tesla',
      collateralDecimals: 18,
      oracleType: SyntheticOracleType.RedStoneConsumer,
      redStonePriceIndex: 0,
      collateralAddress: getBUSDAddress(CHAIN_ID.BNB_TEST_NET),
      dataFeedId: '',
    },
    {
      marketAddress: SYNTHETIC_MARKETS[CHAIN_ID.BNB_TEST_NET].iAPPL!,
      syntheticAddress: CONTRACTS.iAAPL[CHAIN_ID.BNB_TEST_NET],
      symbol: TOKEN_SYMBOL.iAAPL,
      name: 'Interest Apple',
      collateralDecimals: 18,
      oracleType: SyntheticOracleType.RedStoneConsumer,
      redStonePriceIndex: 1,
      collateralAddress: getBUSDAddress(CHAIN_ID.BNB_TEST_NET),
      dataFeedId: '',
    },
    {
      marketAddress: SYNTHETIC_MARKETS[CHAIN_ID.BNB_TEST_NET].iBTC!,
      syntheticAddress: CONTRACTS.iBTC[CHAIN_ID.BNB_TEST_NET],
      symbol: TOKEN_SYMBOL.iBTC,
      name: 'Interest Bitcoin',
      collateralDecimals: 18,
      oracleType: SyntheticOracleType.ChainLink,
      redStonePriceIndex: 0,
      collateralAddress: getBUSDAddress(CHAIN_ID.BNB_TEST_NET),
      dataFeedId: '',
    },
    {
      marketAddress: SYNTHETIC_MARKETS[CHAIN_ID.BNB_TEST_NET].iETH!,
      syntheticAddress: CONTRACTS.iETH[CHAIN_ID.BNB_TEST_NET],
      symbol: TOKEN_SYMBOL.iETH,
      name: 'Interest Ether',
      collateralDecimals: 18,
      oracleType: SyntheticOracleType.ChainLink,
      redStonePriceIndex: 0,
      collateralAddress: getBUSDAddress(CHAIN_ID.BNB_TEST_NET),
      dataFeedId: '',
    },
    {
      marketAddress: SYNTHETIC_MARKETS[CHAIN_ID.BNB_TEST_NET].iXAU!,
      syntheticAddress: CONTRACTS.iXAU[CHAIN_ID.BNB_TEST_NET],
      symbol: TOKEN_SYMBOL.iXAU,
      name: 'Interest Gold',
      collateralDecimals: 18,
      oracleType: SyntheticOracleType.ChainLink,
      redStonePriceIndex: 0,
      collateralAddress: getBUSDAddress(CHAIN_ID.BNB_TEST_NET),
      dataFeedId: '',
    },
    {
      marketAddress: SYNTHETIC_MARKETS[CHAIN_ID.BNB_TEST_NET].iGBP!,
      syntheticAddress: CONTRACTS.iGBP[CHAIN_ID.BNB_TEST_NET],
      symbol: TOKEN_SYMBOL.iGBP,
      name: 'Interest Pound Sterling',
      collateralDecimals: 18,
      oracleType: SyntheticOracleType.ChainLink,
      redStonePriceIndex: 0,
      collateralAddress: getBUSDAddress(CHAIN_ID.BNB_TEST_NET),
      dataFeedId: '',
    },
    {
      marketAddress: SYNTHETIC_MARKETS[CHAIN_ID.BNB_TEST_NET].iJPY!,
      syntheticAddress: CONTRACTS.iJPY[CHAIN_ID.BNB_TEST_NET],
      symbol: TOKEN_SYMBOL.iJPY,
      name: 'Interest Japanese Yen',
      collateralDecimals: 18,
      oracleType: SyntheticOracleType.ChainLink,
      redStonePriceIndex: 0,
      collateralAddress: getBUSDAddress(CHAIN_ID.BNB_TEST_NET),
      dataFeedId: '',
    },
    {
      marketAddress: SYNTHETIC_MARKETS[CHAIN_ID.BNB_TEST_NET].iBRL!,
      syntheticAddress: CONTRACTS.iBRL[CHAIN_ID.BNB_TEST_NET],
      symbol: TOKEN_SYMBOL.iBRL,
      name: 'Interest Brazilian Real',
      collateralDecimals: 18,
      oracleType: SyntheticOracleType.ChainLink,
      redStonePriceIndex: 0,
      collateralAddress: getBUSDAddress(CHAIN_ID.BNB_TEST_NET),
      dataFeedId: '',
    },
  ],
  [CHAIN_ID.BNB_MAIN_NET]: [],
  [CHAIN_ID.UNSUPPORTED]: [],
  [CHAIN_ID.RINKEBY]: [],
};

const getBSCTestNetSyntheticsMarkets = () =>
  SYNTHETIC_MARKETS[CHAIN_ID.BNB_TEST_NET];

const SYNTHETICS_MARKET_SVG_MAP = {
  [CHAIN_ID.BNB_TEST_NET]: {
    [getBSCTestNetSyntheticsMarkets().iBTC!]: [
      { icon: SynthBitcoinSVG, highZIndex: false },
    ],
    [getBSCTestNetSyntheticsMarkets().iBRL!]: [
      { icon: SynthBRLSVG, highZIndex: false },
    ],
    [getBSCTestNetSyntheticsMarkets().iETH!]: [
      { icon: SynthEthereumSVG, highZIndex: false },
    ],
    [getBSCTestNetSyntheticsMarkets().iGBP!]: [
      { icon: SynthGBPSVG, highZIndex: false },
    ],
    [getBSCTestNetSyntheticsMarkets().iXAU!]: [
      { icon: SynthXAUSVG, highZIndex: false },
    ],
    [getBSCTestNetSyntheticsMarkets().iJPY!]: [
      { icon: SynthJPYSVG, highZIndex: false },
    ],
    [getBSCTestNetSyntheticsMarkets().iBAYC!]: [
      { icon: SynthBAYCSVG, highZIndex: false },
    ],
    [getBSCTestNetSyntheticsMarkets().iAPPL!]: [
      { icon: SynthAppleSVG, highZIndex: false },
    ],
    [getBSCTestNetSyntheticsMarkets().iTSLA!]: [
      { icon: SynthTeslaSVG, highZIndex: false },
    ],
  },
};

const SYNTHETICS_MARKET_COLLATERAL_SVG_MAP = {
  [CHAIN_ID.BNB_TEST_NET]: {
    [getBSCTestNetSyntheticsMarkets().iBTC!]: [
      { icon: BinanceUSDSVG, highZIndex: false },
    ],
    [getBSCTestNetSyntheticsMarkets().iBRL!]: [
      { icon: BinanceUSDSVG, highZIndex: false },
    ],
    [getBSCTestNetSyntheticsMarkets().iETH!]: [
      { icon: BinanceUSDSVG, highZIndex: false },
    ],
    [getBSCTestNetSyntheticsMarkets().iGBP!]: [
      { icon: BinanceUSDSVG, highZIndex: false },
    ],
    [getBSCTestNetSyntheticsMarkets().iXAU!]: [
      { icon: BinanceUSDSVG, highZIndex: false },
    ],
    [getBSCTestNetSyntheticsMarkets().iJPY!]: [
      { icon: BinanceUSDSVG, highZIndex: false },
    ],
    [getBSCTestNetSyntheticsMarkets().iBAYC!]: [
      { icon: EtherSVG, highZIndex: false },
    ],
    [getBSCTestNetSyntheticsMarkets().iAPPL!]: [
      { icon: BinanceUSDSVG, highZIndex: false },
    ],
    [getBSCTestNetSyntheticsMarkets().iTSLA!]: [
      { icon: BinanceUSDSVG, highZIndex: false },
    ],
  },
};

export const getSyntheticsMarketSVGByAddress = (
  chain: number,
  marketAddress: string,
  isCollateral = false
): ReadonlyArray<{
  SVG: FC<SVGProps>;
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
    isCollateral
      ? SYNTHETICS_MARKET_COLLATERAL_SVG_MAP
      : SYNTHETICS_MARKET_SVG_MAP
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

export const SYNTHETIC_PANEL_RESPONSE_MAP = {
  [CHAIN_ID.BNB_MAIN_NET]: {},
  [CHAIN_ID.BNB_TEST_NET]: {
    [getBSCTestNetSyntheticsMarkets().iBAYC!]: {
      syntSymbol: TOKEN_SYMBOL.iBAYC,
      syntName: 'Interest Bored Ape Yacht Club',
      collateralDecimals: 18,
      marketAddress: getBSCTestNetSyntheticsMarkets().iBAYC!,
      collateralAddress: getETHERC20Address(CHAIN_ID.BNB_TEST_NET),
      syntAddress: CONTRACTS.iBAYC[CHAIN_ID.BNB_TEST_NET],
      collateralName: 'Ether',
      collateralSymbol: TOKEN_SYMBOL.ETH,
      dataFeedId: '0x60cbe6b18347697f',
      oracleType: SyntheticOracleType.RedStonePriceAware,
    },
    [getBSCTestNetSyntheticsMarkets().iAPPL!]: {
      syntSymbol: TOKEN_SYMBOL.iAAPL,
      syntName: 'Interest Apple',
      collateralDecimals: 18,
      marketAddress: getBSCTestNetSyntheticsMarkets().iAPPL!,
      collateralAddress: getBUSDAddress(CHAIN_ID.BNB_TEST_NET),
      syntAddress: CONTRACTS.iAAPL[CHAIN_ID.BNB_TEST_NET],
      collateralName: 'BUSD Coin',
      collateralSymbol: TOKEN_SYMBOL.BUSD,
      dataFeedId: 'AAPL',
      oracleType: SyntheticOracleType.RedStoneConsumer,
    },
    [getBSCTestNetSyntheticsMarkets().iTSLA!]: {
      syntSymbol: TOKEN_SYMBOL.iTSLA,
      syntName: 'Interest Tesla',
      collateralDecimals: 18,
      marketAddress: getBSCTestNetSyntheticsMarkets().iTSLA!,
      collateralAddress: getBUSDAddress(CHAIN_ID.BNB_TEST_NET),
      syntAddress: CONTRACTS.iTSLA[CHAIN_ID.BNB_TEST_NET],
      collateralName: 'BUSD Coin',
      collateralSymbol: TOKEN_SYMBOL.BUSD,
      dataFeedId: 'TSLA',
      oracleType: SyntheticOracleType.RedStoneConsumer,
    },
    [getBSCTestNetSyntheticsMarkets().iBTC!]: {
      syntSymbol: TOKEN_SYMBOL.iBTC,
      syntName: 'Interest Bitcoin',
      collateralDecimals: 18,
      marketAddress: getBSCTestNetSyntheticsMarkets().iBTC!,
      collateralAddress: getBUSDAddress(CHAIN_ID.BNB_TEST_NET),
      syntAddress: CONTRACTS.iBTC[CHAIN_ID.BNB_TEST_NET],
      collateralName: 'BUSD Token',
      collateralSymbol: TOKEN_SYMBOL.BUSD,
      dataFeedId: '',
      oracleType: SyntheticOracleType.ChainLink,
    },
    [getBSCTestNetSyntheticsMarkets().iBRL!]: {
      syntSymbol: TOKEN_SYMBOL.iBRL,
      syntName: 'Interest Brazilian Real',
      collateralDecimals: 18,
      marketAddress: getBSCTestNetSyntheticsMarkets().iBRL!,
      collateralAddress: getBUSDAddress(CHAIN_ID.BNB_TEST_NET),
      syntAddress: CONTRACTS.iBRL[CHAIN_ID.BNB_TEST_NET],
      collateralName: 'BUSD Token',
      collateralSymbol: TOKEN_SYMBOL.BUSD,
      dataFeedId: '',
      oracleType: SyntheticOracleType.ChainLink,
    },
    [getBSCTestNetSyntheticsMarkets().iETH!]: {
      syntSymbol: TOKEN_SYMBOL.iETH,
      syntName: 'Interest Ether',
      collateralDecimals: 18,
      marketAddress: getBSCTestNetSyntheticsMarkets().iETH!,
      collateralAddress: getBUSDAddress(CHAIN_ID.BNB_TEST_NET),
      syntAddress: CONTRACTS.iETH[CHAIN_ID.BNB_TEST_NET],
      collateralName: 'BUSD Token',
      collateralSymbol: TOKEN_SYMBOL.BUSD,
      dataFeedId: '',
      oracleType: SyntheticOracleType.ChainLink,
    },
    [getBSCTestNetSyntheticsMarkets().iGBP!]: {
      syntSymbol: TOKEN_SYMBOL.iGBP,
      syntName: 'Interest Pound Sterling',
      collateralDecimals: 18,
      marketAddress: getBSCTestNetSyntheticsMarkets().iGBP!,
      collateralAddress: getBUSDAddress(CHAIN_ID.BNB_TEST_NET),
      syntAddress: CONTRACTS.iGBP[CHAIN_ID.BNB_TEST_NET],
      collateralName: 'BUSD Token',
      collateralSymbol: TOKEN_SYMBOL.BUSD,
      dataFeedId: '',
      oracleType: SyntheticOracleType.ChainLink,
    },
    [getBSCTestNetSyntheticsMarkets().iXAU!]: {
      syntSymbol: TOKEN_SYMBOL.iXAU,
      syntName: 'Interest Gold',
      collateralDecimals: 18,
      marketAddress: getBSCTestNetSyntheticsMarkets().iXAU!,
      collateralAddress: getBUSDAddress(CHAIN_ID.BNB_TEST_NET),
      syntAddress: CONTRACTS.iXAU[CHAIN_ID.BNB_TEST_NET],
      collateralName: 'BUSD Token',
      collateralSymbol: TOKEN_SYMBOL.BUSD,
      dataFeedId: '',
      oracleType: SyntheticOracleType.ChainLink,
    },
    [getBSCTestNetSyntheticsMarkets().iJPY!]: {
      syntSymbol: TOKEN_SYMBOL.iJPY,
      syntName: 'Interest Japanese Yen',
      collateralDecimals: 18,
      marketAddress: getBSCTestNetSyntheticsMarkets().iJPY!,
      collateralAddress: getBUSDAddress(CHAIN_ID.BNB_TEST_NET),
      syntAddress: CONTRACTS.iJPY[CHAIN_ID.BNB_TEST_NET],
      collateralName: 'BUSD Token',
      collateralSymbol: TOKEN_SYMBOL.BUSD,
      dataFeedId: '',
      oracleType: SyntheticOracleType.ChainLink,
    },
  },
  [CHAIN_ID.UNSUPPORTED]: {},
  [CHAIN_ID.RINKEBY]: {},
};
