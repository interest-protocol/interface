import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { mergeDeepRight } from 'ramda';
import { useState } from 'react';

import { Web3Manager } from '@/components';
import { useLocalStorage } from '@/hooks';
import { NextPageWithProps } from '@/interface';
import { LocalSwapSettings } from '@/views/dapp/views/dex/swap/swap.types';
import DEXSwapView from '@/views/dapp/views/dex/swap-view';

const DEXPage: NextPageWithProps = ({ pageTitle }) => {
  const [showSettings, setShowSettings] = useState(false);
  const [isTokenInOpenModal, setTokenInIsOpenModal] = useState(false);
  const [isTokenOutOpenModal, setTokenOutIsOpenModal] = useState(false);

  const { pathname } = useRouter();
  const [localSettings, setLocalSettings] = useLocalStorage<LocalSwapSettings>(
    'interest-swap-settings',
    { slippage: '1', deadline: 5, autoFetch: true }
  );

  return (
    <Web3Manager pageTitle={pageTitle} pathname={pathname}>
      <DEXSwapView
        setLocalSettings={setLocalSettings}
        localSettings={localSettings}
        showSettingsState={{ showSettings, setShowSettings }}
        isTokenInOpenModalState={{ isTokenInOpenModal, setTokenInIsOpenModal }}
        isTokenOutOpenModalState={{
          isTokenOutOpenModal,
          setTokenOutIsOpenModal,
        }}
      />
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
