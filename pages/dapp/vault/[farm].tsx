import { GetServerSideProps, NextPage } from 'next';
import { mergeDeepRight } from 'ramda';

import VaultFarm from '../../../views/dapp/views/vault-farm/index';

interface VaultFarmPageProps {
  farm: string | undefined | null;
}

const VaultFarmPage: NextPage<VaultFarmPageProps> = ({ farm }) => {
  if (!farm) return null;

  return <VaultFarm farm={farm as string} />;
};

export const getServerSideProps: GetServerSideProps = async ({
  locale,
  params,
}) => {
  const { farm } = params || {};
  const [commonMessages, earnMessages] = await Promise.all([
    import(`../../../assets/messages/common/${locale}.json`),
    import(`../../../assets/messages/earn/token-address/${locale}.json`),
  ]);

  const messages = mergeDeepRight(commonMessages.default, earnMessages.default);

  return {
    props: {
      farm,
      messages,
      now: new Date().getTime(),
      pageTitle: 'earnTokenAddress.pageTitle',
    },
  };
};

export default VaultFarmPage;
