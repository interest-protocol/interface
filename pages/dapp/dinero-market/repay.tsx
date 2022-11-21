import { GetStaticProps, NextPage } from 'next';
import { useTranslations } from 'next-intl';
import { mergeDeepRight } from 'ramda';

import { useRouterQuery } from '@/hooks';
import { Loading } from '@/views/dapp/components';
import DineroMarketMode from '@/views/dapp/views/dinero-market-panel';
import Error from '@/views/dapp/views/error';

const DineroMarketRepayPage: NextPage = () => {
  const t = useTranslations();

  const address = String(useRouterQuery('address'));

  if (address === 'undefined') return <Loading />;

  if (address === 'null') return <Error message={t('error.wrongParams')} />;

  return <DineroMarketMode address={address} mode="repay" />;
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const [commonMessages, dineroMarketMessages] = await Promise.all([
    import(`../../../assets/messages/common/${locale}.json`),
    import(`../../../assets/messages/dinero-market/address/${locale}.json`),
  ]);

  const messages = mergeDeepRight(
    commonMessages.default,
    dineroMarketMessages.default
  );

  return {
    props: {
      messages,
      now: new Date().getTime(),
      pageTitle: 'dineroMarketAddress.pageTitleRepay',
    },
  };
};

export default DineroMarketRepayPage;
