import { useContractRead } from 'wagmi';

import { DEFAULT_ACCOUNT } from '@/constants';
import { useIdAccount } from '@/hooks/use-id-account';
import InterestViewDexABI from '@/sdk/abi/interest-view-dex.abi.json';
import { getInterestViewDexAddress } from '@/utils';

export const useGetPairData = (pairAddress: string) => {
  const { chainId, account } = useIdAccount();

  return useContractRead({
    addressOrName: getInterestViewDexAddress(chainId),
    contractInterface: InterestViewDexABI,
    functionName: 'getPairData',
    args: [pairAddress, account || DEFAULT_ACCOUNT],
    chainId,
  });
};
