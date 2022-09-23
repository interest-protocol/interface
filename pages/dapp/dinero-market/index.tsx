import { GetStaticProps, NextPage } from 'next';
import { mergeDeepRight } from 'ramda';

import DineroMarket from '@/views/dapp/views/dinero-market';

const DineroMarketPage: NextPage = () => <DineroMarket />;

export const getStaticProps: GetStaticProps = async ({
  locale,
  ...otherProps
}) => {
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
      ...otherProps,
      messages,
      now: new Date().getTime(),
    },
  };
};

export default DineroMarketPage;
