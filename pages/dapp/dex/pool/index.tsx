import { GetStaticProps } from 'next';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { mergeDeepRight } from 'ramda';
import { useState } from 'react';

import { PoolType } from '@/constants';
import { NextPageWithProps } from '@/interface';
import DEXPoolView from '@/views/dapp/views/dex/pool-view';

const Web3Manager = dynamic(() => import('@/components/web3-manager'), {
  ssr: false,
});

const DEXPoolPage: NextPageWithProps = ({ pageTitle }) => {
  const { pathname } = useRouter();

  const [poolType, setPoolType] = useState<PoolType>(PoolType.Volatile);

  return (
    <Web3Manager pageTitle={pageTitle} pathname={pathname}>
      <DEXPoolView poolTypeState={{ poolType, setPoolType }} />
    </Web3Manager>
  );
};

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
      now: Date.now(),
      pageTitle: 'dexPool.pageTitle',
    },
  };
};

export default DEXPoolPage;
