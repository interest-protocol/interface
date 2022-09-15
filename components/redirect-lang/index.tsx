import { useRouter } from 'next/router';
import { FC, useEffect } from 'react';

import { LocalesEnum } from '@/constants/locale';

const RedirectLang: FC = () => {
  const { asPath, locale, push } = useRouter();

  useEffect(() => {
    const localeDefault = document?.cookie.split('=')?.[1] || LocalesEnum.EN;

    localeDefault !== locale &&
      push(asPath, asPath, {
        locale: localeDefault,
      });
  }, [locale]);

  return null;
};

export default RedirectLang;
