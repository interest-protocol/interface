import { GetStaticProps, NextPage } from 'next';
import { mergeDeepRight } from 'ramda';

import Faucet from '@/views/dapp/views/faucet';

const FaucetPage: NextPage = () => <Faucet />;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const [commonMessages, faucetMessages] = await Promise.all([
    import(`../../../assets/messages/common/${locale}.json`),
    import(`../../../assets/messages/faucet/${locale}.json`),
  ]);

  const messages = mergeDeepRight(
    commonMessages.default,
    faucetMessages.default
  );

  return {
    props: {
      messages,
      now: new Date().getTime(),
      pageTitle: 'faucet.pageTitle',
    },
  };
};

export default FaucetPage;
