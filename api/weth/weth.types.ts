import { JsonRpcSigner } from '@ethersproject/providers';
import { BigNumber, ContractTransaction } from 'ethers';

export type WethDeposit = (
  chainId: number,
  signer: JsonRpcSigner,
  value: BigNumber
) => Promise<ContractTransaction>;

export type WethWithdraw = (
  chainId: number,
  signer: JsonRpcSigner,
  value: BigNumber
) => Promise<ContractTransaction>;
