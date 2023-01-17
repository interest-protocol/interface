import { Network } from '@mysten/sui.js';
import { FC } from 'react';

import { SVGProps } from '@/components/svg/svg.types';
import { TOKEN_SYMBOL } from '@/sdk';
import {
  BinanceSVG,
  BitcoinSVG,
  DAISVG,
  EtherSVG,
  SuiSVG,
  USDCoinSVG,
  USDTSVG,
} from '@/svg';

import { COIN_TYPE } from './coins';

export const FAUCET_PACKAGE_ID = '0x83e6b8d4a1257f8b1050875a30c70f74b6976ad4';

export const FAUCET_OBJECT_ID = '0x5b48ee2ca408fbf71e3285e744f0376bb45a7a61';

export const FAUCET_TOKENS = {
  [Network.DEVNET]: [
    {
      symbol: TOKEN_SYMBOL.SUI,
      type: COIN_TYPE[Network.DEVNET].SUI,
      Icon: SuiSVG,
      name: 'SUI',
      decimals: 9,
    },
    {
      symbol: TOKEN_SYMBOL.BTC,
      type: COIN_TYPE[Network.DEVNET].BTC,
      Icon: BitcoinSVG,
      name: 'Bitcoin',
      decimals: 0,
    },
    {
      symbol: TOKEN_SYMBOL.BNB,
      type: COIN_TYPE[Network.DEVNET].BNB,
      Icon: BinanceSVG,
      name: 'Binance Coin',
      decimals: 0,
    },
    {
      symbol: TOKEN_SYMBOL.ETH,
      type: COIN_TYPE[Network.DEVNET].ETH,
      Icon: EtherSVG,
      name: 'ETHER',
      decimals: 0,
    },
    {
      symbol: TOKEN_SYMBOL.USDC,
      type: COIN_TYPE[Network.DEVNET].USDC,
      Icon: USDCoinSVG,
      name: 'USDC',
      decimals: 0,
    },
    {
      symbol: TOKEN_SYMBOL.USDT,
      type: COIN_TYPE[Network.DEVNET].USDT,
      Icon: USDTSVG,
      name: 'USDT',
      decimals: 0,
    },
    {
      symbol: TOKEN_SYMBOL.DAI,
      type: COIN_TYPE[Network.DEVNET].DAI,
      Icon: DAISVG,
      name: 'DAI',
      decimals: 0,
    },
  ] as ReadonlyArray<{
    symbol: TOKEN_SYMBOL.SUI;
    type: string;
    Icon: FC<SVGProps>;
    name: string;
    decimals: number;
  }>,
};
