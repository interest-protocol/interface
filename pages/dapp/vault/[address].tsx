import { GetServerSideProps, NextPage } from 'next';

import VaultDetails from '../../../views/dapp/views/vault-details/index';

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
  const [commonMessages] = await Promise.all([
    import(`../../../assets/messages/common/${locale}.json`),
  ]);

  const messages = commonMessages.default;

  return {
    props: {
      address,
      messages,
      now: new Date().getTime(),
      pageTitle: 'common.earn',
    },
  };
};

export default VaultDetailsPage;
