import { JsonRpcSigner } from '@ethersproject/providers';
import { BigNumber, ethers } from 'ethers';

export type MintFaucetToken = (
  signer: JsonRpcSigner,
  token: string,
  amount: BigNumber
) => Promise<ethers.ContractTransaction>;

export type MintMAILFaucetToken = (
  signer: JsonRpcSigner,
  token: string,
  amount: BigNumber,
  account: string
) => Promise<ethers.ContractTransaction>;
