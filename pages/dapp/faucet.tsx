import { GetStaticProps } from 'next';
import { mergeDeepRight } from 'ramda';

import Faucet from '@/views/dapp/faucet';

const FaucetPage = () => <Faucet />;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const [commonMessages, faucetMessages] = await Promise.all([
    import(`../../assets/messages/common/${locale}.json`),
    import(`../../assets/messages/faucet/${locale}.json`),
  ]);

  const messages = mergeDeepRight(
    commonMessages.default,
    faucetMessages.default
  );
  return {
    props: {
      messages,
      now: Date.now(),
      pageTitle: 'faucet.pageTitle',
    },
  };
};

export default FaucetPage;
