import { GetStaticProps, NextPage } from 'next';
import { mergeDeepRight } from 'ramda';

import DEXFindPoolView from '@/views/dapp/dex-find-pool';

const FindPoolPage: NextPage = () => <DEXFindPoolView />;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const [commonMessages, dexPoolFindMessages] = await Promise.all([
    import(`../../../../assets/messages/common/${locale}.json`),
    import(`../../../../assets/messages/dex/pool/find/${locale}.json`),
  ]);

  const messages = mergeDeepRight(
    commonMessages.default,
    dexPoolFindMessages.default
  );

  return {
    props: {
      messages,
      now: Date.now(),
      pageTitle: 'dexPoolFind.pageTitle',
    },
  };
};

export default FindPoolPage;
