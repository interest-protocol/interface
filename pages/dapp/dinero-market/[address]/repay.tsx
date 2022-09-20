import { GetServerSideProps, NextPage } from 'next';
import { useTranslations } from 'next-intl';

import { capitalize } from '@/utils';
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

  if (address === null)
    return <Error message={capitalize(t('error.params'))} />;

  return <DineroMarketMode address={address} mode="repay" />;
};

export const getServerSideProps: GetServerSideProps = async ({
  locale,
  params,
}) => {
  const { address } = params || {};

  return {
    props: {
      address,
      messages: {
        ...require(`../../../../assets/messages/dinero-market/address/${locale}.json`),
        ...require(`../../../../assets/messages/common/${locale}.json`),
      },
    },
  };
};

export default DineroMarketRepayPage;
