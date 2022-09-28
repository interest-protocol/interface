import { GetStaticProps, NextPage } from 'next';
import { mergeDeepRight } from 'ramda';

import DEXView from '@/views/dapp/views/dex';

const DEXPage: NextPage = () => <DEXView />;

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
      now: new Date().getTime(),
      pageTitle: 'dexSwap.pageTitle',
    },
  };
};

export default DEXPage;
