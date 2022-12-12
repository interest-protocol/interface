import { useMemo } from 'react';

import { DEFAULT_ACCOUNT } from '@/constants';
import { UseContractArgs } from '@/interface';
import InterestViewBalancesABI from '@/sdk/abi/interest-view-balances.abi.json';
import { getInterestViewBalancesAddress } from '@/utils';
import {
  GAPage,
  GAStatus,
  GAType,
  logTransactionEvent,
} from '@/utils/analytics';

import { useSafeContractRead } from '../use-safe-contract-read';
import { useIdAccount } from './../use-id-account';

export const useGetUserBalances = (
  tokens: ReadonlyArray<string>,
  page: GAPage,
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
      logTransactionEvent({
        status: GAStatus.Error,
        type: GAType.Read,
        page,
        functionName: 'getUserBalances',
      }),
    onSuccess: () =>
      logTransactionEvent({
        status: GAStatus.Success,
        type: GAType.Read,
        page,
        functionName: 'getUserBalances',
      }),
    ...extraArgs,
  });
};
