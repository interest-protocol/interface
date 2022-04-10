import { BitcoinSVG, DineroSVG, InterestTokenSVG } from '@/svg';

import { TTokenIcons, TValidTokens } from './earn-stake-modal.types';

export const VALID_TOKENS: TValidTokens = ['INT', 'LP'];

export const TOKENS_CURRENCY = { INT: 'INT', LP: 'BTC-DNR' };

export const TOKENS_ICONS: TTokenIcons = {
  INT: InterestTokenSVG,
  LP: [BitcoinSVG, DineroSVG],
};
