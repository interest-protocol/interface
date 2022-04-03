import { ethers } from 'ethers';
import { FC, SVGAttributes } from 'react';

import { CHAIN_ID } from '@/constants/chains';
import { ERC20 } from '@/sdk/entities/erc-20';
import { BitcoinSVG, DineroSVG, EthereumSVG } from '@/svg';

export enum TOKEN_SYMBOL {
  BTC = 'BTC',
  DNR = 'DNR',
}

export const FAUCET_TOKENS = [
  {
    symbol: TOKEN_SYMBOL.BTC,
    address: '0x954f3A4aeC237D311839d6E0274c0aC8Be13d1b1',
  },
  {
    symbol: TOKEN_SYMBOL.DNR,
    address: '0x57486681D2E0Bc9B0494446b8c5df35cd20D4E92',
  },
];

export const TOKENS_SVG_MAP = {
  [TOKEN_SYMBOL.BTC]: BitcoinSVG,
  [TOKEN_SYMBOL.DNR]: DineroSVG,
  '???': EthereumSVG,
} as { [key: string]: FC<SVGAttributes<SVGSVGElement>> };

const BSC_TEST_ERC20_ARRAY = [
  {
    symbol: TOKEN_SYMBOL.BTC,
    decimals: 18,
    name: 'Bitcoin',
    address: '0x954f3A4aeC237D311839d6E0274c0aC8Be13d1b1',
  },
  {
    symbol: TOKEN_SYMBOL.DNR,
    decimals: 18,
    name: 'Dinero',
    address: '0x57486681D2E0Bc9B0494446b8c5df35cd20D4E92',
  },
];

export const BSC_TEST_ERC_20_DATA = BSC_TEST_ERC20_ARRAY.reduce(
  (acc, data) => ({
    ...acc,
    [data.symbol]: ERC20.from(
      data.address,
      CHAIN_ID.BSC_TEST_NET,
      data.name,
      data.symbol,
      data.decimals
    ),
  }),
  {} as { [key: string]: ERC20 }
);

export const UNKNOWN_ERC_20 = ERC20.from(ethers.constants.AddressZero, 0);
