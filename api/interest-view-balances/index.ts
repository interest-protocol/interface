import { getInterestViewBalancesContract } from '@/utils/contracts';
import { getStaticWeb3Provider } from '@/utils/web3-provider';

import {
  GetUserBalanceAndAllowance,
  GetUserBalances,
  GetUserBalancesAndAllowances,
} from './interest-view-balances.types';

export const getUserBalances: GetUserBalances = (chainId: number, ...rest) => {
  const contract = getInterestViewBalancesContract(
    chainId,
    getStaticWeb3Provider(chainId)
  );

  return contract.getUserBalances(...rest);
};

export const getUserBalancesAndAllowances: GetUserBalancesAndAllowances = (
  chainId,
  user,
  spender,
  tokens
) => {
  const contract = getInterestViewBalancesContract(
    chainId,
    getStaticWeb3Provider(chainId)
  );

  return contract.getUserBalancesAndAllowances(user, spender, tokens);
};

export const getUserBalanceAndAllowance: GetUserBalanceAndAllowance = (
  chainId,
  user,
  spender,
  token
) => {
  const contract = getInterestViewBalancesContract(
    chainId,
    getStaticWeb3Provider(chainId)
  );

  return contract.getUserBalanceAndAllowance(user, spender, token);
};
