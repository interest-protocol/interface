import { GetStaticProps, NextPage } from 'next';
import dynamic from 'next/dynamic';
import { mergeDeepRight } from 'ramda';

const DynamicFaucet = dynamic(() => import('../../../views/dapp/views/faucet'));

const FaucetPage: NextPage = () => <DynamicFaucet />;

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
      now: Date.now(),
      pageTitle: 'faucet.pageTitle',
    },
  };
};

export default FaucetPage;
