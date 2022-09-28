import { GetStaticProps, NextPage } from 'next';
import { mergeDeepRight } from 'ramda';

import DEXView from '@/views/dapp/views/dex';

const DEXPoolPage: NextPage = () => <DEXView />;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const [commonMessages, dexPoolMessages] = await Promise.all([
    import(`../../../../assets/messages/common/${locale}.json`),
    import(`../../../../assets/messages/dex/pool/${locale}.json`),
  ]);

  const messages = mergeDeepRight(
    commonMessages.default,
    dexPoolMessages.default
  );

  return {
    props: {
      messages,
      now: new Date().getTime(),
      pageTitle: 'dexPool.pageTitle',
    },
  };
};

export default DEXPoolPage;
