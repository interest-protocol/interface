import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useTranslations } from 'next-intl';
import { FC, useMemo } from 'react';

import { isValidAccount } from '@/utils';
import { Loading } from '@/views/dapp/components';
import ErrorView from '@/views/dapp/views/error';

type TWithParamsGuard = (
  paramsKeys: ReadonlyArray<string>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Component: NextPage<any>
) => FC;

// eslint-disable-next-line react/display-name
const withParamsGuard: TWithParamsGuard = (paramsKeys, Component) => () => {
  const t = useTranslations();

  const { query, asPath, isReady } = useRouter();

  const queryParams = new URLSearchParams(asPath);

  const params = useMemo(
    () =>
      paramsKeys.map(
        (paramKey) => query[paramKey] || queryParams.get(paramKey) || ''
      ),
    [isReady]
  );

  if (!isReady) return <Loading />;

  const addressIndex = paramsKeys.indexOf('address');
  const hasAddress = addressIndex >= 0;
  const address = params[addressIndex];

  if (!params.length || (hasAddress && !isValidAccount(String(address))))
    return <ErrorView message={t('error.wrongParams')} />;

  return (
    <Component
      {...paramsKeys.reduce(
        (acc, key, index) => ({ ...acc, [key]: params[index] }),
        {}
      )}
    />
  );
};

export default withParamsGuard;
