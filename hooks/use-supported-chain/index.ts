import { useRouter } from 'next/router';

import { SUPPORTED_CHAINS } from '@/components/web3-manager';

const useSupportedChain = (chainId: number | null): number => {
  const { pathname } = useRouter();

  return chainId ?? SUPPORTED_CHAINS[pathname][0];
};

export default useSupportedChain;
