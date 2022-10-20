import { ethers } from 'ethers';
import { pathOr } from 'ramda';
import { FC, SVGAttributes } from 'react';

import { CHAIN_ID, CONTRACTS, TOKEN_SYMBOL } from '@/sdk';
import {
  SynthBitcoinSVG,
  SynthBRLSVG,
  SynthEthereumSVG,
  SynthGBPSVG,
  SynthJPYSVG,
  SynthXAUSVG,
  UnknownCoinSVG,
} from '@/svg';
import { getBUSDAddress } from '@/utils';

const SYNTHETIC_MARKETS = {
  [CHAIN_ID.BNB_TEST_NET]: {
    iBTC: ethers.utils.getAddress('0x73104FA347919b1D9E4A8daff0F70f0a8A2Cc7e9'),
    iETH: ethers.utils.getAddress('0x7fBB0fBAf6fa136687Bf19CcB2038258DAa329A2'),
    iXAU: ethers.utils.getAddress('0x203FE21B6E64988B0127BB120f235478b455c0FD'),
    iJPY: ethers.utils.getAddress('0xDB2C842cA9d54fECD4891530a91242f38A944c8e'),
    iGBP: ethers.utils.getAddress('0x390FB862dDb1D9342217626854D2aB5a58157F5A'),
    iBRL: ethers.utils.getAddress('0x523a7A48449F0Bf4Ae3204EDbb37788066683947'),
  },
  [CHAIN_ID.BNB_MAIN_NET]: {},
  [CHAIN_ID.UNSUPPORTED]: {},
  [CHAIN_ID.RINKEBY]: {},
};

export const SYNTHETICS_CALL_MAP = {
  [CHAIN_ID.BNB_TEST_NET]: [
    SYNTHETIC_MARKETS[CHAIN_ID.BNB_TEST_NET].iBTC,
    SYNTHETIC_MARKETS[CHAIN_ID.BNB_TEST_NET].iETH,
    SYNTHETIC_MARKETS[CHAIN_ID.BNB_TEST_NET].iXAU,
    SYNTHETIC_MARKETS[CHAIN_ID.BNB_TEST_NET].iGBP,
    SYNTHETIC_MARKETS[CHAIN_ID.BNB_TEST_NET].iJPY,
    SYNTHETIC_MARKETS[CHAIN_ID.BNB_TEST_NET].iBRL,
  ],
  [CHAIN_ID.BNB_MAIN_NET]: [],
  [CHAIN_ID.UNSUPPORTED]: [],
  [CHAIN_ID.RINKEBY]: [],
};

export const SYNTHETICS_RESPONSE_MAP = {
  [CHAIN_ID.BNB_TEST_NET]: [
    {
      marketAddress: SYNTHETIC_MARKETS[CHAIN_ID.BNB_TEST_NET].iBTC!,
      syntheticAddress: CONTRACTS.iBTC[CHAIN_ID.BNB_TEST_NET],
      symbol: TOKEN_SYMBOL.iBTC,
      name: 'Interest Bitcoin',
    },
    {
      marketAddress: SYNTHETIC_MARKETS[CHAIN_ID.BNB_TEST_NET].iETH!,
      syntheticAddress: CONTRACTS.iETH[CHAIN_ID.BNB_TEST_NET],
      symbol: TOKEN_SYMBOL.iETH,
      name: 'Interest Ether',
    },
    {
      marketAddress: SYNTHETIC_MARKETS[CHAIN_ID.BNB_TEST_NET].iXAU!,
      syntheticAddress: CONTRACTS.iXAU[CHAIN_ID.BNB_TEST_NET],
      symbol: TOKEN_SYMBOL.iXAU,
      name: 'Interest Gold',
    },
    {
      marketAddress: SYNTHETIC_MARKETS[CHAIN_ID.BNB_TEST_NET].iGBP!,
      syntheticAddress: CONTRACTS.iGBP[CHAIN_ID.BNB_TEST_NET],
      symbol: TOKEN_SYMBOL.iGBP,
      name: 'Interest Pound Sterling',
    },
    {
      marketAddress: SYNTHETIC_MARKETS[CHAIN_ID.BNB_TEST_NET].iJPY!,
      syntheticAddress: CONTRACTS.iJPY[CHAIN_ID.BNB_TEST_NET],
      symbol: TOKEN_SYMBOL.iJPY,
      name: 'Interest Japanese Yen',
    },
    {
      marketAddress: SYNTHETIC_MARKETS[CHAIN_ID.BNB_TEST_NET].iBRL!,
      syntheticAddress: CONTRACTS.iBRL[CHAIN_ID.BNB_TEST_NET],
      symbol: TOKEN_SYMBOL.iBRL,
      name: 'Interest Brazilian Real',
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
  },
};

export const getSyntheticsMarketSVGByAddress = (
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
    SYNTHETICS_MARKET_SVG_MAP
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
    [getBSCTestNetSyntheticsMarkets().iBTC!]: {
      symbol: TOKEN_SYMBOL.iBTC,
      name: 'Interest Bitcoin',
      collateralDecimals: 18,
      marketAddress: getBSCTestNetSyntheticsMarkets().iBTC!,
      collateralAddress: getBUSDAddress(CHAIN_ID.BNB_TEST_NET),
      syntAddress: CONTRACTS.iBTC[CHAIN_ID.BNB_TEST_NET],
    },
    [getBSCTestNetSyntheticsMarkets().iBRL!]: {
      symbol: TOKEN_SYMBOL.iBRL,
      name: 'Interest Brazilian Real',
      collateralDecimals: 18,
      marketAddress: getBSCTestNetSyntheticsMarkets().iBRL!,
      collateralAddress: getBUSDAddress(CHAIN_ID.BNB_TEST_NET),
      syntAddress: CONTRACTS.iBRL[CHAIN_ID.BNB_TEST_NET],
    },
    [getBSCTestNetSyntheticsMarkets().iETH!]: {
      symbol: TOKEN_SYMBOL.iETH,
      name: 'Interest Ether',
      collateralDecimals: 18,
      marketAddress: getBSCTestNetSyntheticsMarkets().iETH!,
      collateralAddress: getBUSDAddress(CHAIN_ID.BNB_TEST_NET),
      syntAddress: CONTRACTS.iETH[CHAIN_ID.BNB_TEST_NET],
    },
    [getBSCTestNetSyntheticsMarkets().iGBP!]: {
      symbol: TOKEN_SYMBOL.iGBP,
      name: 'Interest Pound Sterling',
      collateralDecimals: 18,
      marketAddress: getBSCTestNetSyntheticsMarkets().iGBP!,
      collateralAddress: getBUSDAddress(CHAIN_ID.BNB_TEST_NET),
      syntAddress: CONTRACTS.iGBP[CHAIN_ID.BNB_TEST_NET],
    },
    [getBSCTestNetSyntheticsMarkets().iXAU!]: {
      symbol: TOKEN_SYMBOL.iXAU,
      name: 'Interest Gold',
      collateralDecimals: 18,
      marketAddress: getBSCTestNetSyntheticsMarkets().iXAU!,
      collateralAddress: getBUSDAddress(CHAIN_ID.BNB_TEST_NET),
      syntAddress: CONTRACTS.iXAU[CHAIN_ID.BNB_TEST_NET],
    },
    [getBSCTestNetSyntheticsMarkets().iJPY!]: {
      symbol: TOKEN_SYMBOL.iJPY,
      name: 'Interest Japanese Yen',
      collateralDecimals: 18,
      marketAddress: getBSCTestNetSyntheticsMarkets().iJPY!,
      collateralAddress: getBUSDAddress(CHAIN_ID.BNB_TEST_NET),
      syntAddress: CONTRACTS.iJPY[CHAIN_ID.BNB_TEST_NET],
    },
  },
  [CHAIN_ID.UNSUPPORTED]: {},
  [CHAIN_ID.RINKEBY]: {},
};
