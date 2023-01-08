import { ThemeProvider } from '@emotion/react';
import { ThemeProviderProps } from '@emotion/react/types/theming';
import { FC, useState } from 'react';

import { DAppDarkTheme, DAppLightTheme } from '@/design-system/dapp-theme';

const ThemeManager: FC<Omit<ThemeProviderProps, 'theme'>> = (props) => {
  const [dark, setDark] = useState(false);

  return (
    <ThemeProvider
      {...props}
      theme={{ setDark, ...(dark ? DAppDarkTheme : DAppLightTheme) }}
    />
  );
};

export default ThemeManager;
