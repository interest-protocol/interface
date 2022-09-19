import { GetStaticProps, NextPage } from 'next';

import FindPoolView from '@/views/dapp/views/dex-find-pool';

const FindPoolPage: NextPage = () => <FindPoolView />;

export const getStaticProps: GetStaticProps = async ({
  locale,
  ...otherProps
}) => ({
  props: {
    ...otherProps,
    messages: {
      ...require(`../../../../../assets/messages/dex/pool/find/${locale}.json`),
      ...require(`../../../../../assets/messages/common/${locale}.json`),
    },
  },
});

export default FindPoolPage;
