import { useRouter } from 'next/router';
import { createContext, FC, useCallback, useEffect } from 'react';

import { useLocalStorage } from '@/hooks';

import { II18nContext } from './i18n.types';

const i18nContext = createContext<II18nContext>({
  currentLocale: 'en-US',
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  changeLocale: () => {},
} as II18nContext);

export const I18nProvider: FC = ({ children }) => {
  const { Provider } = i18nContext;
  const { locale, replace, asPath } = useRouter();
  const [userLocale, setUserLocale] = useLocalStorage<string>(
    'interest-locale',
    locale || 'en-US'
  );

  const changeLocale = useCallback(
    (locale: string) => setUserLocale(locale),
    []
  );

  useEffect(() => {
    if (userLocale != (locale || 'en-US'))
      replace(asPath, undefined, { locale: userLocale });
  }, [userLocale, locale]);

  const value = {
    changeLocale,
    currentLocale: locale || 'en-US',
  };

  return <Provider value={value}>{children}</Provider>;
};

export default i18nContext;
