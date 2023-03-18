import { GetStaticProps } from 'next';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { mergeDeepRight } from 'ramda';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { ERC_20_DATA } from '@/constants';
import { useIdAccount } from '@/hooks';
import { NextPageWithProps } from '@/interface';
import { TOKEN_SYMBOL } from '@/sdk';
import FindPoolView from '@/views/dapp/views/dex-find-pool';
import { DexFindPoolForm } from '@/views/dapp/views/dex-find-pool/dex-find-pool.types';

const Web3Manager = dynamic(() => import('@/components/web3-manager'), {
  ssr: false,
});

const FindPoolPage: NextPageWithProps = ({ pageTitle }) => {
  const { chainId, account } = useIdAccount();
  const { pathname } = useRouter();

  const [isCreatingPair, setCreatingPair] = useState(false);
  const [isTokenAOpenModal, setTokenAIsOpenModal] = useState(false);
  const [isTokenBOpenModal, setTokenBIsOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [createPoolPopup, setCreatePoolPopup] = useState(false);

  const formFindPool = useForm<DexFindPoolForm>({
    defaultValues: {
      tokenA: {
        address: ERC_20_DATA[chainId][TOKEN_SYMBOL.INT].address,
        decimals: ERC_20_DATA[chainId][TOKEN_SYMBOL.INT].decimals,
        symbol: ERC_20_DATA[chainId][TOKEN_SYMBOL.INT].symbol,
      },
      tokenB: {
        address: ERC_20_DATA[chainId][TOKEN_SYMBOL.BTC].address,
        decimals: ERC_20_DATA[chainId][TOKEN_SYMBOL.BTC].decimals,
        symbol: ERC_20_DATA[chainId][TOKEN_SYMBOL.BTC].symbol,
      },
      isStable: false,
    },
  });

  return (
    <Web3Manager pageTitle={pageTitle} pathname={pathname}>
      <FindPoolView
        chainId={chainId}
        account={account}
        isCreatingPairState={{ isCreatingPair, setCreatingPair }}
        isTokenAOpenModalState={{ isTokenAOpenModal, setTokenAIsOpenModal }}
        isTokenBOpenModalState={{ isTokenBOpenModal, setTokenBIsOpenModal }}
        loadingState={{ loading, setLoading }}
        createPoolPopupState={{ createPoolPopup, setCreatePoolPopup }}
        formFindPool={formFindPool}
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
