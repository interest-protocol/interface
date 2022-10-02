import { GetStaticProps, NextPage } from 'next';

import Vault from '@/views/dapp/views/vault';

const VaultPage: NextPage = () => <Vault />;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const [commonMessages] = await Promise.all([
    import(`../../../assets/messages/common/${locale}.json`),
  ]);

  const messages = commonMessages.default;

  return {
    props: {
      messages,
      now: new Date().getTime(),
      pageTitle: 'common.earn',
    },
  };
};

export default VaultPage;
