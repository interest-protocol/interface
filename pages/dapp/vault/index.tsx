import { GetStaticProps, NextPage } from 'next';
import { mergeDeepRight } from 'ramda';

import Vault from '@/views/dapp/views/vault';

const VaultPage: NextPage = () => <Vault />;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const [commonMessages, earnMessages] = await Promise.all([
    import(`../../../assets/messages/common/${locale}.json`),
    import(`../../../assets/messages/earn/${locale}.json`),
  ]);

  const messages = mergeDeepRight(commonMessages.default, earnMessages.default);

  return {
    props: {
      messages,
      now: new Date().getTime(),
      pageTitle: 'common.earn',
    },
  };
};

export default VaultPage;
