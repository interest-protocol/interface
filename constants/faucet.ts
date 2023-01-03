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

export const FAUCET_TOKENS_TYPE = {
  [Network.DEVNET]: {
    BTC: '',
    BNB: 'dynamic_field::Field<0x1::ascii::String, 0x2::balance::Supply<0x44f8cf5a3d0c63db4f899794cd9eee5c499736ab::coins::BNB>>',
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
