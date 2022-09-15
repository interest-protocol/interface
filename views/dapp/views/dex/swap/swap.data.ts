import { InfoLightSVG, LoadingSVG, WarningSVG } from '@/svg';

export const SWAP_MESSAGES = {
  'loading-amount': {
    message: 'common.swapMessage.fetchingAmounts',
    Icon: LoadingSVG,
  },
  'error-amount-out': {
    message: 'common.swapMessage.AmountOut',
    Icon: WarningSVG,
    color: 'error',
  },
  'error-same-token': {
    message: 'common.swapMessage.sameOut',
    Icon: WarningSVG,
    color: 'error',
  },
  'error-balances': {
    message: 'common.swapMessage.balances',
    Icon: WarningSVG,
    color: 'error',
  },
  'info-no-pool': {
    message: 'common.swapMessage.infoNoPool',
    Icon: InfoLightSVG,
    color: 'accentAlternative',
  },
};
