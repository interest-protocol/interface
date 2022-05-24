import { IHeading } from '@/elements/table/table.types';
import {
  ApeCoinSVG,
  ChainLinkSVG,
  ManaSVG,
  ShibaInuSVG,
  UniSwapSVG,
} from '@/svg';

import { TMailMarketDefaultData } from './mail-market.types';

export const MAIL_MARKET_HEADINGS = (
  symbol: string
): ReadonlyArray<IHeading> => [
  {
    item: 'Market',
  },
  {
    item: '',
  },
  {
    item: symbol,
  },
  {
    item: 'BTC',
  },
  {
    item: 'ETH',
  },
  {
    item: 'USDC',
  },
  {
    item: 'USDT',
  },
];

export const MAIL_MARKET_DATA: TMailMarketDefaultData = [
  {
    Icon: UniSwapSVG,
    symbol: 'UNI',
    name: 'UniSwap',
    address: '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984',
  },
  {
    Icon: ApeCoinSVG,
    symbol: 'APE',
    name: 'ApeCoin',
    address: '0x4d224452801aced8b2f0aebe155379bb5d594381',
  },
  {
    Icon: ShibaInuSVG,
    symbol: 'SHIB',
    name: 'Shiba Inu',
    address: '0x95ad61b0a150d79219dcf64e1e6cc01f0b64c4ce',
  },
  {
    Icon: ChainLinkSVG,
    symbol: 'LINK',
    name: 'Chain Link',
    address: '0x514910771af9ca656af840dff83e8264ecf986ca',
  },
  {
    Icon: ManaSVG,
    symbol: 'MANA',
    name: 'Decentraland',
    address: '0x0f5d2fb29fb7d3cfee444a200298f468908cc942',
  },
];
