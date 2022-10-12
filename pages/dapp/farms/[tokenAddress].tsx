import { GetServerSideProps, NextPage } from 'next';
import { useTranslations } from 'next-intl';
import { mergeDeepRight } from 'ramda';

import ErrorView from '@/views/dapp/views/error';
import FarmDetails from '@/views/dapp/views/farm-details';

interface FarmDetailsPageProps {
  tokenAddress: string | undefined | null;
}

const FarmDetailsPage: NextPage<FarmDetailsPageProps> = ({ tokenAddress }) => {
  const t = useTranslations();
  if (!tokenAddress) return <ErrorView message={t('error.wrongParams')} />;

  return <FarmDetails address={tokenAddress} />;
};

export const getServerSideProps: GetServerSideProps = async ({
  locale,
  params,
}) => {
  const { tokenAddress } = params || {};
  const [commonMessages, farmsMessages] = await Promise.all([
    import(`../../../assets/messages/common/${locale}.json`),
    import(`../../../assets/messages/farms/token-address/${locale}.json`),
  ]);

  const messages = mergeDeepRight(
    commonMessages.default,
    farmsMessages.default
  );

  return {
    props: {
      tokenAddress,
      messages,
      now: new Date().getTime(),
      pageTitle: 'farmsDetails.pageTitle',
    },
  };
};

export default FarmDetailsPage;
