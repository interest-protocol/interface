import { CHAIN_ID, CONTRACTS, TOKEN_SYMBOL } from '@/sdk';

const SYNTHETIC_MARKETS = {
  [CHAIN_ID.BNB_TEST_NET]: {
    iBTC: '0x73104FA347919b1D9E4A8daff0F70f0a8A2Cc7e9',
    iETH: '0x7fBB0fBAf6fa136687Bf19CcB2038258DAa329A2',
    iXAU: '0x203FE21B6E64988B0127BB120f235478b455c0FD',
    iJPY: '0xDB2C842cA9d54fECD4891530a91242f38A944c8e',
    iGBP: '0x390FB862dDb1D9342217626854D2aB5a58157F5A',
    iBRL: '0x523a7A48449F0Bf4Ae3204EDbb37788066683947',
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
