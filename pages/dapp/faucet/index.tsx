import { ethers } from 'ethers';
import { GetStaticProps } from 'next';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { mergeDeepRight } from 'ramda';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { useIdAccount, useLocalStorage } from '@/hooks';
import { NextPageWithProps } from '@/interface';
import { IFaucetForm, IToken } from '@/views/dapp/views/faucet/faucet.types';

import Faucet from '../../../views/dapp/views/faucet';

const Web3Manager = dynamic(() => import('@/components/web3-manager'), {
  ssr: false,
});

const FaucetPage: NextPageWithProps = ({ pageTitle }) => {
  const { pathname } = useRouter();
  const { chainId, account } = useIdAccount();

  const [isCreatingToken, setIsCreatingToken] = useState(false);
  const [loading, setLoading] = useState(false);

  const [localTokens, setLocalTokens] = useLocalStorage<ReadonlyArray<IToken>>(
    `${chainId}-interest-protocol-faucet-tokens`,
    []
  );

  const formFaucet = useForm<IFaucetForm>({
    defaultValues: {
      token: ethers.constants.AddressZero,
      amount: 0,
    },
  });

  return (
    <Web3Manager pageTitle={pageTitle} pathname={pathname}>
      <Faucet
        chainId={chainId}
        account={account}
        isCreatingTokenState={{ isCreatingToken, setIsCreatingToken }}
        localTokensStorage={{ localTokens, setLocalTokens }}
        formFaucet={formFaucet}
        loadingState={{ loading, setLoading }}
      />
    </Web3Manager>
  );
};
export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const [commonMessages, faucetMessages] = await Promise.all([
    import(`../../../assets/messages/common/${locale}.json`),
    import(`../../../assets/messages/faucet/${locale}.json`),
  ]);

  const messages = mergeDeepRight(
    commonMessages.default,
    faucetMessages.default
  );

  return {
    props: {
      messages,
      now: Date.now(),
      pageTitle: 'faucet.pageTitle',
    },
  };
};

export default FaucetPage;
