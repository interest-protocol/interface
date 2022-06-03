import { JsonRpcSigner } from '@ethersproject/providers';
import { BigNumber, ethers } from 'ethers';

export type MintFaucetToken = (
  signer: JsonRpcSigner,
  amount: BigNumber
) => Promise<ethers.ContractTransaction>;

export type MintMAILFaucetToken = (
  signer: JsonRpcSigner,
  token: string,
  account: string,
  amount: BigNumber
) => Promise<ethers.ContractTransaction>;
