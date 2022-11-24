import { useMemo } from 'react';

import { DEFAULT_ACCOUNT } from '@/constants';
import { GAAction } from '@/constants/google-analytics';
import { UseContractArgs } from '@/interface';
import InterestViewBalancesABI from '@/sdk/abi/interest-view-balances.abi.json';
import { getInterestViewBalancesAddress } from '@/utils';
import { logException } from '@/utils/analytics';

import { useSafeContractRead } from '../use-safe-contract-read';
import { useIdAccount } from './../use-id-account';

export const useGetUserBalances = (
  tokens: ReadonlyArray<string>,
  extraArgs: UseContractArgs = {}
) => {
  const { chainId, account } = useIdAccount();
  const user = account || DEFAULT_ACCOUNT;
  const args = useMemo(() => [user, tokens], [user, tokens]);

  return useSafeContractRead({
    addressOrName: getInterestViewBalancesAddress(chainId),
    contractInterface: InterestViewBalancesABI,
    functionName: 'getUserBalances',
    args: args,
    enabled: !!tokens.length,
    onError: () =>
      logException({
        action: GAAction.ReadBlockchainData,
        label: `Transaction: getUserBalances`,
        trackerName: ['hooks/use-get-user-balances/index.ts'],
      }),
    ...extraArgs,
  });
};
