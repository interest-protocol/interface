import { GetStaticProps, NextPage } from 'next';

import DEXView from '@/views/dapp/views/dex';

const DEXPoolPage: NextPage = () => <DEXView />;

export const getStaticProps: GetStaticProps = async ({
  locale,
  ...otherProps
}) => ({
  props: {
    ...otherProps,
    messages: {
      ...require(`../../../../assets/messages/dex/pool/${locale}.json`),
      ...require(`../../../../assets/messages/common/${locale}.json`),
    },
  },
});

export default DEXPoolPage;
