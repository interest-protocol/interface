import { useRouter } from 'next/router';
import { FC, useEffect } from 'react';

import { useLocalStorage } from '@/hooks';
const RedirectLang: FC = () => {
  const { asPath, locale, push } = useRouter();
  const [localeDefault] = useLocalStorage<string>(
    'interest-locale',
    locale || 'en-US'
  );

  useEffect(() => {
    localeDefault !== locale &&
      push(asPath, asPath, {
        locale: localeDefault,
      });
  }, [localeDefault]);

  return null;
};

export default RedirectLang;
