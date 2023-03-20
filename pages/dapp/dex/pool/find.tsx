import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { mergeDeepRight } from 'ramda';
import { useState } from 'react';

import { Web3Manager } from '@/components';
import { NextPageWithProps } from '@/interface';
import FindPoolView from '@/views/dapp/views/dex-find-pool';

const FindPoolPage: NextPageWithProps = ({ pageTitle }) => {
  const { pathname } = useRouter();

  const [isCreatingPair, setCreatingPair] = useState(false);
  const [isTokenAOpenModal, setTokenAIsOpenModal] = useState(false);
  const [isTokenBOpenModal, setTokenBIsOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [createPoolPopup, setCreatePoolPopup] = useState(false);

  return (
    <Web3Manager pageTitle={pageTitle} pathname={pathname}>
      <FindPoolView
        isCreatingPairState={{ isCreatingPair, setCreatingPair }}
        isTokenAOpenModalState={{ isTokenAOpenModal, setTokenAIsOpenModal }}
        isTokenBOpenModalState={{ isTokenBOpenModal, setTokenBIsOpenModal }}
        loadingState={{ loading, setLoading }}
        createPoolPopupState={{ createPoolPopup, setCreatePoolPopup }}
      />
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
