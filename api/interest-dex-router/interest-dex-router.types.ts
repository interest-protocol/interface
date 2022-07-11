import { JsonRpcSigner } from '@ethersproject/providers';
import { BigNumberish, ContractTransaction } from 'ethers';

import { RouteStruct } from '../../types/ethers-contracts/InterestDexRouterAbi';

export type Swap = (
  chainId: number,
  signer: JsonRpcSigner,
  amountIn: BigNumberish,
  amountOutMin: BigNumberish,
  routes: RouteStruct[],
  to: string,
  deadline: number
) => Promise<ContractTransaction>;
