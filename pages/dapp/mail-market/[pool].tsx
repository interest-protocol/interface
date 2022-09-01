import { NextPage } from 'next';

import { LOCALES, LocalesEnum } from '@/constants/locale';
import MAILMarketPool from '@/views/dapp/views/mail-market-pool';

interface MAILMarketPoolPageProps {
  pool: string;
}

const MAILMarketPoolPage: NextPage<MAILMarketPoolPageProps> = ({ pool }) => (
  <MAILMarketPool pool={pool as string} />
);

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const getServerSideProps = ({
  locale = LocalesEnum.EN,
  params,
}: {
  params: MAILMarketPoolPageProps;
  locale: LocalesEnum;
}) => {
  const { pool } = params;

  return {
    props: {
      pool,
      messages: {
        ...require(`../../../assets/messages/mail-market/pool/${LOCALES[locale]}.json`),
        ...require(`../../../assets/messages/common/${LOCALES[locale]}.json`),
      },
    },
  };
};
export default MAILMarketPoolPage;
