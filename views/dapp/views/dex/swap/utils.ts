import { BigNumber } from 'ethers';

import { useGetUserBalancesAndAllowances } from '@/hooks';
import { sortTokens, ZERO_ADDRESS, ZERO_BIG_NUMBER } from '@/sdk';
import {
  getInterestDexRouterAddress,
  isSameAddress,
  isZeroAddress,
} from '@/utils';

export const handleTokenBalance = (
  address: string,
  balance: BigNumber,
  nativeBalance: string
) => {
  if (isZeroAddress(address)) return BigNumber.from(nativeBalance);

  return balance;
};

const BALANCES_ALLOWANCES_STATE = {
  tokenInBalance: ZERO_BIG_NUMBER,
  tokenOutBalance: ZERO_BIG_NUMBER,
  tokenInAllowance: ZERO_BIG_NUMBER,
  tokenOutAllowance: ZERO_BIG_NUMBER,
};

export const useGetDexAllowancesAndBalances = (
  user: string,
  chainId: number,
  tokenIn: string,
  tokenOut: string
) => {
  const sortedTokens = sortTokens(tokenIn, tokenOut);

  const { data, error, mutate } = useGetUserBalancesAndAllowances(
    user,
    getInterestDexRouterAddress(chainId),
    sortedTokens.filter((x) => !isZeroAddress(x))
  );

  if (error)
    return {
      balancesData: BALANCES_ALLOWANCES_STATE,
      balancesError: 'Failed to fetch balances',
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      mutate: () => {},
    };

  if (!data)
    return {
      balancesData: BALANCES_ALLOWANCES_STATE,
      balancesError: '',
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      mutate: () => {},
    };

  const tokenInIndex = isSameAddress(sortedTokens[0], tokenIn) ? 0 : 1;
  const tokenOutIndex = tokenInIndex === 0 ? 1 : 0;

  return {
    balancesData: {
      tokenInBalance: data.balances[tokenInIndex] || ZERO_BIG_NUMBER,
      tokenInAllowance: data.allowances[tokenInIndex] || ZERO_BIG_NUMBER,
      tokenOutBalance: data.balances[tokenOutIndex] || ZERO_BIG_NUMBER,
      tokenOutAllowance: data.allowances[tokenOutIndex] || ZERO_BIG_NUMBER,
    },
    balancesError: '',
    mutate,
  };
};
