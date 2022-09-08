import { InfoLightSVG, LoadingSVG, WarningSVG } from '@/svg';

export const SWAP_MESSAGES = {
  'loading-amount': {
    message: 'fetchingAmounts',
    Icon: LoadingSVG,
  },
  'error-amount-out': {
    message: 'errorAmountOut',
    Icon: WarningSVG,
    color: 'error',
  },
  'error-same-token': {
    message: 'errorSameOut',
    Icon: WarningSVG,
    color: 'error',
  },
  'error-balances': {
    message: 'errorBalances',
    Icon: WarningSVG,
    color: 'error',
  },
  'info-no-pool': {
    message: 'infoNoPool',
    Icon: InfoLightSVG,
    color: 'accentAlternative',
  },
};
