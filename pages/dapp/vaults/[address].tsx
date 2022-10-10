import { GetServerSideProps, NextPage } from 'next';
import { mergeDeepRight } from 'ramda';

import VaultDetails from '../../../views/dapp/views/dinero-vault-details/index';

interface VaultDetailsPageProps {
  address: string | undefined | null;
}

const VaultDetailsPage: NextPage<VaultDetailsPageProps> = ({ address }) => {
  if (!address) return null;

  return <VaultDetails vault={address as string} />;
};

export const getServerSideProps: GetServerSideProps = async ({
  locale,
  params,
}) => {
  const { address } = params || {};
  const [commonMessages, vaultAddressMessages] = await Promise.all([
    import(`../../../assets/messages/common/${locale}.json`),
    import(`../../../assets/messages/vault/address/${locale}.json`),
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
      pageTitle: 'vaultAddress.pageTitle',
    },
  };
};

export default VaultDetailsPage;
