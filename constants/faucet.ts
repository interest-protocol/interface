import { Network } from '@mysten/sui.js';
import { FC } from 'react';

import { SVGProps } from '@/components/svg/svg.types';
import { AddressZero, TOKEN_SYMBOL } from '@/sdk';
import {
  BinanceSVG,
  BitcoinSVG,
  DAISVG,
  EtherSVG,
  SuiSVG,
  USDCoinSVG,
} from '@/svg';

export const FAUCET_OBJECT_ID = '0x4111d1f611de2934334bcc74d06ac9d8babe2f05';

export const FAUCET_TOKENS_TYPE = {
  [Network.DEVNET]: {
    BTC: '',
    BNB: '0x1779c675c240f9659f4738fbac69eb6f0bd98b12::coins::BNB',
    USDT: '',
    USDC: '',
    DAI: '',
    SUI: '0x2::coin::Coin<0x2::sui::SUI>',
  },
};

export const FAUCET_TOKENS = {
  [Network.DEVNET]: [
    {
      symbol: TOKEN_SYMBOL.BTC,
      address: AddressZero,
      Icon: BitcoinSVG,
      name: 'Bitcoin',
    },
    {
      symbol: TOKEN_SYMBOL.BNB,
      address: AddressZero,
      Icon: BinanceSVG,
      name: 'Binance Coin',
    },
    {
      symbol: TOKEN_SYMBOL.DAI,
      address: AddressZero,
      Icon: DAISVG,
      name: 'DAI',
    },
    {
      symbol: TOKEN_SYMBOL.ETH,
      address: AddressZero,
      Icon: EtherSVG,
      name: 'ETHER',
    },
    {
      symbol: TOKEN_SYMBOL.USDC,
      address: AddressZero,
      Icon: USDCoinSVG,
      name: 'USDC',
    },
    {
      symbol: TOKEN_SYMBOL.USDT,
      address: AddressZero,
      Icon: USDCoinSVG,
      name: 'USDT',
    },
    {
      symbol: TOKEN_SYMBOL.SUI,
      address: AddressZero,
      Icon: SuiSVG,
      name: 'SUI',
    },
  ] as ReadonlyArray<{
    symbol: TOKEN_SYMBOL.SUI;
    address: string;
    Icon: FC<SVGProps>;
    name: string;
  }>,
};
