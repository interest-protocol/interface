import { IntlError, IntlErrorCode, NextIntlProvider } from 'next-intl';
import { ComponentProps, FC } from 'react';
import { IntlProvider } from 'use-intl';

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

const Provider: FC<NextIntlProviderProps> = ({ children, ...otherProps }) => (
  <NextIntlProvider
    onError={onError}
    getMessageFallback={getMessageFallback}
    {...otherProps}
  >
    {children}
  </NextIntlProvider>
);

export default Provider;
