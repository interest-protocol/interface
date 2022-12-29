import { ethers } from 'ethers';
import { FC } from 'react';

import { SVGProps } from '@/components/svg/svg.types';
import { CHAIN_ID, CONTRACTS, NativeCurrency, TOKEN_SYMBOL } from '@/sdk';
import { ERC20 } from '@/sdk/entities/erc-20';
import {
  ApeCoinSVG,
  BinanceUSDSVG,
  BitcoinSVG,
  BNBSVG,
  ChainLinkSVG,
  DAISVG,
  DineroSVG,
  EtherSVG,
  FraxSVG,
  InterestTokenSVG,
  ManaSVG,
  PaxDollarSVG,
  ShibaInuSVG,
  TetherSVG,
  TrueUSDSVG,
  UniSwapSVG,
  UnknownCoinSVG,
  USDCoinSVG,
  USDDSVG,
  VaiSVG,
  WBNBCoinSVG,
} from '@/svg';

export const TOKENS_SVG_MAP = {
  [CHAIN_ID.BNB_TEST_NET]: {
    default: UnknownCoinSVG,
    [CONTRACTS.ERC20_ETH[CHAIN_ID.BNB_TEST_NET]]: EtherSVG,
    [CONTRACTS.BUSD[CHAIN_ID.BNB_TEST_NET]]: BinanceUSDSVG,
    [CONTRACTS.DAI[CHAIN_ID.BNB_TEST_NET]]: DAISVG,
    [CONTRACTS.FRAX[CHAIN_ID.BNB_TEST_NET]]: FraxSVG,
    [CONTRACTS.TUSD[CHAIN_ID.BNB_TEST_NET]]: TrueUSDSVG,
    [CONTRACTS.USDD[CHAIN_ID.BNB_TEST_NET]]: USDDSVG,
    [CONTRACTS.USDP[CHAIN_ID.BNB_TEST_NET]]: PaxDollarSVG,
    [CONTRACTS.VAI[CHAIN_ID.BNB_TEST_NET]]: VaiSVG,
    [CONTRACTS.DNR[CHAIN_ID.BNB_TEST_NET]]: DineroSVG,
    [CONTRACTS.USDT[CHAIN_ID.BNB_TEST_NET]]: TetherSVG,
    [CONTRACTS.BTC[CHAIN_ID.BNB_TEST_NET]]: BitcoinSVG,
    [CONTRACTS.USDC[CHAIN_ID.BNB_TEST_NET]]: USDCoinSVG,
    [CONTRACTS.UNI[CHAIN_ID.BNB_TEST_NET]]: UniSwapSVG,
    [CONTRACTS.APE[CHAIN_ID.BNB_TEST_NET]]: ApeCoinSVG,
    [CONTRACTS.MANA[CHAIN_ID.BNB_TEST_NET]]: ManaSVG,
    [CONTRACTS.LINK[CHAIN_ID.BNB_TEST_NET]]: ChainLinkSVG,
    [CONTRACTS.SHIB[CHAIN_ID.BNB_TEST_NET]]: ShibaInuSVG,
    [CONTRACTS.INT[CHAIN_ID.BNB_TEST_NET]]: InterestTokenSVG,
    [CONTRACTS.WETH[CHAIN_ID.BNB_TEST_NET]]: WBNBCoinSVG,
    [ethers.constants.AddressZero]: BNBSVG,
  },
  [CHAIN_ID.RINKEBY]: {
    default: UnknownCoinSVG,
    [CONTRACTS.WETH[CHAIN_ID.RINKEBY]]: EtherSVG,
    [CONTRACTS.BUSD[CHAIN_ID.RINKEBY]]: BinanceUSDSVG,
    [CONTRACTS.DAI[CHAIN_ID.RINKEBY]]: DAISVG,
    [CONTRACTS.FRAX[CHAIN_ID.RINKEBY]]: FraxSVG,
    [CONTRACTS.TUSD[CHAIN_ID.RINKEBY]]: TrueUSDSVG,
    [CONTRACTS.USDD[CHAIN_ID.RINKEBY]]: USDDSVG,
    [CONTRACTS.USDP[CHAIN_ID.RINKEBY]]: PaxDollarSVG,
    [CONTRACTS.VAI[CHAIN_ID.RINKEBY]]: VaiSVG,
    [CONTRACTS.DNR[CHAIN_ID.RINKEBY]]: DineroSVG,
    [CONTRACTS.USDT[CHAIN_ID.RINKEBY]]: TetherSVG,
    [CONTRACTS.BTC[CHAIN_ID.RINKEBY]]: BitcoinSVG,
    [CONTRACTS.USDC[CHAIN_ID.RINKEBY]]: USDCoinSVG,
    [CONTRACTS.UNI[CHAIN_ID.RINKEBY]]: UniSwapSVG,
    [CONTRACTS.APE[CHAIN_ID.RINKEBY]]: ApeCoinSVG,
    [CONTRACTS.MANA[CHAIN_ID.RINKEBY]]: ManaSVG,
    [CONTRACTS.LINK[CHAIN_ID.RINKEBY]]: ChainLinkSVG,
    [CONTRACTS.SHIB[CHAIN_ID.RINKEBY]]: ShibaInuSVG,
    [CONTRACTS.INT[CHAIN_ID.RINKEBY]]: InterestTokenSVG,
    [ethers.constants.AddressZero]: EtherSVG,
  },
} as {
  [chain: number]: {
    [address: string]: FC<SVGProps>;
  };
};

export const NATIVE_TOKENS = {
  [CHAIN_ID.RINKEBY]: NativeCurrency.from(
    'Ether',
    TOKEN_SYMBOL.ETH,
    18,
    CHAIN_ID.RINKEBY
  ),
  [CHAIN_ID.BNB_TEST_NET]: NativeCurrency.from(
    'Binance Coin',
    TOKEN_SYMBOL.BNB,
    18,
    CHAIN_ID.BNB_TEST_NET
  ),
};

export const UNKNOWN_ERC_20 = ERC20.from(ethers.constants.AddressZero, 0);

export const STABLE_COIN_ADDRESSES = {
  [CHAIN_ID.BNB_TEST_NET]: [
    ethers.utils.getAddress(CONTRACTS.DNR[CHAIN_ID.BNB_TEST_NET]),
    ethers.utils.getAddress(CONTRACTS.USDC[CHAIN_ID.BNB_TEST_NET]),
    ethers.utils.getAddress(CONTRACTS.USDT[CHAIN_ID.BNB_TEST_NET]),
  ],
  [CHAIN_ID.BNB_MAIN_NET]: [
    ethers.utils.getAddress(CONTRACTS.BUSD[CHAIN_ID.BNB_MAIN_NET]),
    ethers.utils.getAddress(CONTRACTS.DAI[CHAIN_ID.BNB_MAIN_NET]),
    ethers.utils.getAddress(CONTRACTS.FRAX[CHAIN_ID.BNB_MAIN_NET]),
    ethers.utils.getAddress(CONTRACTS.TUSD[CHAIN_ID.BNB_MAIN_NET]),
    ethers.utils.getAddress(CONTRACTS.USDC[CHAIN_ID.BNB_MAIN_NET]),
    ethers.utils.getAddress(CONTRACTS.USDD[CHAIN_ID.BNB_MAIN_NET]),
    ethers.utils.getAddress(CONTRACTS.USDP[CHAIN_ID.BNB_MAIN_NET]),
    ethers.utils.getAddress(CONTRACTS.USDT[CHAIN_ID.BNB_MAIN_NET]),
    ethers.utils.getAddress(CONTRACTS.VAI[CHAIN_ID.BNB_MAIN_NET]),
  ],
  [CHAIN_ID.RINKEBY]: [],
};

export const IS_STABLE_COIN_MAP = {
  [CHAIN_ID.BNB_TEST_NET]: {},
  [CHAIN_ID.BNB_MAIN_NET]: {},
  [CHAIN_ID.UNSUPPORTED]: {},
  [CHAIN_ID.RINKEBY]: {},
};
