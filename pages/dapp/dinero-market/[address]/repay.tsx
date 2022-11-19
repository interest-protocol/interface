import { GetServerSideProps, NextPage } from 'next';
import { useTranslations } from 'next-intl';
import { mergeDeepRight } from 'ramda';

import { GAAction, GACategory } from '@/constants/google-analytics';
import { logException } from '@/utils/analytics';
import { Loading } from '@/views/dapp/components';
import DineroMarketMode from '@/views/dapp/views/dinero-market-panel';
import Error from '@/views/dapp/views/error';

interface DineroMarketRepayPageProps {
  address: string | undefined | null;
}

const DineroMarketRepayPage: NextPage<DineroMarketRepayPageProps> = ({
  address,
}) => {
  const t = useTranslations();

  if (address === undefined) return <Loading />;

  if (address === null) {
    logException(
      GACategory.Error,
      GAAction.ErrorPage,
      `Error Page: Wrong params`,
      ['pages\\dapp\\dinero-market\\[address]\\repay.tsx']
    );
    return <Error message={t('error.wrongParams')} />;
  }

  return <DineroMarketMode address={address} mode="repay" />;
};

export const getServerSideProps: GetServerSideProps = async ({
  locale,
  params,
}) => {
  const { address } = params || {};

  const [commonMessages, dineroMarketMessages] = await Promise.all([
    import(`../../../../assets/messages/common/${locale}.json`),
    import(`../../../../assets/messages/dinero-market/address/${locale}.json`),
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
      pageTitle: 'dineroMarketAddress.pageTitleRepay',
    },
  };
};

export default DineroMarketRepayPage;
