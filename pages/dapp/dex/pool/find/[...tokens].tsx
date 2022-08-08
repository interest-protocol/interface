import { NextPage } from 'next';
import { useRouter } from 'next/router';

import { isValidAccount } from '@/utils';
import FindPoolView from '@/views/dapp/views/dex-find-pool';

const FindPoolPage: NextPage = () => {
  const { query } = useRouter();

  const { tokens } = query;

  const [incomingAddressA, incomingAddressB] = tokens as ReadonlyArray<string>;

  return (
    <FindPoolView
      incomingAddressA={
        isValidAccount(incomingAddressA) ? incomingAddressA : null
      }
      incomingAddressB={
        isValidAccount(incomingAddressB) ? incomingAddressB : null
      }
    />
  );
};

export default FindPoolPage;
