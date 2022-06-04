import { JsonRpcSigner } from '@ethersproject/providers';
import { BigNumber, ContractTransaction } from 'ethers';

export type CreateToken = (
  chainId: number,
  signer: JsonRpcSigner,
  name: string,
  symbol: string,
  amount: BigNumber
) => Promise<ContractTransaction>;
