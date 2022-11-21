import { NextPage } from 'next';
import { useTranslations } from 'next-intl';
import { FC } from 'react';

import { useRouterQuery } from '@/hooks';
import { isValidAccount } from '@/utils';
import { Loading } from '@/views/dapp/components';
import ErrorView from '@/views/dapp/views/error';

type TWithAddress = (Component: NextPage<{ address: string }>) => FC;

// eslint-disable-next-line react/display-name
const withAddress: TWithAddress = (Component) => () => {
  const t = useTranslations();

  const { value, isReady } = useRouterQuery('address');

  const address = String(value);

  if (!isReady) return <Loading />;

  if (!address || !isValidAccount(address))
    return <ErrorView message={t('error.wrongParams')} />;

  return <Component {...{ address }} />;
};

export default withAddress;
