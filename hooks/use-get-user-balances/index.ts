import { useContractRead } from 'wagmi';

import { DEFAULT_ACCOUNT } from '@/constants';
import InterestViewBalancesABI from '@/sdk/abi/interest-view-balances.abi.json';
import { getInterestViewBalancesAddress } from '@/utils';

import { useIdAccount } from './../use-id-account';

export const useGetUserBalances = (tokens: ReadonlyArray<string>) => {
  const { chainId, account } = useIdAccount();

  return useContractRead({
    addressOrName: getInterestViewBalancesAddress(chainId),
    contractInterface: InterestViewBalancesABI,
    functionName: 'getUserBalances',
    args: [account || DEFAULT_ACCOUNT, tokens],
    chainId,
  });
};
