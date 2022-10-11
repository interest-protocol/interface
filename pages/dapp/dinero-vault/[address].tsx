import { GetServerSideProps, NextPage } from 'next';
import { mergeDeepRight } from 'ramda';

import DineroVaultDetails from '@/views/dapp/views/dinero-vault-details';
import ErrorView from '@/views/dapp/views/error';

interface VaultDetailsPageProps {
  address: string | undefined | null;
}

const VaultDetailsPage: NextPage<VaultDetailsPageProps> = ({ address }) => {
  if (!address) return <ErrorView message="Wrong params" />;

  return <DineroVaultDetails vault={address as string} />;
};

export const getServerSideProps: GetServerSideProps = async ({
  locale,
  params,
}) => {
  const { address } = params || {};
  const [commonMessages, vaultAddressMessages] = await Promise.all([
    import(`../../../assets/messages/common/${locale}.json`),
    import(`../../../assets/messages/dinero-vault/address/${locale}.json`),
  ]);

  const messages = mergeDeepRight(
    commonMessages.default,
    vaultAddressMessages.default
  );

  return {
    props: {
      address,
      messages,
      now: new Date().getTime(),
      pageTitle: 'dineroVaultAddress.pageTitle',
    },
  };
};

export default VaultDetailsPage;
