import { getInterestDEXViewPairData } from '@/api';
import { DEFAULT_ACCOUNT } from '@/constants';
import { useIdAccount } from '@/hooks/use-id-account';

import { useCallContract } from '../use-call-contract';

export const useGetPairData = (pairAddress: string) => {
  const { chainId, account } = useIdAccount();

  return useCallContract(chainId, getInterestDEXViewPairData, [
    chainId,
    pairAddress,
    account || DEFAULT_ACCOUNT,
  ]);
};
