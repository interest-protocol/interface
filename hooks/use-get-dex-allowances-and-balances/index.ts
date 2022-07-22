import { sortTokens, ZERO_BIG_NUMBER } from '@/sdk';
import {
  getInterestDexRouterAddress,
  isSameAddress,
  isZeroAddress,
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

  const tokenAIndex = isSameAddress(sortedTokens[0], tokenA) ? 0 : 1;
  const tokenBIndex = tokenAIndex === 0 ? 1 : 0;

  return {
    balancesData: {
      token0Balance: data.balances[tokenAIndex] || ZERO_BIG_NUMBER,
      token1Balance: data.balances[tokenBIndex] || ZERO_BIG_NUMBER,
      token0Allowance: data.allowances[tokenAIndex] || ZERO_BIG_NUMBER,
      token1Allowance: data.allowances[tokenBIndex] || ZERO_BIG_NUMBER,
    },
    balancesError: '',
    mutate: async () => void (await mutate()),
  };
};
