import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { mergeDeepRight } from 'ramda';

import { Web3Manager } from '@/components';
import { NextPageWithProps } from '@/interface';
import DEXSwapView from '@/views/dapp/views/dex/swap-view';

const DEXPage: NextPageWithProps = ({ pageTitle }) => {
  const { pathname } = useRouter();
  return (
    <Web3Manager pageTitle={pageTitle} pathname={pathname}>
      <DEXSwapView />
    </Web3Manager>
  );
};

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
