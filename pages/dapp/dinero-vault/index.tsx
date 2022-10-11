import { GetStaticProps, NextPage } from 'next';
import { mergeDeepRight } from 'ramda';

import DineroVault from '@/views/dapp/views/dinero-vault';

const DineroVaultPage: NextPage = () => <DineroVault />;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const [commonMessages, vaultMessages] = await Promise.all([
    import(`../../../assets/messages/common/${locale}.json`),
    import(`../../../assets/messages/dinero-vault/${locale}.json`),
  ]);

  const messages = mergeDeepRight(
    commonMessages.default,
    vaultMessages.default
  );

  return {
    props: {
      messages,
      now: new Date().getTime(),
      pageTitle: 'dineroVault.pageTitle',
    },
  };
};

export default DineroVaultPage;
