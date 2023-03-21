import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { mergeDeepRight } from 'ramda';

import { Web3Manager } from '@/components';
import { NextPageWithProps } from '@/interface';
import FindPoolView from '@/views/dapp/views/dex-find-pool';

const FindPoolPage: NextPageWithProps = ({ pageTitle }) => {
  const { pathname } = useRouter();

  return (
    <Web3Manager pageTitle={pageTitle} pathname={pathname}>
      <FindPoolView />
    </Web3Manager>
  );
};

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
