import { GetStaticProps, NextPage } from 'next';
import { useTranslations } from 'next-intl';
import { mergeDeepRight } from 'ramda';

import { useRouterQuery } from '@/hooks';
import ErrorView from '@/views/dapp/views/error';
import FarmDetails from '@/views/dapp/views/farm-details';

const FarmDetailsPage: NextPage = () => {
  const t = useTranslations();

  const address = String(useRouterQuery('address'));

  if (!address) return <ErrorView message={t('error.wrongParams')} />;

  return <FarmDetails address={address} />;
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const [commonMessages, farmsMessages] = await Promise.all([
    import(`../../../assets/messages/common/${locale}.json`),
    import(`../../../assets/messages/farms/details/${locale}.json`),
  ]);

  const messages = mergeDeepRight(
    commonMessages.default,
    farmsMessages.default
  );

  return {
    props: {
      messages,
      now: new Date().getTime(),
      pageTitle: 'farmsDetails.pageTitle',
    },
  };
};

export default FarmDetailsPage;
