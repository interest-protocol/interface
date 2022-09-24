import { BigNumber, ethers } from 'ethers';
import { getAddress } from 'ethers/lib/utils';
import { useAccount, useBalance } from 'wagmi';

import { ZERO_BIG_NUMBER } from '@/sdk';
import { getInterestDexRouterAddress, isZeroAddress } from '@/utils';

import { useGetUserBalancesAndAllowances } from '../use-get-user-balances-allowances';

export interface BalanceData {
  balance: BigNumber;
  allowance: BigNumber;
}

export interface useGetDexAllowancesAndBalancesReturn {
  balancesData: Record<string, BalanceData>;
  balancesError: boolean;
  loading: boolean;
}

export const useGetDexAllowancesAndBalances = (
  chainId: number,
  tokenA: string,
  tokenB: string
): useGetDexAllowancesAndBalancesReturn => {
  const filteredTokens = [tokenA, tokenB].filter((x) => !isZeroAddress(x));

  const { address } = useAccount();

  const { data: balanceData } = useBalance({
    addressOrName: address,
    enabled: Boolean(address),
    watch: true,
  });

  const nativeBalanceBN = balanceData ? balanceData.value : ZERO_BIG_NUMBER;

  const { data, error } = useGetUserBalancesAndAllowances(
    getInterestDexRouterAddress(chainId),
    filteredTokens,
    { watch: true, enabled: Boolean(address) }
  );

  if (error)
    return {
      balancesData: {},
      balancesError: true,
      loading: false,
    };

  if (!data)
    return {
      balancesData: {},
      balancesError: false,
      loading: true,
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
  };
};
