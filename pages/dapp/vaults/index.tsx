import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { mergeDeepRight } from 'ramda';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { Web3Manager } from '@/components';
import { VaultTypes } from '@/constants';
import { NextPageWithProps } from '@/interface';
import Vault from '@/views/dapp/views/vaults';
import { IVaultForm } from '@/views/dapp/views/vaults/vaults.types';

const VaultPage: NextPageWithProps = ({ pageTitle }) => {
  const { pathname } = useRouter();
  const [isDesktop, setDesktop] = useState(false);

  const formVault = useForm<IVaultForm>({
    defaultValues: {
      search: '',
      type: VaultTypes.All,
      onlyDeposit: false,
    },
  });
  return (
    <Web3Manager pageTitle={pageTitle} pathname={pathname}>
      <Vault desktopState={{ isDesktop, setDesktop }} formVault={formVault} />
    </Web3Manager>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const [commonMessages, vaultsMessages] = await Promise.all([
    import(`../../../assets/messages/common/${locale}.json`),
    import(`../../../assets/messages/vaults/${locale}.json`),
  ]);

  const messages = mergeDeepRight(
    commonMessages.default,
    vaultsMessages.default
  );

  return {
    props: {
      messages,
      now: Date.now(),
      pageTitle: 'vaults.pageTitle',
    },
  };
};

export default VaultPage;
