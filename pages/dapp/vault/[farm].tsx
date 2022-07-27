import { NextPage } from 'next';
import { useRouter } from 'next/router';

import VaultFarm from '../../../views/dapp/views/vault-farm/index';

const VaultFarmPage: NextPage = () => {
  const {
    query: { farm },
  } = useRouter();
  return <VaultFarm farm={farm as string} />;
};

export default VaultFarmPage;
