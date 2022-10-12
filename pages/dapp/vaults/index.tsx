import { GetStaticProps, NextPage } from 'next';
import { mergeDeepRight } from 'ramda';

import Vault from '@/views/dapp/views/vaults';

const VaultPage: NextPage = () => <Vault />;

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
      now: new Date().getTime(),
      pageTitle: 'vaults.pageTitle',
    },
  };
};

export default VaultPage;
