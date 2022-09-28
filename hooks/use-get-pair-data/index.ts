import { DEFAULT_ACCOUNT } from '@/constants';
import { useIdAccount } from '@/hooks/use-id-account';
import InterestViewDexABI from '@/sdk/abi/interest-view-dex.abi.json';
import { getInterestViewDexAddress } from '@/utils';

import { useSafeContractRead } from '../use-contract-read';

export const useGetPairData = (pairAddress: string) => {
  const { chainId, account } = useIdAccount();

  return useSafeContractRead({
    addressOrName: getInterestViewDexAddress(chainId),
    contractInterface: InterestViewDexABI,
    functionName: 'getPairData',
    args: [pairAddress, account || DEFAULT_ACCOUNT],
  });
};
