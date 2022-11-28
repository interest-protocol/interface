import { GetStaticProps, NextPage } from 'next';
import dynamic from 'next/dynamic';
import { mergeDeepRight } from 'ramda';

const DynamicDEX = dynamic(() => import('../../../views/dapp/views/dex'));

const DEXPage: NextPage = () => <DynamicDEX />;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const [commonMessages, dexSwapMessages, dexPoolFindMessages] =
    await Promise.all([
      import(`../../../assets/messages/common/${locale}.json`),
      import(`../../../assets/messages/dex/swap/${locale}.json`),
      import(`../../../assets/messages/dex/pool/find/${locale}.json`),
    ]);

  const messages = mergeDeepRight(
    mergeDeepRight(commonMessages.default, dexPoolFindMessages.default),
    dexSwapMessages.default
  );

  return {
    props: {
      messages,
      now: Date.now(),
      pageTitle: 'dexSwap.pageTitle',
    },
  };
};

export default DEXPage;
