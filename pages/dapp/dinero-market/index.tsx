import { GetStaticProps, NextPage } from 'next';

import RedirectLang from '@/components/redirect-lang';
import DineroMarket from '@/views/dapp/views/dinero-market';

const DineroMarketPage: NextPage = () => (
  <>
    <RedirectLang />
    <DineroMarket />
  </>
);

export const getStaticProps: GetStaticProps = async ({
  locale,
  ...otherProps
}) => ({
  props: {
    ...otherProps,
    messages: {
      ...require(`../../../assets/messages/dinero-market/${locale}.json`),
      ...require(`../../../assets/messages/common/${locale}.json`),
    },
  },
});

export default DineroMarketPage;
