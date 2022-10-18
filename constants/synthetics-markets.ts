import { ethers } from 'ethers';
import { pathOr } from 'ramda';
import { FC, SVGAttributes } from 'react';

import { CHAIN_ID } from '@/sdk';
import {
  SynthBitcoinSVG,
  SynthBRLSVG,
  SynthEthereumSVG,
  SynthGBPSVG,
  SynthJPYSVG,
  SynthXAUSVG,
  UnknownCoinSVG,
} from '@/svg';

/**
 * @description These are the market contracts and not the collateral contracts.
 */
const SYNTHETICS_MARKETS_MAP = {
  [CHAIN_ID.BNB_TEST_NET]: {
    BTCMarket: ethers.utils.getAddress(
      '0x73104FA347919b1D9E4A8daff0F70f0a8A2Cc7e9'
    ),
    BRLMarket: ethers.utils.getAddress(
      '0x523a7A48449F0Bf4Ae3204EDbb37788066683947'
    ),
    EtherMarket: ethers.utils.getAddress(
      '0x7fBB0fBAf6fa136687Bf19CcB2038258DAa329A2'
    ),
    GBPMarket: ethers.utils.getAddress(
      '0x390FB862dDb1D9342217626854D2aB5a58157F5A'
    ),
    XAUMarket: ethers.utils.getAddress(
      '0x203FE21B6E64988B0127BB120f235478b455c0FD'
    ),
    YENMarket: ethers.utils.getAddress(
      '0xDB2C842cA9d54fECD4891530a91242f38A944c8e'
    ),
    // TODO: replace fake addresses
    // sAUD: ethers.utils.getAddress('sAUD'),
    // sCHF: ethers.utils.getAddress('sCHF'),
    // sEUR: ethers.utils.getAddress('sEUR'),
  },
};

const getBSCTestNetSyntheticsMarkets = () =>
  SYNTHETICS_MARKETS_MAP[CHAIN_ID.BNB_TEST_NET];

const SYNTHETICS_MARKET_SVG_MAP = {
  [CHAIN_ID.BNB_TEST_NET]: {
    [getBSCTestNetSyntheticsMarkets().BTCMarket]: [
      { icon: SynthBitcoinSVG, highZIndex: false },
    ],
    [getBSCTestNetSyntheticsMarkets().BRLMarket]: [
      { icon: SynthBRLSVG, highZIndex: false },
    ],
    [getBSCTestNetSyntheticsMarkets().EtherMarket]: [
      { icon: SynthEthereumSVG, highZIndex: false },
    ],
    [getBSCTestNetSyntheticsMarkets().GBPMarket]: [
      { icon: SynthGBPSVG, highZIndex: false },
    ],
    [getBSCTestNetSyntheticsMarkets().XAUMarket]: [
      { icon: SynthXAUSVG, highZIndex: false },
    ],
    [getBSCTestNetSyntheticsMarkets().YENMarket]: [
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
