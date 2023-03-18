import { GetStaticProps } from 'next';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { mergeDeepRight, pathOr } from 'ramda';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { ERC_20_DATA, UNKNOWN_ERC_20 } from '@/constants';
import { useIdAccount, useLocalStorage } from '@/hooks';
import { Address, NextPageWithProps } from '@/interface';
import { TOKEN_SYMBOL } from '@/sdk';
import {
  ISwapForm,
  LocalSwapSettings,
} from '@/views/dapp/views/dex/swap/swap.types';
import DEXSwapView from '@/views/dapp/views/dex/swap-view';

const Web3Manager = dynamic(() => import('@/components/web3-manager'), {
  ssr: false,
});

const DEXPage: NextPageWithProps = ({ pageTitle }) => {
  const { chainId, account } = useIdAccount();
  const [showSettings, setShowSettings] = useState(false);
  const [hasNoMarket, setHasNoMarket] = useState(false);
  const [isFetchingAmountOutTokenIn, setFetchingAmountOutTokenIn] =
    useState(false);
  const [isFetchingAmountOutTokenOut, setFetchingAmountOutTokenOut] =
    useState(false);
  const [isTokenInOpenModal, setTokenInIsOpenModal] = useState(false);
  const [isTokenOutOpenModal, setTokenOutIsOpenModal] = useState(false);
  const [swapBase, setSwapBase] = useState<Address | null>(null);
  const [amountOutError, setAmountOutError] = useState<null | string>(null);

  const { pathname } = useRouter();
  const [localSettings, setLocalSettings] = useLocalStorage<LocalSwapSettings>(
    'interest-swap-settings',
    { slippage: '1', deadline: 5, autoFetch: true }
  );

  const INT = pathOr(UNKNOWN_ERC_20, [chainId, TOKEN_SYMBOL.INT], ERC_20_DATA);

  const ETH = pathOr(UNKNOWN_ERC_20, [chainId, TOKEN_SYMBOL.ETH], ERC_20_DATA);

  const formSwap = useForm<ISwapForm>({
    defaultValues: {
      tokenIn: {
        address: INT.address,
        value: '0',
        decimals: INT.decimals,
        symbol: INT.symbol,
        setByUser: false,
      },
      tokenOut: {
        address: ETH.address,
        value: '0',
        decimals: ETH.decimals,
        symbol: ETH.symbol,
        setByUser: false,
      },
    },
  });

  return (
    <Web3Manager pageTitle={pageTitle} pathname={pathname}>
      <DEXSwapView
        chainId={chainId}
        account={account}
        setLocalSettings={setLocalSettings}
        localSettings={localSettings}
        formSwap={formSwap}
        showSettingsState={{ showSettings, setShowSettings }}
        hasNoMarketState={{ hasNoMarket, setHasNoMarket }}
        isFetchingAmountOutTokenInState={{
          isFetchingAmountOutTokenIn,
          setFetchingAmountOutTokenIn,
        }}
        isFetchingAmountOutTokenOutState={{
          isFetchingAmountOutTokenOut,
          setFetchingAmountOutTokenOut,
        }}
        isTokenInOpenModalState={{ isTokenInOpenModal, setTokenInIsOpenModal }}
        isTokenOutOpenModalState={{
          isTokenOutOpenModal,
          setTokenOutIsOpenModal,
        }}
        swapBaseState={{ swapBase, setSwapBase }}
        amountOutErrorState={{ amountOutError, setAmountOutError }}
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
