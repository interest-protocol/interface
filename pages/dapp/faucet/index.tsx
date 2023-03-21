import { ethers } from 'ethers';
import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { mergeDeepRight } from 'ramda';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { Web3Manager } from '@/components';
import { NextPageWithProps } from '@/interface';
import { IFaucetForm } from '@/views/dapp/views/faucet/faucet.types';

import Faucet from '../../../views/dapp/views/faucet';

const FaucetPage: NextPageWithProps = ({ pageTitle }) => {
  const { pathname } = useRouter();

  const [isCreatingToken, setIsCreatingToken] = useState(false);
  const [loading, setLoading] = useState(false);

  const formFaucet = useForm<IFaucetForm>({
    defaultValues: {
      token: ethers.constants.AddressZero,
      amount: 0,
    },
  });

  const formLocalFaucet = useForm<IFaucetForm>({
    defaultValues: {
      token: ethers.constants.AddressZero,
      amount: 0,
    },
  });

  return (
    <Web3Manager pageTitle={pageTitle} pathname={pathname}>
      <Faucet
        isCreatingTokenState={{ isCreatingToken, setIsCreatingToken }}
        formFaucet={formFaucet}
        formLocalFaucet={formLocalFaucet}
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
