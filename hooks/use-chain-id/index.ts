import { useRouter } from 'next/router';
import { useNetwork } from 'wagmi';

import { SUPPORTED_CHAINS_RECORD } from '@/constants';
import { CHAIN_ID } from '@/sdk';

export const useChainId = (): number => {
  const { pathname } = useRouter();
  const { chain } = useNetwork();

  const supportedChains = SUPPORTED_CHAINS_RECORD[pathname] || [];

  return supportedChains.includes(chain?.id || -1)
    ? chain!.id
    : CHAIN_ID.BNB_TEST_NET;
};
