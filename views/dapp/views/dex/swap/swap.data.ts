import { InfoLightSVG, LoadingSVG, WarningSVG } from '@/svg';

export const SWAP_MESSAGES = {
  'loading-amount': {
    message: 'Fetching amount...',
    Icon: LoadingSVG,
  },
  'error-amount-out': {
    message: 'Failed to fetch the amount out',
    Icon: WarningSVG,
    color: 'error',
  },
  'error-same-token': {
    message: 'Cannot swap the same token',
    Icon: WarningSVG,
    color: 'error',
  },
  'error-balances': {
    message: 'Failed to fetch balances',
    Icon: WarningSVG,
    color: 'error',
  },
  'info-no-pool': {
    message: 'This pair has no liquidity. Try a higher amount or add liquidity',
    Icon: InfoLightSVG,
    color: 'accentAlternative',
  },
};
