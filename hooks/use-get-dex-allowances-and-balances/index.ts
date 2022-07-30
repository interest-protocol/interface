import { ethers } from 'ethers';
import { getAddress } from 'ethers/lib/utils';
import { useSelector } from 'react-redux';

import { getNativeBalance } from '@/state/core/core.selectors';
import {
  getInterestDexRouterAddress,
  isZeroAddress,
  stringToBigNumber,
} from '@/utils';

import { useGetUserBalancesAndAllowances } from '../use-get-user-balances-allowances';

export const useGetDexAllowancesAndBalances = (
  chainId: number,
  tokenA: string,
  tokenB: string
) => {
  const filteredTokens = [tokenA, tokenB].filter((x) => !isZeroAddress(x));

  const nativeBalance = useSelector(getNativeBalance) as string;

  const nativeBalanceBN = stringToBigNumber(nativeBalance);

  const { data, error, mutate } = useGetUserBalancesAndAllowances(
    getInterestDexRouterAddress(chainId),
    filteredTokens
  );

  if (error)
    return {
      balancesData: {},
      balancesError: 'Failed to fetch balances',
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      mutate: () => Promise.resolve(),
      loading: false,
    };

  if (!data)
    return {
      balancesData: {},
      balancesError: '',
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      mutate: () => Promise.resolve(),
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
      balancesError: '',
      mutate: async () => void (await mutate()),
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
      balancesError: '',
      mutate: async () => void (await mutate()),
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
    balancesError: '',
    mutate: async () => void (await mutate()),
    loading: false,
  };
};
