import { GetServerSideProps, NextPage } from 'next';
import { mergeDeepRight } from 'ramda';

import SyntheticsMarket from '@/views/dapp/views/synthetics-market';

const SyntheticsMarketPage: NextPage = () => <SyntheticsMarket />;

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  const [commonMessages, syntheticsMarketMessages] = await Promise.all([
    import(`../../../assets/messages/common/${locale}.json`),
    import(`../../../assets/messages/synthetics-market/${locale}.json`),
  ]);

  const messages = mergeDeepRight(
    commonMessages.default,
    syntheticsMarketMessages.default
  );

  return {
    props: {
      messages,
      now: new Date().getTime(),
      pageTitle: 'syntheticsMarket.pageTitle',
    },
  };
};

export default SyntheticsMarketPage;
