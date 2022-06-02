import { ethers } from 'ethers';
import { FC, SVGAttributes } from 'react';

import { CHAIN_ID, TOKEN_SYMBOL } from '@/sdk/constants';
import { ERC20 } from '@/sdk/entities/erc-20';
import {
  ApeCoinSVG,
  BitcoinSVG,
  ChainLinkSVG,
  DineroSVG,
  EtherSVG,
  InterestTokenSVG,
  ManaSVG,
  ShibaInuSVG,
  TetherSVG,
  UniSwapSVG,
  UnknownCoinSVG,
  USDCoinSVG,
} from '@/svg';
import { getBTCAddress, getDNRAddress, getIntAddress } from '@/utils/contracts';

export const FAUCET_TOKENS = [
  {
    symbol: TOKEN_SYMBOL.BTC,
    address: getBTCAddress(CHAIN_ID.BNB_TEST_NET),
  },
  {
    symbol: TOKEN_SYMBOL.DNR,
    address: getDNRAddress(CHAIN_ID.BNB_TEST_NET),
  },
];

export const ETH_FAUCET_TOKENS = [
  {
    symbol: TOKEN_SYMBOL.BTC,
    address: getBTCAddress(CHAIN_ID.RINKEBY),
  },
  {
    symbol: TOKEN_SYMBOL.ETH,
    address: getDNRAddress(CHAIN_ID.RINKEBY),
  },
  {
    symbol: TOKEN_SYMBOL.USDT,
    address: getBTCAddress(CHAIN_ID.RINKEBY),
  },
  {
    symbol: TOKEN_SYMBOL.USDC,
    address: getDNRAddress(CHAIN_ID.RINKEBY),
  },
];

export const TOKENS_SVG_MAP = {
  [TOKEN_SYMBOL.ETH]: EtherSVG,
  [TOKEN_SYMBOL.DNR]: DineroSVG,
  [TOKEN_SYMBOL.USDT]: TetherSVG,
  [TOKEN_SYMBOL.BTC]: BitcoinSVG,
  [TOKEN_SYMBOL.USDC]: USDCoinSVG,
  [TOKEN_SYMBOL.UNI]: UniSwapSVG,
  [TOKEN_SYMBOL.APE]: ApeCoinSVG,
  [TOKEN_SYMBOL.MANA]: ManaSVG,
  [TOKEN_SYMBOL.LINK]: ChainLinkSVG,
  [TOKEN_SYMBOL.SHIB]: ShibaInuSVG,
  [TOKEN_SYMBOL.INT]: InterestTokenSVG,
  [TOKEN_SYMBOL.Unknown]: UnknownCoinSVG,
} as { [key: string]: FC<SVGAttributes<SVGSVGElement>> };

const FARMS_SVG_MAP = {
  0: [InterestTokenSVG],
  1: [DineroSVG, BitcoinSVG],
} as Record<number, ReadonlyArray<FC<SVGAttributes<SVGSVGElement>>>>;

export const getFarmsSVG = (
  id: number
): ReadonlyArray<FC<SVGAttributes<SVGSVGElement>>> => {
  const svgArray = FARMS_SVG_MAP[id];

  if (!svgArray) return [];

  return svgArray;
};

const BNB_TEST_ERC20_ARRAY = [
  {
    symbol: TOKEN_SYMBOL.BTC,
    decimals: 18,
    name: 'Bitcoin',
    address: getBTCAddress(CHAIN_ID.BNB_TEST_NET),
  },
  {
    symbol: TOKEN_SYMBOL.DNR,
    decimals: 18,
    name: 'Dinero',
    address: getDNRAddress(CHAIN_ID.BNB_TEST_NET),
  },
  {
    symbol: TOKEN_SYMBOL.INT,
    decimals: 18,
    name: 'Interest Token',
    address: getIntAddress(CHAIN_ID.BNB_TEST_NET),
  },
];

const BNB_TEST_ERC_20_DATA = BNB_TEST_ERC20_ARRAY.reduce(
  (acc, data) => ({
    ...acc,
    [ethers.utils.getAddress(data.address)]: ERC20.from(
      data.address,
      CHAIN_ID.BNB_TEST_NET,
      data.name,
      data.symbol,
      data.decimals
    ),
    [data.symbol]: ERC20.from(
      data.address,
      CHAIN_ID.BNB_TEST_NET,
      data.name,
      data.symbol,
      data.decimals
    ),
  }),
  {} as { [key: string]: ERC20 }
);

export const ERC_20_DATA = {
  [CHAIN_ID.BNB_TEST_NET]: BNB_TEST_ERC_20_DATA,
};

export const UNKNOWN_ERC_20 = ERC20.from(ethers.constants.AddressZero, 0);
