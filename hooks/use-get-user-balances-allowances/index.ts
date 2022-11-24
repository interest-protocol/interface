import { DEFAULT_ACCOUNT } from '@/constants';
import { GAAction } from '@/constants/google-analytics';
import { UseContractArgs } from '@/interface';
import InterestViewBalancesABI from '@/sdk/abi/interest-view-balances.abi.json';
import { getInterestViewBalancesAddress } from '@/utils';
import { logException } from '@/utils/analytics';

import { useSafeContractRead } from '../use-safe-contract-read';
import { useIdAccount } from './../use-id-account/index';

export const useGetUserBalancesAndAllowances = (
  spender: string,
  tokens: Array<string>,
  args = {} as UseContractArgs
) => {
  const { chainId, account } = useIdAccount();

  return useSafeContractRead({
    addressOrName: getInterestViewBalancesAddress(chainId),
    contractInterface: InterestViewBalancesABI,
    functionName: 'getUserBalancesAndAllowances',
    args: [account || DEFAULT_ACCOUNT, spender, tokens],
    onError: () =>
      logException({
        action: GAAction.ReadBlockchainData,
        label: `Transaction: getUserBalancesAndAllowances`,
        trackerName: ['hooks/use-get-user-balances-allowances/index.ts'],
      }),
    ...args,
  });
};
