import {
  ADASVG,
  BinanceCoinSVG,
  ChainLinkSVG,
  DaiSVG,
  EtherGraySVG,
  SolanaSVG,
  TetherSVG,
  USDCoinSVG,
} from '@/svg';

import { TTokenIcons } from './earn.types';

export const LEND_AND_BORROW_TOKENS: ReadonlyArray<TTokenIcons> = [
  [ChainLinkSVG, BinanceCoinSVG],
  [USDCoinSVG, TetherSVG],
  [USDCoinSVG, EtherGraySVG],
  [DaiSVG, EtherGraySVG],
  [SolanaSVG, BinanceCoinSVG],
  [ADASVG, BinanceCoinSVG],
];
