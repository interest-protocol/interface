import { GetServerSideProps, NextPage } from 'next';
import dynamic from 'next/dynamic';
import { useTranslations } from 'next-intl';
import { mergeDeepRight } from 'ramda';

import { Loading } from '@/views/dapp/components';
import Error from '@/views/dapp/views/error';

const DynamicSyntheticsMarketMode = dynamic(
  () => import('../../../../views/dapp/views/synthetics-market-panel')
);

interface SyntheticsMintPageProps {
  address: string | null | undefined;
}

const SyntheticsMintPage: NextPage<SyntheticsMintPageProps> = ({ address }) => {
  const t = useTranslations();

  if (address === undefined) return <Loading />;

  if (address === null) return <Error message={t('error.wrongParams')} />;

  return <DynamicSyntheticsMarketMode address={address} mode="mint" />;
};

export const getServerSide: GetServerSideProps = async ({ locale, params }) => {
  const { address } = params || {};

  const [commonMessages, dineroMarketMessages] = await Promise.all([
    import(`../../../../assets/messages/common/${locale}.json`),
    import(
      `../../../../assets/messages/synthetics-market/address/${locale}.json`
    ),
  ]);

  const messages = mergeDeepRight(
    commonMessages.default,
    dineroMarketMessages.default
  );

  return {
    props: {
      address,
      messages,
      now: new Date().getTime(),
      pageTitle: 'syntheticsMarketAddress.mint.pageTitle',
    },
  };
};

export default SyntheticsMintPage;
