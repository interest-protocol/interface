import { InfoLightSVG, LoadingSVG, WarningSVG } from '@/svg';

export const SWAP_MESSAGES = {
  'loading-amount': {
    message: 'dexSwap.swapMessage.fetchingAmounts',
    Icon: LoadingSVG,
  },
  'error-amount-out': {
    message: 'dexSwap.swapMessage.amountOut',
    Icon: WarningSVG,
    color: 'error',
  },
  'error-same-token': {
    message: 'dexSwap.swapMessage.sameOut',
    Icon: WarningSVG,
    color: 'error',
  },
  'error-balances': {
    message: 'dexSwap.swapMessage.balances',
    Icon: WarningSVG,
    color: 'error',
  },
  'info-no-pool': {
    message: 'dexSwap.swapMessage.infoNoPool',
    Icon: InfoLightSVG,
    color: 'accentAlternative',
  },
};
