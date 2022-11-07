import { IntlError, IntlErrorCode, NextIntlProvider } from 'next-intl';
import { ComponentProps } from 'react';
import { IntlProvider } from 'use-intl';

import { FCWithChildren } from '@/interface';

type NextIntlProviderProps = Omit<
  ComponentProps<typeof IntlProvider>,
  'locale'
> & {
  locale?: string;
};

function onError(error: IntlError) {
  if (error.code === IntlErrorCode.MISSING_MESSAGE) {
    // Missing translations are expected and should only log an error
    console.error(error);
  }
}

function getMessageFallback({
  namespace,
  key,
  error,
}: {
  namespace?: string;
  key: string;
  error: IntlError;
}) {
  const path = [namespace, key].filter((part) => part != null).join('.');

  if (error.code === IntlErrorCode.MISSING_MESSAGE) {
    return `${path} is not yet translated`;
  } else {
    return `Dear developer, please fix this message: ${path}`;
  }
}

const Provider: FCWithChildren<NextIntlProviderProps> = ({
  children,
  ...otherProps
}) => (
  <NextIntlProvider
    onError={onError}
    getMessageFallback={getMessageFallback}
    {...otherProps}
  >
    {children}
  </NextIntlProvider>
);

export default Provider;
