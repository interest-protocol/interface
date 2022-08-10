import { JsonRpcSigner } from '@ethersproject/providers';
import { BigNumber } from 'ethers';

import { getCasaDePapelContract } from '@/utils';

export const depositLP = (
  chainId: number,
  signer: JsonRpcSigner,
  poolId: number,
  amount: BigNumber
) => getCasaDePapelContract(chainId, signer).stake(poolId, amount);

export const withdrawLP = (
  chainId: number,
  signer: JsonRpcSigner,
  poolId: number,
  amount: BigNumber
) => getCasaDePapelContract(chainId, signer).unstake(poolId, amount);
