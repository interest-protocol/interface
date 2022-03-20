import useSWR from 'swr';

import priorityHooks from '@/connectors';
import { CHAIN_ID, CHAIN_IDS } from '@/sdk/chains';
import { CurrencyAmount } from '@/sdk/entities/currency-amount';
import { NativeCurrency } from '@/sdk/entities/native-currency';

import { UseGetUSerCurrencyAmount } from './use-get-user-currency-amount.types';

const { usePriorityChainId, usePriorityAccount, usePriorityProvider } =
  priorityHooks;

export const useGetUserCurrencyAmount: UseGetUSerCurrencyAmount = () => {
  const chainId = usePriorityChainId();
  const account = usePriorityAccount();
  const provider = usePriorityProvider();

  const { error, data } = useSWR(`${account} useNativeCurrencyBalances`, () => {
    if (!provider || !account || !chainId) return Promise.reject();

    return provider?.getBalance(account);
  });

  if (error || !data || !chainId || !CHAIN_IDS.includes(chainId)) {
    return CurrencyAmount.fromRawAmount(
      NativeCurrency.from(CHAIN_ID.UNSUPPORTED),
      0
    );
  }

  return CurrencyAmount.fromRawAmount(
    NativeCurrency.from(chainId as CHAIN_ID),
    data
  );
};
