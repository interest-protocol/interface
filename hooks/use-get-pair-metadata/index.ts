import { getInterestDEXViewPairMetadata } from '@/api';

import { useCallContract } from '../use-call-contract';
import { useChainId } from '../use-chain-id';

export const useGetPairMetadata = (pairAddress: string) => {
  const chainId = useChainId();

  return useCallContract(chainId, getInterestDEXViewPairMetadata, [
    chainId,
    pairAddress,
  ]);
};
