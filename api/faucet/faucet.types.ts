import { JsonRpcSigner } from '@ethersproject/providers';
import { BigNumber, ethers } from 'ethers';

export type ERC20MintOld = (
  signer: JsonRpcSigner,
  token: string,
  amount: BigNumber
) => Promise<ethers.ContractTransaction>;

export type ERC20Mint = (
  signer: JsonRpcSigner,
  token: string,
  account: string,
  amount: BigNumber
) => Promise<ethers.ContractTransaction>;
