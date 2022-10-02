import { DefaultToastOptions } from 'react-hot-toast';

import ThemeColors from '@/design-system/landing-page-theme/colors';

export const getLPToastOption = (
  colors: typeof ThemeColors
): DefaultToastOptions => ({
  loading: {
    style: {
      borderRadius: '0',
      borderBottom: `0.4rem solid ${colors.accent}`,
    },
  },
  blank: {
    style: {
      borderRadius: '0',
    },
  },
  success: {
    style: {
      borderRadius: '0',
      borderBottom: `0.4rem solid ${colors.success}`,
    },
  },
  error: {
    style: {
      borderRadius: '0',
      borderBottom: `0.4rem solid ${colors.error}`,
    },
  },
});
