import { BigNumber, ethers } from 'ethers';

export type MintFaucetToken = (
  amount: BigNumber,
  account: string
) => Promise<ethers.ContractTransaction>;
