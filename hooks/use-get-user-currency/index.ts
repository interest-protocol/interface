import useSWR from 'swr';

import priorityHooks from '@/connectors';
import { CHAIN_ID, CHAIN_IDS } from '@/constants/chains';
import { CurrencyAmount } from '@/sdk/entities/currency-amount';
import { NativeCurrency } from '@/sdk/entities/native-currency';

import { UseGetUSerCurrency } from './use-get-user-currency.types';

const { usePriorityChainId, usePriorityAccount, usePriorityProvider } =
  priorityHooks;

export const useGetUserCurrency: UseGetUSerCurrency = () => {
  const chainId = usePriorityChainId();
  const account = usePriorityAccount();
  const provider = usePriorityProvider();

  const { data } = useSWR(`${account} balance`, () => {
    if (!provider || !account || !chainId) return Promise.reject();

    return provider?.getBalance(account);
  });

  if (!data || !chainId || !CHAIN_IDS.includes(chainId)) {
    return {
      symbol: NativeCurrency.from(CHAIN_ID.UNSUPPORTED).symbol,
      amount: CurrencyAmount.fromRawAmount(
        NativeCurrency.from(CHAIN_ID.UNSUPPORTED),
        0
      ),
    };
  }

  return {
    symbol: NativeCurrency.from(chainId as CHAIN_ID).symbol,
    amount: CurrencyAmount.fromRawAmount(
      NativeCurrency.from(chainId as CHAIN_ID),
      data
    ),
  };
};
