import { getInterestDEXViewPairData } from '@/api';

import { useCallContract } from '../use-call-contract';
import { useChainId } from '../use-chain-id';

export const useGetPairData = (pairAddress: string) => {
  const chainId = useChainId();

  return useCallContract(chainId, getInterestDEXViewPairData, [
    chainId,
    pairAddress,
  ]);
};
