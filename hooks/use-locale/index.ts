import { useRouter } from 'next/router';

import { LocalesEnum } from '@/constants/locale';

const setCookie = (locale: string) => {
  document.cookie = `NEXT_LOCALE=${locale}; max-age=31536000; path=/`;
};

export const useLocale = () => {
  const { locale, replace, asPath, locales } = useRouter();

  const changeLocale = async (locale: string) => {
    await replace(asPath, undefined, { locale });
    setCookie(locale);
  };

  return {
    changeLocale,
    currentLocale: locale || LocalesEnum.EN,
    locales: locales || [],
  };
};
