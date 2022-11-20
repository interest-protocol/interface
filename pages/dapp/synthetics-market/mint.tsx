import { GetStaticProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import { useTranslations } from 'next-intl';
import { mergeDeepRight } from 'ramda';

import { getQueryFromPath } from '@/utils';
import { Loading } from '@/views/dapp/components';
import Error from '@/views/dapp/views/error';
import SyntheticsMarketMode from '@/views/dapp/views/synthetics-market-panel';

const SyntheticsMintPage: NextPage = () => {
  const t = useTranslations();

  const { asPath } = useRouter();

  const address = String(getQueryFromPath(asPath).address);

  if (address === undefined) return <Loading />;

  if (address === null) return <Error message={t('error.wrongParams')} />;

  return <SyntheticsMarketMode address={address} mode="mint" />;
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const [commonMessages, dineroMarketMessages] = await Promise.all([
    import(`../../../assets/messages/common/${locale}.json`),
    import(`../../../assets/messages/synthetics-market/address/${locale}.json`),
  ]);

  const messages = mergeDeepRight(
    commonMessages.default,
    dineroMarketMessages.default
  );

  return {
    props: {
      messages,
      now: new Date().getTime(),
      pageTitle: 'syntheticsMarketAddress.mint.pageTitle',
    },
  };
};

export default SyntheticsMintPage;
