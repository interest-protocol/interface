import { BigNumber, ethers } from 'ethers';
import { getAddress } from 'ethers/lib/utils';
import { useAccount } from 'wagmi';

import { useNativeBalance } from '@/hooks/use-native-balance';
import { ZERO_BIG_NUMBER } from '@/sdk';
import { asyncNoop, getInterestDexRouterAddress, isZeroAddress } from '@/utils';

import { useGetUserBalancesAndAllowances } from '../use-get-user-balances-allowances';

export interface BalanceData {
  balance: BigNumber;
  allowance: BigNumber;
}

export interface useGetDexAllowancesAndBalancesReturn {
  balancesData: Record<string, BalanceData>;
  balancesError: boolean;
  loading: boolean;
  refetch: () => Promise<void>;
  nativeBalance: BigNumber;
}

export const useGetDexAllowancesAndBalances = (
  chainId: number,
  tokenA: string,
  tokenB: string
): useGetDexAllowancesAndBalancesReturn => {
  const filteredTokens = [tokenA, tokenB].filter((x) => !isZeroAddress(x));

  const { address } = useAccount();

  const { data: balanceData, refetch: refetchBalance } = useNativeBalance({
    enabled: Boolean(address),
  });

  const nativeBalanceBN = balanceData ? balanceData : ZERO_BIG_NUMBER;

  const {
    data,
    error,
    refetch: refetchTokenBalances,
  } = useGetUserBalancesAndAllowances(
    getInterestDexRouterAddress(chainId),
    filteredTokens,
    { enabled: Boolean(address) }
  );

  const refetch = async () => {
    await Promise.all([refetchBalance(), refetchTokenBalances()]);
  };

  if (error)
    return {
      balancesData: {},
      balancesError: true,
      loading: false,
      refetch: asyncNoop,
      nativeBalance: nativeBalanceBN,
    };

  if (!data)
    return {
      balancesData: {},
      balancesError: false,
      loading: true,
      refetch: asyncNoop,
      nativeBalance: nativeBalanceBN,
    };

  // One of the tokens is the native token
  if (data.balances.length === 1)
    return {
      balancesData: {
        [getAddress(filteredTokens[0])]: {
          balance: data.balances[0],
          allowance: data.allowances[0],
        },
        [ethers.constants.AddressZero]: {
          allowance: ethers.constants.MaxUint256,
          balance: nativeBalanceBN,
        },
      },
      balancesError: false,
      loading: false,
      refetch,
      nativeBalance: nativeBalanceBN,
    };
  if (data.balances.length == 2)
    return {
      balancesData: {
        [getAddress(filteredTokens[0])]: {
          balance: data.balances[0],
          allowance: data.allowances[0],
        },
        [getAddress(filteredTokens[1])]: {
          balance: data.balances[1],
          allowance: data.allowances[1],
        },
      },
      balancesError: false,
      loading: false,
      refetch,
      nativeBalance: nativeBalanceBN,
    };

  // if the user selects native token for tokenA and tokenB
  return {
    balancesData: {
      [ethers.constants.AddressZero]: {
        allowance: ethers.constants.MaxUint256,
        balance: nativeBalanceBN,
      },
    },
    balancesError: false,
    loading: false,
    refetch,
    nativeBalance: nativeBalanceBN,
  };
};
