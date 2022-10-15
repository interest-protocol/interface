import { GetStaticProps, NextPage } from 'next';
import { mergeDeepRight } from 'ramda';

import SyntheticsMarket from '@/views/dapp/views/synthetics-market';

const SyntheticsMarketPage: NextPage = () => <SyntheticsMarket />;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const [commonMessages, dineroMarketMessages] = await Promise.all([
    import(`../../../assets/messages/common/${locale}.json`),
    import(`../../../assets/messages/dinero-market/${locale}.json`),
  ]);

  const messages = mergeDeepRight(
    commonMessages.default,
    dineroMarketMessages.default
  );

  return {
    props: {
      messages,
      now: new Date().getTime(),
      pageTitle: 'dineroMarket.pageTitle',
    },
  };
};

export default SyntheticsMarketPage;
