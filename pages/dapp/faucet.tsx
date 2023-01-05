import { GetStaticProps } from 'next';

import Faucet from '@/views/dapp/faucet';

const FaucetPage = () => <Faucet />;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const [commonMessages] = await Promise.all([
    import(`../../assets/messages/common/${locale}.json`),
  ]);

  const messages = commonMessages.default;

  return {
    props: {
      messages,
      now: Date.now(),
      pageTitle: 'Faucet',
    },
  };
};

export default FaucetPage;
