import { useRouter } from 'next/router';
import { FC, useEffect } from 'react';

import { useLocalStorage } from '@/hooks';
const RedirectLang: FC = () => {
  const { asPath, locale, push } = useRouter();
  const [localeDefault] = useLocalStorage<string>(
    'interest-locale',
    locale as string
  );

  useEffect(() => {
    if (window) {
      const LOCALE = localeDefault;
      LOCALE &&
        LOCALE != locale &&
        push(asPath, asPath, {
          locale: LOCALE,
        });
    }
  }, []);

  return null;
};

export default RedirectLang;
