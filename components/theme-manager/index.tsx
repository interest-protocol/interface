import { ThemeProvider } from '@emotion/react';
import { ThemeProviderProps } from '@emotion/react/types/theming';
import { FC } from 'react';

import { DAppDarkTheme, DAppLightTheme } from '@/design-system/dapp-theme';
import { useLocalStorage } from '@/hooks';

const ThemeManager: FC<Omit<ThemeProviderProps, 'theme'>> = (props) => {
  const [dark, setDark] = useLocalStorage('interest-theme', false);

  return (
    <ThemeProvider
      {...props}
      theme={{ setDark, ...(dark ? DAppDarkTheme : DAppLightTheme) }}
    />
  );
};

export default ThemeManager;
