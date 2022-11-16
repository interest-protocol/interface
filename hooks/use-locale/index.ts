import { useRouter } from 'next/router';

import { LocalesEnum } from '@/constants/locale';

const setCookie = (locale: string) => {
  document.cookie = `NEXT_LOCALE=${locale}; max-age=31536000;`;
};

export const useLocale = () => {
  const { locale, push, asPath, locales, pathname, query } = useRouter();

  const changeLocale = (locale: string) => {
    setCookie(locale);
    push({ pathname, query }, asPath, {
      locale,
      unstable_skipClientCache: true,
    });
  };

  return {
    changeLocale,
    currentLocale: locale || LocalesEnum.EN,
    locales: locales || [],
  };
};
