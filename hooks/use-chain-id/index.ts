import { useRouter } from 'next/router';
import { useNetwork } from 'wagmi';

import { SUPPORTED_CHAINS_RECORD } from '@/constants';

export const useChainId = (): number => {
  const { pathname } = useRouter();
  const { chain } = useNetwork();

  return SUPPORTED_CHAINS_RECORD[pathname].includes(chain?.id || -1)
    ? chain!.id
    : SUPPORTED_CHAINS_RECORD[pathname][0];
};
