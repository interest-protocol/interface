import { GetStaticProps, NextPage } from 'next';
import dynamic from 'next/dynamic';
import { mergeDeepRight } from 'ramda';

const DynamicVault = dynamic(() => import('../../../views/dapp/views/vaults'));

const VaultPage: NextPage = () => <DynamicVault />;

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
