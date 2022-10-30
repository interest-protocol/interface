import { ethers } from 'ethers';
import { pathOr, reduce } from 'ramda';
import { FC, SVGAttributes } from 'react';

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
  SynthBitcoinSVG,
  SynthBRLSVG,
  SynthEthereumSVG,
  SynthGBPSVG,
  SynthJPYSVG,
  SynthXAUSVG,
  TetherSVG,
  TrueUSDSVG,
  UniSwapSVG,
  UnknownCoinSVG,
  USDCoinSVG,
  USDDSVG,
  VaiSVG,
  WBNBCoinSVG,
} from '@/svg';
import {
  isZeroAddress,
  replaceWrappedNativeTokenAddressWithZero,
} from '@/utils';
import {
  getAPEAddress,
  getBTCAddress,
  getBUSDAddress,
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
    {
      symbol: TOKEN_SYMBOL.BUSD,
      address: getBUSDAddress(CHAIN_ID.BNB_TEST_NET),
      name: 'BUSD',
    },
  ],
};

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
    [CONTRACTS.iBTC[CHAIN_ID.BNB_TEST_NET]]: SynthBitcoinSVG,
    [CONTRACTS.iBRL[CHAIN_ID.BNB_TEST_NET]]: SynthBRLSVG,
    [CONTRACTS.iETH[CHAIN_ID.BNB_TEST_NET]]: SynthEthereumSVG,
    [CONTRACTS.iGBP[CHAIN_ID.BNB_TEST_NET]]: SynthGBPSVG,
    [CONTRACTS.iXAU[CHAIN_ID.BNB_TEST_NET]]: SynthXAUSVG,
    [CONTRACTS.iJPY[CHAIN_ID.BNB_TEST_NET]]: SynthJPYSVG,
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
    [CONTRACTS.iBTC[CHAIN_ID.RINKEBY]]: SynthBitcoinSVG,
    [CONTRACTS.iBRL[CHAIN_ID.RINKEBY]]: SynthBRLSVG,
    [CONTRACTS.iETH[CHAIN_ID.RINKEBY]]: SynthEthereumSVG,
    [CONTRACTS.iGBP[CHAIN_ID.RINKEBY]]: SynthGBPSVG,
    [CONTRACTS.iXAU[CHAIN_ID.RINKEBY]]: SynthXAUSVG,
    [CONTRACTS.iJPY[CHAIN_ID.RINKEBY]]: SynthJPYSVG,
    [ethers.constants.AddressZero]: EtherSVG,
  },
} as {
  [chain: number]: { [address: string]: FC<SVGAttributes<SVGSVGElement>> };
};

export const getFarmsSVGByToken = (
  chainId: number,
  token0: string,
  token1: string
): ReadonlyArray<{
  SVG: FC<SVGAttributes<SVGSVGElement>>;
  highZIndex: boolean;
}> => {
  const Token0 = pathOr(
    UNKNOWN_ERC_20,
    [chainId.toString(), token0],
    ERC_20_DATA
  );

  const Token1 = pathOr(
    UNKNOWN_ERC_20,
    [chainId.toString(), token1],
    ERC_20_DATA
  );

  const token1HasLowerZIndex = [TOKEN_SYMBOL.BNB, TOKEN_SYMBOL.WBNB].includes(
    Token1.symbol as TOKEN_SYMBOL
  );

  // IPX pool
  if (isZeroAddress(token0))
    return [
      {
        SVG: TOKENS_SVG_MAP[chainId][ethers.utils.getAddress(Token1.address)],
        highZIndex: false,
      },
    ];

  return [
    {
      SVG: TOKENS_SVG_MAP[chainId][
        replaceWrappedNativeTokenAddressWithZero(
          chainId,
          ethers.utils.getAddress(Token0.address)
        )
      ],
      highZIndex: token1HasLowerZIndex,
    },
    {
      SVG: TOKENS_SVG_MAP[chainId][
        replaceWrappedNativeTokenAddressWithZero(
          chainId,
          ethers.utils.getAddress(Token1.address)
        )
      ],
      highZIndex: !token1HasLowerZIndex,
    },
  ];
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
    symbol: TOKEN_SYMBOL.BUSD,
    decimals: 18,
    name: 'USD Binance',
    address: getBUSDAddress(CHAIN_ID.BNB_TEST_NET),
    chainId: CHAIN_ID.BNB_TEST_NET,
  },
  {
    symbol: TOKEN_SYMBOL.INT,
    decimals: 18,
    name: 'Interest Token',
    address: getIntAddress(CHAIN_ID.BNB_TEST_NET),
    chainId: CHAIN_ID.BNB_TEST_NET,
  },
  {
    symbol: TOKEN_SYMBOL.USDC,
    decimals: 6,
    name: 'USD Coin',
    address: getUSDCAddress(CHAIN_ID.BNB_TEST_NET),
    chainId: CHAIN_ID.BNB_TEST_NET,
  },
  {
    symbol: TOKEN_SYMBOL.USDT,
    decimals: 6,
    name: 'USD Tether',
    address: getUSDTAddress(CHAIN_ID.BNB_TEST_NET),
    chainId: CHAIN_ID.BNB_TEST_NET,
  },
  {
    symbol: TOKEN_SYMBOL.ETH,
    decimals: 18,
    name: 'Ether',
    address: getETHERC20Address(CHAIN_ID.BNB_TEST_NET),
    chainId: CHAIN_ID.BNB_TEST_NET,
  },
  {
    symbol: TOKEN_SYMBOL.WBNB,
    decimals: 18,
    address: getWETHAddress(CHAIN_ID.BNB_TEST_NET),
    chainId: CHAIN_ID.BNB_TEST_NET,
    name: 'Wrapped BNB',
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

export const TOKEN_META_DATA_ARRAY = {
  [CHAIN_ID.BNB_TEST_NET]: BNB_TEST_ERC20_ARRAY,
  [CHAIN_ID.RINKEBY]: RINKEBY_ERC20_ARRAY,
};

export const ERC_20_DATA = {
  [CHAIN_ID.BNB_TEST_NET]: BNB_TEST_ERC_20_DATA,
  [CHAIN_ID.RINKEBY]: RINKEBY_ERC_20_DATA,
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
