import { GetStaticProps, NextPage } from 'next';

import DEXView from '@/views/dapp/views/dex';

const DEXPage: NextPage = () => <DEXView />;

export const getStaticProps: GetStaticProps = ({ locale, ...otherProps }) => ({
  props: {
    ...otherProps,
    messages: {
      ...require(`../../../assets/messages/dex/swap/${locale}.json`),
      ...require(`../../../assets/messages/dex/pool/find/${locale}.json`),
      ...require(`../../../assets/messages/common/${locale}.json`),
    },
  },
});

export default DEXPage;
