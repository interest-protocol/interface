import { GetStaticProps, NextPage } from 'next';

import Faucet from '@/views/dapp/views/faucet';

const FaucetPage: NextPage = () => <Faucet />;

export const getStaticProps: GetStaticProps = async ({
  locale,
  ...otherProps
}) => ({
  props: {
    ...otherProps,
    messages: {
      ...require(`../../../assets/messages/faucet/${locale}.json`),
      ...require(`../../../assets/messages/common/${locale}.json`),
    },
  },
});

export default FaucetPage;
