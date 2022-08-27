import { useRouter } from 'next/router';
import { FC, useEffect } from 'react';
const RedirectLang: FC = () => {
  const { asPath, locale, push } = useRouter();

  useEffect(() => {
    if (window) {
      const LOCALE = window.localStorage.getItem('interest-locale');
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
