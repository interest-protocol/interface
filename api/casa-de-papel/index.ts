import { BigNumber } from 'ethers';

import { getCasaDePapelContract, getStaticWeb3Provider } from '@/utils';

export const depositLP = (
  chainId: number,
  account: string,
  poolId: number,
  amount: BigNumber
) => {
  const casaDePapel = getCasaDePapelContract(
    chainId,
    getStaticWeb3Provider(chainId)
  ).connect(getStaticWeb3Provider(chainId).getSigner(account));

  if (poolId === 0) return casaDePapel.stake(amount);

  return casaDePapel.deposit(poolId, amount);
};

export const withdrawLP = (
  chainId: number,
  account: string,
  poolId: number,
  amount: BigNumber
) => {
  const casaDePapel = getCasaDePapelContract(
    chainId,
    getStaticWeb3Provider(chainId)
  ).connect(getStaticWeb3Provider(chainId).getSigner(account));

  if (poolId === 0) return casaDePapel.unstake(account, account, amount);

  return casaDePapel.withdraw(poolId, amount);
};
