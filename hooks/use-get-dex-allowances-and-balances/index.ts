import { ethers } from 'ethers';
import { useSelector } from 'react-redux';

import { sortTokens, ZERO_BIG_NUMBER } from '@/sdk';
import { getNativeBalance } from '@/state/core/core.selectors';
import {
  getInterestDexRouterAddress,
  isZeroAddress,
  stringToBigNumber,
} from '@/utils';

import { useGetUserBalancesAndAllowances } from '../use-get-user-balances-allowances';

const BALANCES_ALLOWANCES_STATE = {
  token0Balance: ZERO_BIG_NUMBER,
  token1Balance: ZERO_BIG_NUMBER,
  token0Allowance: ZERO_BIG_NUMBER,
  token1Allowance: ZERO_BIG_NUMBER,
};

export const useGetDexAllowancesAndBalances = (
  chainId: number,
  tokenA: string,
  tokenB: string
) => {
  const sortedTokens = sortTokens(tokenA, tokenB).filter(
    (x) => !isZeroAddress(x)
  );

  const nativeBalance = useSelector(getNativeBalance) as string;

  const nativeBalanceBN = stringToBigNumber(nativeBalance);

  const { data, error, mutate } = useGetUserBalancesAndAllowances(
    getInterestDexRouterAddress(chainId),
    sortedTokens
  );

  if (error)
    return {
      balancesData: BALANCES_ALLOWANCES_STATE,
      balancesError: 'Failed to fetch balances',
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      mutate: () => Promise.resolve(),
    };

  if (!data)
    return {
      balancesData: BALANCES_ALLOWANCES_STATE,
      balancesError: '',
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      mutate: () => Promise.resolve(),
    };

  const isToken0Native = sortedTokens.length === 1;

  return {
    balancesData: {
      token0Balance: isToken0Native ? nativeBalanceBN : data.balances[0],
      token1Balance: data.balances[isToken0Native ? 0 : 1],
      token0Allowance: isToken0Native
        ? ethers.constants.MaxUint256
        : data.allowances[0],
      token1Allowance: isToken0Native ? data.allowances[0] : data.allowances[1],
    },
    balancesError: '',
    mutate: async () => void (await mutate()),
  };
};
