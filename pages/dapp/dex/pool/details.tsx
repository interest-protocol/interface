import { GetStaticProps, NextPage } from 'next';
import { useTranslations } from 'next-intl';
import { mergeDeepRight } from 'ramda';

import { useRouterQuery } from '@/hooks';
import { isValidAccount } from '@/utils';
import DEXPoolDetailsView from '@/views/dapp/views/dex-pool-details';
import ErrorView from '@/views/dapp/views/error';

const DEXPoolDetailsPage: NextPage = () => {
  const t = useTranslations();

  const pairAddress = String(useRouterQuery('address'));

  if (!pairAddress || !isValidAccount(pairAddress))
    return <ErrorView message={t('error.wrongParams')} />;

  return <DEXPoolDetailsView pairAddress={pairAddress} />;
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const [commonMessages, dexPoolPairMessages] = await Promise.all([
    import(`../../../../assets/messages/common/${locale}.json`),
    import(`../../../../assets/messages/dex/pool/details/${locale}.json`),
  ]);

  const messages = mergeDeepRight(
    commonMessages.default,
    dexPoolPairMessages.default
  );

  return {
    props: {
      messages,
      pageTitle: 'dexPoolPairAddress.pageTitle',
      now: new Date().getTime(),
    },
  };
};

export default DEXPoolDetailsPage;
