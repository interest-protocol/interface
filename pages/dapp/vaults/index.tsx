import { GetServerSideProps, NextPage } from 'next';
import { mergeDeepRight } from 'ramda';

import Vault from '@/views/dapp/views/vaults';

const VaultPage: NextPage = () => <Vault />;

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
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
