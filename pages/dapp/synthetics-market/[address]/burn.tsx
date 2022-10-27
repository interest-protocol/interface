import { GetServerSideProps, NextPage } from 'next';
import { useTranslations } from 'next-intl';
import { mergeDeepRight } from 'ramda';

import { Loading } from '@/views/dapp/components';
import Error from '@/views/dapp/views/error';
import SyntheticsMarketMode from '@/views/dapp/views/synthetics-market-panel';

interface SyntheticsPageBurnPageProps {
  address: string | undefined | null;
}

const SyntheticsPageBurnPage: NextPage<SyntheticsPageBurnPageProps> = ({
  address,
}) => {
  const t = useTranslations();

  if (address === undefined) return <Loading />;

  if (address === null) return <Error message={t('error.wrongParams')} />;

  return <SyntheticsMarketMode address={address} mode="burn" />;
};

export const getServerSideProps: GetServerSideProps = async ({
  locale,
  params,
}) => {
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
      pageTitle: 'syntheticsMarketAddress.burn.pageTitle',
    },
  };
};

export default SyntheticsPageBurnPage;
