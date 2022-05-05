import { JsonRpcSigner } from '@ethersproject/providers';
import { BigNumber, ethers } from 'ethers';

export type MintFaucetToken = (
  signer: JsonRpcSigner,
  amount: BigNumber
) => Promise<ethers.ContractTransaction>;
