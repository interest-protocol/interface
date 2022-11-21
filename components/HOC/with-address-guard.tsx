import { useTranslations } from 'next-intl';
import { FC } from 'react';

import { useRouterQuery } from '@/hooks';
import { NextPageWithAddress } from '@/interface';
import { isValidAccount } from '@/utils';
import { Loading } from '@/views/dapp/components';
import ErrorView from '@/views/dapp/views/error';

type TWithAddressGuard = (Component: NextPageWithAddress) => FC;

// eslint-disable-next-line react/display-name
const withAddressGuard: TWithAddressGuard = (Component) => () => {
  const t = useTranslations();

  const { value, isReady } = useRouterQuery('address');

  const address = String(value);

  if (!isReady) return <Loading />;

  if (!address || !isValidAccount(address))
    return <ErrorView message={t('error.wrongParams')} />;

  return <Component {...{ address }} />;
};

export default withAddressGuard;
