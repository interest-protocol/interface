import { NextPage } from 'next';

import { LOCALES, LocalesEnum } from '@/constants/locale';
import { Loading } from '@/views/dapp/components';
import DineroMarketMode from '@/views/dapp/views/dinero-market-panel';
import Error from '@/views/dapp/views/error';

interface DineroMarketRepayPageProps {
  address: string;
}

const DineroMarketRepayPage: NextPage<DineroMarketRepayPageProps> = ({
  address,
}) => {
  if (address === undefined) return <Loading />;

  if (address === null) return <Error message="Wrong params" />;

  return <DineroMarketMode address={address as string} mode="repay" />;
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const getServerSideProps = ({
  locale = LocalesEnum.EN,
  params,
}: {
  params: DineroMarketRepayPageProps;
  locale: LocalesEnum;
}) => {
  const { address } = params;

  return {
    props: {
      address,
      messages: {
        ...require(`../../../../assets/messages/dinero-market/address/${LOCALES[locale]}.json`),
        ...require(`../../../../assets/messages/common/${LOCALES[locale]}.json`),
      },
    },
  };
};

export default DineroMarketRepayPage;
