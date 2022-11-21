import { GetStaticProps, NextPage } from 'next';
import { useTranslations } from 'next-intl';
import { mergeDeepRight } from 'ramda';

import { useRouterQuery } from '@/hooks';
import { Loading } from '@/views/dapp/components';
import Error from '@/views/dapp/views/error';
import SyntheticsMarketMode from '@/views/dapp/views/synthetics-market-panel';

const SyntheticsPageBurnPage: NextPage = () => {
  const t = useTranslations();

  const address = String(useRouterQuery('address'));

  if (address === undefined) return <Loading />;

  if (address === null) return <Error message={t('error.wrongParams')} />;

  return <SyntheticsMarketMode address={address} mode="burn" />;
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const [commonMessages, syntheticMarketMessages] = await Promise.all([
    import(`../../../assets/messages/common/${locale}.json`),
    import(`../../../assets/messages/synthetics-market/address/${locale}.json`),
  ]);

  const messages = mergeDeepRight(
    commonMessages.default,
    syntheticMarketMessages.default
  );

  return {
    props: {
      messages,
      now: new Date().getTime(),
      pageTitle: 'syntheticsMarketAddress.burn.pageTitle',
    },
  };
};

export default SyntheticsPageBurnPage;
