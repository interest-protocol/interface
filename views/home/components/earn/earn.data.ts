import {
  BinanceSVG,
  BitcoinSVG,
  CompoundEtherSVG,
  EtherGraySVG,
  TetherSVG,
  USDCoinSVG,
} from '@/svg';

import { TTokenIcons } from './earn.types';

export const LEND_AND_BORROW_TOKENS: ReadonlyArray<TTokenIcons> = [
  [TetherSVG],
  [BitcoinSVG],
  [EtherGraySVG],
  [BinanceSVG],
  [CompoundEtherSVG],
  [USDCoinSVG, EtherGraySVG],
];
