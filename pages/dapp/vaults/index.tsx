import { GetStaticProps, NextPage } from 'next';
import { mergeDeepRight } from 'ramda';

import Vault from '@/views/dapp/views/vault';

const VaultPage: NextPage = () => <Vault />;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const [commonMessages, vaultMessages] = await Promise.all([
    import(`../../../assets/messages/common/${locale}.json`),
    import(`../../../assets/messages/vault/${locale}.json`),
  ]);

  const messages = mergeDeepRight(
    commonMessages.default,
    vaultMessages.default
  );

  return {
    props: {
      messages,
      now: new Date().getTime(),
      pageTitle: 'vault.pageTitle',
    },
  };
};

export default VaultPage;
