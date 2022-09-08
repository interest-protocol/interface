import { NextPage } from 'next';

import MAILMarketPool from '@/views/dapp/views/mail-market-pool';

interface MAILMarketPoolPageProps {
  pool: string;
}

const MAILMarketPoolPage: NextPage<MAILMarketPoolPageProps> = ({ pool }) => (
  <MAILMarketPool pool={pool as string} />
);

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const getServerSideProps = ({
  locale,
  params,
}: {
  params: MAILMarketPoolPageProps;
  locale: string;
}) => {
  const { pool } = params;

  return {
    props: {
      pool,
      messages: {
        ...require(`../../../assets/messages/mail-market/pool/${locale}.json`),
        ...require(`../../../assets/messages/common/${locale}.json`),
      },
    },
  };
};
export default MAILMarketPoolPage;
