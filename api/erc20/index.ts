import { JsonRpcSigner } from '@ethersproject/providers';
import { ContractTransaction, ethers } from 'ethers';

import ERC20ABI from '@/sdk/abi/erc-20.abi.json';

import { Erc20Abi } from '../../types/ethers-contracts';

export const addAllowance = (
  chainId: number,
  signer: JsonRpcSigner,
  account: string,
  erc20Contract: string,
  spender: string
): Promise<ContractTransaction> => {
  const erc20 = new ethers.Contract(
    erc20Contract,
    ERC20ABI,
    signer
  ) as Erc20Abi;
  return erc20.approve(spender, ethers.constants.MaxUint256);
};
