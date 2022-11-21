import { GetServerSideProps, NextPage } from 'next';
import { useTranslations } from 'next-intl';
import { mergeDeepRight } from 'ramda';

import { GAAction, GACategory } from '@/constants/google-analytics';
import { logException } from '@/utils/analytics';
import ErrorView from '@/views/dapp/views/error';
import FarmDetails from '@/views/dapp/views/farm-details';

interface FarmDetailsPageProps {
  tokenAddress: string | undefined | null;
}

const FarmDetailsPage: NextPage<FarmDetailsPageProps> = ({ tokenAddress }) => {
  const t = useTranslations();
  if (!tokenAddress) {
    logException({
      category: GACategory.Error,
      action: GAAction.ErrorPage,
      label: `Error Page: Wrong params`,
      trackerName: ['pages\\dapp\\farms\\[tokenAddress].tsx'],
    });
    return <ErrorView message={t('error.wrongParams')} />;
  }

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
