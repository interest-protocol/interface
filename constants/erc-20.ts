import { ethers } from 'ethers';
import { reduce } from 'ramda';
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
import {
  getAPEAddress,
  getBTCAddress,
  getDNRAddress,
  getETHERC20Address,
  getIntAddress,
  getLINKAddress,
  getMANAAddress,
  getSHIBAddress,
  getUNIAddress,
  getUSDCAddress,
  getUSDTAddress,
  getWETHAddress,
} from '@/utils/contracts';

export const FAUCET_TOKENS = {
  [CHAIN_ID.RINKEBY]: [
    {
      symbol: TOKEN_SYMBOL.BTC,
      address: getBTCAddress(CHAIN_ID.RINKEBY),
      name: 'Bitcoin',
    },
    {
      symbol: TOKEN_SYMBOL.WETH,
      address: getWETHAddress(CHAIN_ID.RINKEBY),
      name: 'Wrapper Ether',
    },
    {
      symbol: TOKEN_SYMBOL.USDT,
      address: getUSDTAddress(CHAIN_ID.RINKEBY),
      name: 'USD Tether',
    },
    {
      symbol: TOKEN_SYMBOL.USDC,
      address: getUSDCAddress(CHAIN_ID.RINKEBY),
      name: 'USD Coin',
    },
    {
      symbol: TOKEN_SYMBOL.UNI,
      address: getUNIAddress(CHAIN_ID.RINKEBY),
      name: 'Uniswap',
    },
    {
      symbol: TOKEN_SYMBOL.APE,
      address: getAPEAddress(CHAIN_ID.RINKEBY),
      name: 'ApeCoin',
    },
  ],
  [CHAIN_ID.BNB_TEST_NET]: [
    {
      symbol: TOKEN_SYMBOL.BTC,
      address: getBTCAddress(CHAIN_ID.BNB_TEST_NET),
      name: 'Bitcoin',
    },
    {
      symbol: TOKEN_SYMBOL.DNR,
      address: getDNRAddress(CHAIN_ID.BNB_TEST_NET),
      name: 'Dinero',
    },
    {
      symbol: TOKEN_SYMBOL.ETH,
      address: getETHERC20Address(CHAIN_ID.BNB_TEST_NET),
      name: 'Ether',
    },
    {
      symbol: TOKEN_SYMBOL.USDT,
      address: getUSDTAddress(CHAIN_ID.BNB_TEST_NET),
      name: 'USD Tether',
    },
    {
      symbol: TOKEN_SYMBOL.USDC,
      address: getUSDCAddress(CHAIN_ID.BNB_TEST_NET),
      name: 'USD Coin',
    },
  ],
};

export const TOKENS_SVG_MAP = {
  [TOKEN_SYMBOL.ETH]: EtherSVG,
  [TOKEN_SYMBOL.WETH]: EtherSVG,
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

const RINKEBY_MAIL_BRIDGE_ERC20_ARRAY = [
  {
    symbol: TOKEN_SYMBOL.BTC,
    decimals: 18,
    name: 'Bitcoin',
    address: getBTCAddress(CHAIN_ID.RINKEBY),
    chainId: CHAIN_ID.RINKEBY,
  },
  {
    symbol: TOKEN_SYMBOL.WETH,
    decimals: 18,
    name: 'Wrapped Ether',
    address: getWETHAddress(CHAIN_ID.RINKEBY),
    chainId: CHAIN_ID.RINKEBY,
  },
  {
    symbol: TOKEN_SYMBOL.USDC,
    decimals: 6,
    name: 'USD Coin',
    address: getUSDCAddress(CHAIN_ID.RINKEBY),
    chainId: CHAIN_ID.RINKEBY,
  },
  {
    symbol: TOKEN_SYMBOL.USDT,
    decimals: 6,
    name: 'USD Tether',
    address: getUSDTAddress(CHAIN_ID.RINKEBY),
    chainId: CHAIN_ID.RINKEBY,
  },
];

const RINKEBY_ERC20_ARRAY = [
  ...RINKEBY_MAIL_BRIDGE_ERC20_ARRAY,
  {
    symbol: TOKEN_SYMBOL.LINK,
    decimals: 18,
    name: 'Chainlink',
    address: getLINKAddress(CHAIN_ID.RINKEBY),
    chainId: CHAIN_ID.RINKEBY,
  },
  {
    symbol: TOKEN_SYMBOL.APE,
    decimals: 18,
    name: 'ApeCoin',
    address: getAPEAddress(CHAIN_ID.RINKEBY),
    chainId: CHAIN_ID.RINKEBY,
  },
  {
    symbol: TOKEN_SYMBOL.MANA,
    decimals: 18,
    name: 'Decentraland',
    address: getMANAAddress(CHAIN_ID.RINKEBY),
    chainId: CHAIN_ID.RINKEBY,
  },
  {
    symbol: TOKEN_SYMBOL.SHIB,
    decimals: 18,
    name: 'SHIBA INU',
    address: getSHIBAddress(CHAIN_ID.RINKEBY),
    chainId: CHAIN_ID.RINKEBY,
  },
  {
    symbol: TOKEN_SYMBOL.UNI,
    address: getUNIAddress(CHAIN_ID.RINKEBY),
    name: 'Uniswap',
    chainId: CHAIN_ID.RINKEBY,
    decimals: 18,
  },
];

const BNB_TEST_ERC20_ARRAY = [
  {
    symbol: TOKEN_SYMBOL.BTC,
    decimals: 18,
    name: 'Bitcoin',
    address: getBTCAddress(CHAIN_ID.BNB_TEST_NET),
    chainId: CHAIN_ID.BNB_TEST_NET,
  },
  {
    symbol: TOKEN_SYMBOL.DNR,
    decimals: 18,
    name: 'Dinero',
    address: getDNRAddress(CHAIN_ID.BNB_TEST_NET),
    chainId: CHAIN_ID.BNB_TEST_NET,
  },
  {
    symbol: TOKEN_SYMBOL.INT,
    decimals: 18,
    name: 'Interest Token',
    address: getIntAddress(CHAIN_ID.BNB_TEST_NET),
    chainId: CHAIN_ID.BNB_TEST_NET,
  },
];

export const makeERC20Record = reduce(
  (acc, data: typeof BNB_TEST_ERC20_ARRAY[0]) => ({
    ...acc,
    [ethers.utils.getAddress(data.address)]: ERC20.from(
      data.address,
      data.chainId,
      data.name,
      data.symbol,
      data.decimals
    ),
    [data.symbol]: ERC20.from(
      data.address,
      data.chainId,
      data.name,
      data.symbol,
      data.decimals
    ),
  }),
  {} as { [key: string]: ERC20 }
);

const BNB_TEST_ERC_20_DATA = makeERC20Record(BNB_TEST_ERC20_ARRAY);

const RINKEBY_ERC_20_DATA = makeERC20Record(RINKEBY_ERC20_ARRAY);

export const ERC_20_DATA = {
  [CHAIN_ID.BNB_TEST_NET]: BNB_TEST_ERC_20_DATA,
  [CHAIN_ID.RINKEBY]: RINKEBY_ERC_20_DATA,
};

export const MAIL_BRIDGE_TOKENS_ARRAY = {
  [CHAIN_ID.RINKEBY]: RINKEBY_MAIL_BRIDGE_ERC20_ARRAY,
  [CHAIN_ID.BNB_TEST_NET]: [],
};

export const UNKNOWN_ERC_20 = ERC20.from(ethers.constants.AddressZero, 0);
