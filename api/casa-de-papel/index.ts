import { JsonRpcSigner } from '@ethersproject/providers';
import { BigNumber } from 'ethers';

import { getCasaDePapelContract } from '@/utils';

export const depositLP = (
  chainId: number,
  signer: JsonRpcSigner,
  account: string,
  poolId: number,
  amount: BigNumber
) => {
  const casaDePapel = getCasaDePapelContract(chainId, signer);

  if (poolId === 0) return casaDePapel.stake(amount);

  return casaDePapel.deposit(poolId, amount);
};

export const withdrawLP = (
  chainId: number,
  signer: JsonRpcSigner,
  account: string,
  poolId: number,
  amount: BigNumber
) => {
  const casaDePapel = getCasaDePapelContract(chainId, signer);

  if (poolId === 0) return casaDePapel.unstake(account, account, amount);

  return casaDePapel.withdraw(poolId, amount);
};
